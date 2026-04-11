import { Sidebar } from "@/components/Sidebar";
import { Section } from "@/components/Section";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Cursor } from "@/components/Cursor";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-8 bg-header border-b border-border flex items-center px-4 justify-between shrink-0">
        <div className="flex gap-1.5">
          <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
        </div>
        <div className="text-muted text-[11px]">ansh@devbox — ~/portfolio</div>
        <div className="w-12" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8">
          <Section command="whoami">
            <h1 className="text-[22px] font-bold text-[#e8e8f8] mb-1">
              <span className="text-purple">ansh</span>k.dev
            </h1>
            <p className="text-[11px] text-[#8888aa]">
              &gt; shipping on-chain from Delhi. <span className="text-solana">[rust + solana]</span>.
            </p>
          </Section>

          <Section command="cat now.txt">
            <div className="text-[11px] text-[#3a3a52] mb-1"># what i&apos;m working on this week</div>
            <p className="text-[11px] text-[#c8c8d4] max-w-xl">
              Brushing my basics on javascript after board exams!
            </p>
            <div className="text-solana text-[11px] mt-2">[ last updated: Apr 2026 ]</div>
          </Section>

          <Section command="ls -la ./projects">
            <Projects />
          </Section>

          <Section command="cat stack.json">
            <Stack />
          </Section>

          <Section command="ls ./til">
            {[
              { d: "2026-03-14", t: "understanding PDAs in Anchor" },
              { d: "2026-02-28", t: "why Rust&apos;s borrow checker actually makes sense" },
              { d: "2026-01-10", t: "setting up a local Solana validator" }
            ].map((row, i) => (
              <div key={i} className="flex py-1.5 border-b border-[#1a1a24] text-[11px]">
                <span className="w-20 text-[#44445a]">{row.d}</span>
                <span className="text-[#c8c8d4]">{row.t}</span>
              </div>
            ))}
          </Section>

          <Section command="./connect.sh">
            <div className="text-[11px] text-[#3a3a52] mb-2"># resolving endpoints...</div>
            <div className="space-y-1">
              {[
                { label: "github", url: "github.com/ansh3108" },
                { label: "linkedin", url: "linkedin.com/in/anshk" },
                { label: "email", url: "hey@anshk.dev" }
              ].map((link) => (
                <div key={link.label} className="flex text-[11px]">
                  <span className="w-4 text-[#44445a]">→</span>
                  <span className="w-[60px] text-[#44445a]">{link.label}</span>
                  <a href={`https://${link.url}`} target="_blank" className="text-purple hover:text-solana transition-colors">
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
            <div className="text-dim text-[10px] mt-4">[connection ready. say hi.]</div>
          </Section>

          <footer className="mt-20 text-dim text-[10px] flex items-center">
            [process exited 0] &nbsp;·&nbsp; open source at ansh3108/cyber-anshk-dev
            <Cursor />
          </footer>
        </div>
      </div>
    </div>
  );
}