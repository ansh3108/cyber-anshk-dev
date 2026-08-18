import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "ansh3108";
  
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
  };
  
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    // 0. Fetch profile
    let profile = null;
    const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (profileRes.ok) {
      profile = await profileRes.json();
    }

    // 1. Fetch repos
    let page = 1;
    let repos: any[] = [];
    let hasMore = true;
    while (hasMore && page <= 10) {
      const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, { headers });
      if (!res.ok) break;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      repos = repos.concat(data);
      hasMore = data.length === 100;
      page++;
    }

    let stars = 0;
    let forks = 0;
    const langMap: Record<string, number> = {};

    // 2. Process repos and fetch languages
    // Using a batch size to avoid overwhelming Node's fetch / API limits simultaneously
    const BATCH_SIZE = 30;
    for (let i = 0; i < repos.length; i += BATCH_SIZE) {
      const batch = repos.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (r) => {
        if (r.name === 'crud-solana') return; // Ignore this specific repo

        stars += r.stargazers_count ?? 0;
        forks += r.forks_count ?? 0;
        
        if (!r.fork && r.size > 0) {
          try {
            const langRes = await fetch(r.languages_url, { headers });
            if (langRes.ok) {
              const langs = await langRes.json();
              for (const [lang, bytes] of Object.entries(langs)) {
                langMap[lang] = (langMap[lang] || 0) + (bytes as number);
              }
            }
          } catch (e) {
            // ignore
          }
        }
      }));
    }

    const totalBytes = Object.values(langMap).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langMap)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // 3. Fetch recent commits
    let commits = [];
    try {
      const commitsRes = await fetch(`https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc`, { headers });
      if (commitsRes.ok) {
        const commitsData = await commitsRes.json();
        commits = commitsData.items?.slice(0, 5).map((item: any) => ({
          repo: item.repository?.name || "unknown",
          message: item.commit.message.split("\n")[0],
          date: item.commit.author.date,
          url: item.html_url
        })) || [];
      }
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      profile,
      stars,
      forks,
      languages,
      commits
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch github stats' }, { status: 500 });
  }
}
