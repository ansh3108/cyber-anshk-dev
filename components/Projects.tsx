const items = [
  { name: "solana-vault", tag: "rust/anchor", tc: "#9945FF", bg: "#1e1e2e", desc: "on-chain token vault with timelock", stat: "[wip]", sc: "#f0a435" },
  { name: "parallax", tag: "canvas/js", tc: "#14F195", bg: "#0d1f18", desc: "2D projectile physics simulation", stat: "[live]", sc: "#14F195" },
  { name: "usb-hub", tag: "hardware", tc: "#f0a435", bg: "#1f1a0d", desc: "quad 5V USB power module", stat: "[done]", sc: "#14F195" },
];

export const Projects = () => (
  <div className="w-full">
    <div className="flex text-[10px] text-[#44445a] mb-2 uppercase tracking-tight">
      <div className="w-1/4">name</div>
      <div className="w-1/6">type</div>
      <div className="flex-1">desc</div>
      <div className="w-1/6 text-right">status</div>
    </div>
    {items.map((p) => (
      <div key={p.name} className="flex items-center py-2 border-b border-[#1a1a24] text-[11px] hover:bg-header transition-colors group">
        <div className="w-1/4 text-primary">{p.name}</div>
        <div className="w-1/6">
          <span className="px-1.5 py-0.5 rounded-[3px]" style={{ backgroundColor: p.bg, color: p.tc }}>{p.tag}</span>
        </div>
        <div className="flex-1 text-muted">{p.desc}</div>
        <div className="w-1/6 text-right" style={{ color: p.sc }}>{p.stat}</div>
      </div>
    ))}
  </div>
);