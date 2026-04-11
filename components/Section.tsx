export const Section = ({ command, children }: { command: string, children: React.ReactNode }) => (
  <div className="mb-10">
    <div className="flex items-center gap-[7px] mb-4 text-[12px]">
      <span className="text-solana font-bold">$</span>
      <span className="text-primary">{command}</span>
    </div>
    <div className="pl-2">{children}</div>
  </div>
);