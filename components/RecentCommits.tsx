"use client";

import { useState } from "react";
import githubData from "@/lib/data/github-data.json";

type Commit = {
  repo: string;
  message: string;
  date: string;
  url: string;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function RecentCommits() {
  const [commits] = useState<Commit[]>(githubData.commits);

  if (!commits) {
    return (
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 w-20 bg-ink/20 animate-pulse" />
        <div className="h-10 w-full bg-ink/10 animate-pulse" />
        <div className="h-10 w-full bg-ink/10 animate-pulse" />
        <div className="h-10 w-full bg-ink/10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/50">
        latest commits ✶
      </span>
      <div className="flex flex-col gap-2.5">
        {commits.slice(0, 4).map((commit, i) => (
          <a
            key={`${commit.repo}-${i}`}
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block border-[3px] border-ink ${i % 2 ? "bg-surface" : "bg-paper"} px-3 py-2 shadow-[3px_3px_0_0_var(--color-ink)] hover:bg-sun hover:text-void transition-colors`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest truncate">
                {commit.repo}
              </span>
              <span className="font-mono text-[9px] shrink-0">{timeAgo(commit.date)}</span>
            </div>
            <p className="mt-0.5 text-[11px] font-medium leading-snug line-clamp-1">
              {commit.message}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
