import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env.local if present
dotenv.config({ path: '.env.local' });
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../lib/data/github-data.json');

const USERNAME = 'ansh3108';
const token = process.env.GITHUB_TOKEN;

const headers = {
  'User-Agent': 'cyber-anshk-dev-stats-fetcher',
  Accept: 'application/vnd.github.v3+json',
};

if (token) {
  headers['Authorization'] = `token ${token}`;
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { ...headers, ...options.headers },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function updateGithubData() {
  console.log(`[GitHub Sync] Fetching data for user: ${USERNAME}...`);

  // 1. Fetch Profile
  let profile = {
    name: 'Ansh Kumar',
    login: USERNAME,
    avatar_url: `https://github.com/${USERNAME}.png`,
    public_repos: 244,
  };
  try {
    const p = await fetchJson(`https://api.github.com/users/${USERNAME}`);
    profile = {
      name: p.name || 'Ansh Kumar',
      login: p.login || USERNAME,
      avatar_url: p.avatar_url,
      public_repos: p.public_repos,
      bio: p.bio,
      location: p.location,
    };
    console.log(`✓ Fetched profile: ${profile.name} (${profile.public_repos} repos)`);
  } catch (err) {
    console.warn(`! Profile fetch warning: ${err.message}`);
  }

  // 2. Fetch Repositories (limited to first 3 pages to be gentle with rate limits)
  let repos = [];
  try {
    for (let page = 1; page <= 3; page++) {
      const pageRepos = await fetchJson(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=updated`
      );
      if (!Array.isArray(pageRepos) || pageRepos.length === 0) break;
      repos = repos.concat(pageRepos);
      if (pageRepos.length < 100) break;
    }
    console.log(`✓ Fetched ${repos.length} public repos`);
  } catch (err) {
    console.warn(`! Repos fetch warning: ${err.message}`);
  }

  // Calculate Stars, Forks & Languages
  let stars = 0;
  let forks = 0;
  const langCountMap = {};

  for (const r of repos) {
    stars += r.stargazers_count ?? 0;
    forks += r.forks_count ?? 0;
    if (r.language) {
      langCountMap[r.language] = (langCountMap[r.language] || 0) + 1;
    }
  }

  const totalLangRepos = Object.values(langCountMap).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langCountMap)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalLangRepos) * 1000) / 10,
      count,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10);

  // 3. Fetch Recent Commits
  let commits = [];
  try {
    const searchRes = await fetchJson(
      `https://api.github.com/search/commits?q=author:${USERNAME}&sort=author-date&order=desc`,
      {
        headers: { Accept: 'application/vnd.github.cloak-preview+json' },
      }
    );
    if (searchRes.items && Array.isArray(searchRes.items)) {
      commits = searchRes.items.slice(0, 8).map((item) => ({
        repo: item.repository?.name || 'unknown',
        message: item.commit.message.split('\n')[0],
        date: item.commit.author.date,
        url: item.html_url,
      }));
      console.log(`✓ Fetched ${commits.length} recent commits`);
    }
  } catch (err) {
    console.warn(`! Commit search fallback: ${err.message}`);
  }

  // If commit search failed (rate limit), fallback to public push events
  if (commits.length === 0) {
    try {
      const events = await fetchJson(`https://api.github.com/users/${USERNAME}/events/public`);
      const pushEvents = events.filter((e) => e.type === 'PushEvent');
      for (const p of pushEvents.slice(0, 5)) {
        commits.push({
          repo: p.repo.name.replace(`${USERNAME}/`, ''),
          message: `Pushed updates to ${p.repo.name.replace(`${USERNAME}/`, '')}`,
          date: p.created_at,
          url: `https://github.com/${p.repo.name}`,
        });
      }
    } catch (e) {
      console.warn(`! Events fallback failed: ${e.message}`);
    }
  }

  // 4. Fetch 1-Year Contributions
  let contributions = [];
  let totalContributions = 0;
  try {
    const calendarRes = await fetchJson(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
    );
    if (calendarRes.contributions && Array.isArray(calendarRes.contributions)) {
      contributions = calendarRes.contributions;
      totalContributions = calendarRes.total?.lastYear ?? contributions.reduce((s, c) => s + c.count, 0);
      console.log(`✓ Fetched ${contributions.length} calendar days (${totalContributions} contributions)`);
    }
  } catch (err) {
    console.warn(`! Calendar fetch warning: ${err.message}`);
  }

  const finalData = {
    updatedAt: new Date().toISOString(),
    profile,
    stats: {
      stars,
      forks,
      publicRepos: profile.public_repos || repos.length,
      totalContributions: totalContributions || 1032,
    },
    languages,
    commits,
    contributions,
  };

  // Ensure directory exists
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2), 'utf-8');

  console.log(`\n🎉 Successfully cached GitHub data to ${OUTPUT_PATH}`);
  console.log(`- Stars: ${stars}`);
  console.log(`- Forks: ${forks}`);
  console.log(`- Languages: ${languages.map((l) => `${l.name} (${l.percentage}%)`).join(', ')}`);
  console.log(`- Commits: ${commits.length}`);
  console.log(`- Contributions: ${totalContributions}`);
}

updateGithubData().catch((err) => {
  console.error('Fatal error updating GitHub data:', err);
  process.exit(1);
});
