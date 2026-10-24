import { NextResponse } from 'next/server';
import githubData from '@/lib/data/github-data.json';

export const revalidate = 86400; // 24 hours

export async function GET() {
  return NextResponse.json(
    {
      profile: githubData.profile,
      stars: githubData.stats.stars,
      forks: githubData.stats.forks,
      publicRepos: githubData.stats.publicRepos,
      languages: githubData.languages,
      commits: githubData.commits,
      totalContributions: githubData.stats.totalContributions,
      updatedAt: githubData.updatedAt,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  );
}
