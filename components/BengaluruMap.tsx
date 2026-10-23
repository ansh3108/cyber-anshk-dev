// "Bengaluru as a PCB" — a hand-drawn, tile-free city map.
// Every stroke/fill rides the theme tokens, so the whole map flips
// warm-cream ⇄ walnut with the rest of the site.

type Pad = {
  x: number;
  y: number;
  s: number;
  accent?: "sun" | "flamingo";
};

// Little skyline blocks scattered around town — PCB pads on the city plane.
const CITY_PADS: Pad[] = [
  // MG Road / centre-east cluster
  { x: 262, y: 170, s: 4 },
  { x: 270, y: 175, s: 5 },
  { x: 278, y: 169, s: 4 },
  { x: 286, y: 176, s: 5, accent: "sun" },
  { x: 272, y: 183, s: 4 },
  { x: 281, y: 187, s: 4 },
  // Indiranagar cluster
  { x: 330, y: 182, s: 4 },
  { x: 338, y: 188, s: 5 },
  { x: 347, y: 181, s: 4 },
  // Yelahanka cluster
  { x: 259, y: 70, s: 4 },
  { x: 267, y: 76, s: 5 },
  { x: 276, y: 70, s: 4 },
  // BTM cluster
  { x: 236, y: 288, s: 4 },
  { x: 244, y: 294, s: 5, accent: "flamingo" },
  { x: 253, y: 288, s: 4 },
];

// 45°-stepped traces running off the ring road, each ending in a via.
const PCB_TRACES: { d: string; via: [number, number] }[] = [
  { d: "M74,86 h16 l12,12 v18", via: [102, 116] },
  { d: "M416,150 h-20 l-12,12 v16", via: [384, 178] },
  { d: "M100,300 v-16 l12,-12 h16", via: [128, 272] },
  { d: "M380,300 v-14 l-12,-12 h-18", via: [350, 274] },
];

// Cartographic labels get a surface-colored halo so they stay legible
// on top of roads, lakes and metro lines.
const LABEL =
  "font-mono fill-ink stroke-surface" as const;

export function BengaluruMap() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-label="Stylized hand-drawn map of Bengaluru as a circuit board"
      className="w-full h-full max-w-[640px] select-none pointer-events-none"
    >
      <defs>
        <pattern id="blr-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" className="fill-ink/10" />
        </pattern>
      </defs>

      {/* faint PCB dot-grid ground */}
      <rect x="9" y="9" width="462" height="342" fill="url(#blr-dots)" />

      {/* registration marks — print/PCB alignment corners */}
      <g fill="none" className="stroke-ink/35" strokeWidth="1.5">
        <path d="M12,26 V12 H26" />
        <path d="M468,26 V12 H454" />
        <path d="M12,334 V348 H26" />
        <path d="M468,334 V348 H454" />
      </g>

      {/* ---- lakes, organic blobs ---- */}
      <g strokeWidth="2.5" className="stroke-ink">
        <path
          d="M126,113 C124,103 133,94 145,93 C157,92 168,99 171,108 C174,117 168,125 157,127 C146,129 133,126 129,120 C127,117 126,115 126,113 Z"
          className="fill-neon/25"
        />
        <path
          d="M314,125 C313,117 321,110 331,109 C341,108 348,114 349,121 C350,128 344,133 335,134 C326,135 316,132 314,125 Z"
          className="fill-acid/30"
        />
        <path
          d="M166,288 C164,278 175,270 189,269 C204,268 217,274 221,283 C225,292 215,300 201,301 C187,302 170,298 166,288 Z"
          className="fill-flamingo/30"
        />
      </g>
      <g fill="none" className="stroke-ink/35" strokeWidth="1.2">
        <path d="M137,110 q6,-4 12,0" />
        <path d="M145,117 q7,-4 14,0" />
        <path d="M325,121 q6,-4 13,-1" />
        <path d="M184,287 q8,-5 16,-1" />
      </g>

      {/* ---- Cubbon park: dashed green patch + trees ---- */}
      <rect
        x="160"
        y="216"
        width="46"
        height="28"
        rx="7"
        className="fill-acid/15 stroke-ink/40"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <g className="fill-acid/60">
        <circle cx="170" cy="226" r="1.7" />
        <circle cx="181" cy="232" r="1.7" />
        <circle cx="191" cy="225" r="1.7" />
      </g>

      {/* ---- arterial roads ---- */}
      <g fill="none" strokeWidth="2.4" className="stroke-ink/45" strokeLinecap="round">
        <path d="M240,118 C238,84 246,44 252,8" />
        <path d="M312,180 C352,172 400,140 472,136" />
        <path d="M290,215 C338,232 400,252 472,268" />
        <path d="M240,242 C232,278 224,320 218,352" />
        <path d="M168,180 C124,192 70,206 8,214" />
      </g>

      {/* ---- minor street-grid patches ---- */}
      <g fill="none" strokeWidth="1.2" className="stroke-ink/20">
        <path d="M264,146 h34 M264,152 h34 M264,158 h34 M274,140 v24 M288,140 v24" />
        <path d="M126,204 h34 M126,210 h34 M126,216 h34 M136,198 v24 M148,198 v24" />
      </g>

      {/* ---- the rings ---- */}
      <rect
        x="60"
        y="44"
        width="360"
        height="272"
        rx="86"
        fill="none"
        className="stroke-ink"
        strokeWidth="5"
      />
      <ellipse
        cx="240"
        cy="180"
        rx="72"
        ry="62"
        fill="none"
        className="stroke-ink"
        strokeWidth="4"
      />

      {/* ---- radial roads (dashed) ---- */}
      <g fill="none" strokeWidth="1.8" strokeDasharray="6 6" className="stroke-ink/35">
        <line x1="240" y1="180" x2="96" y2="70" />
        <line x1="240" y1="180" x2="384" y2="84" />
        <line x1="240" y1="180" x2="92" y2="284" />
        <line x1="240" y1="180" x2="390" y2="278" />
      </g>

      {/* ---- PCB traces + vias ---- */}
      <g fill="none" strokeWidth="2" strokeLinecap="square" className="stroke-neon/60">
        {PCB_TRACES.map((trace) => (
          <path key={trace.d} d={trace.d} />
        ))}
      </g>
      <g strokeWidth="1.6" className="fill-surface stroke-neon/80">
        {PCB_TRACES.map((trace) => (
          <circle key={trace.via.join(",")} cx={trace.via[0]} cy={trace.via[1]} r="3" />
        ))}
      </g>

      {/* ---- skyline pads ---- */}
      <g strokeWidth="1.1" className="stroke-ink/60">
        {CITY_PADS.map((pad) => (
          <rect
            key={`${pad.x}-${pad.y}`}
            x={pad.x}
            y={pad.y}
            width={pad.s}
            height={pad.s}
            className={
              pad.accent === "sun"
                ? "fill-sun/70"
                : pad.accent === "flamingo"
                  ? "fill-flamingo/60"
                  : "fill-ink/20"
            }
          />
        ))}
      </g>

      {/* ---- two decorative micro-chips ---- */}
      <g className="stroke-ink/40 fill-ink/5" strokeWidth="1.2">
        <g transform="translate(296,62)">
          <rect width="16" height="10" />
          <path d="M-4,2 h4 M-4,5 h4 M-4,8 h4 M16,2 h4 M16,5 h4 M16,8 h4" fill="none" />
        </g>
        <g transform="translate(248,314)">
          <rect width="14" height="9" />
          <path d="M-4,2 h4 M-4,4.5 h4 M-4,7 h4 M14,2 h4 M14,4.5 h4 M14,7 h4" fill="none" />
        </g>
      </g>

      {/* ---- metro: surface casings first, then colored lines ---- */}
      <g fill="none">
        <path
          d="M20,296 C130,196 320,216 458,74"
          className="stroke-surface"
          strokeWidth="10"
          strokeLinecap="square"
        />
        <path
          d="M20,296 C130,196 320,216 458,74"
          className="stroke-grape"
          strokeWidth="6"
          strokeLinecap="square"
        />
        <path
          d="M118,18 C146,140 258,238 396,338"
          className="stroke-surface"
          strokeWidth="10"
          strokeLinecap="square"
        />
        <path
          d="M118,18 C146,140 258,238 396,338"
          className="stroke-acid"
          strokeWidth="6"
          strokeLinecap="square"
        />
        {/* phase 3 — under construction */}
        <path
          d="M448,318 C360,300 280,250 228,200"
          className="stroke-flamingo"
          strokeWidth="4"
          strokeDasharray="7 5"
        />
      </g>

      {/* ---- stations, exactly on the curves ---- */}
      <g strokeWidth="2.5" className="fill-sun stroke-ink">
        <circle cx="94.5" cy="248.1" r="4" />
        <circle cx="182" cy="215.6" r="4" />
        <circle cx="323.3" cy="165.7" r="4" />
        <circle cx="415.2" cy="112" r="4" />
        <circle cx="144.4" cy="88.5" r="4" />
        <circle cx="188.2" cy="154.5" r="4" />
        <circle cx="280.4" cy="247.8" r="4" />
        <circle cx="355.4" cy="308" r="4" />
      </g>

      {/* interchange — where purple meets green */}
      <g strokeWidth="3">
        <circle cx="228" cy="200" r="7" className="fill-sun stroke-ink" />
        <circle cx="228" cy="200" r="2.5" className="fill-ink" stroke="none" />
      </g>

      {/* ---- HQ: the sun block + radar ping ---- */}
      <circle
        cx="240"
        cy="151"
        r="21"
        fill="none"
        strokeDasharray="3 4"
        strokeWidth="1.2"
        className="stroke-ink/30"
      />
      <rect
        x="229"
        y="140"
        width="22"
        height="22"
        strokeWidth="3.5"
        transform="rotate(9 240 151)"
        className="fill-sun stroke-ink"
      />

      {/* ---- HAL airport runway ---- */}
      <g transform="translate(372,210) rotate(-18)">
        <rect
          width="44"
          height="8"
          rx="2"
          className="fill-ink/10 stroke-ink/60"
          strokeWidth="1.5"
        />
        <path d="M4,4 h36" strokeDasharray="4 3" strokeWidth="1" className="stroke-ink/40" fill="none" />
        <path d="M4,0 v8 M40,0 v8" strokeWidth="1.5" className="stroke-ink/50" fill="none" />
      </g>

      {/* ---- cartographic labels (haloed) ---- */}
      <g paintOrder="stroke" strokeLinejoin="round" strokeWidth="4">
        <text
          x="66"
          y="38"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.5"
          className={LABEL}
        >
          ORR ✶ RING ROAD
        </text>
        <text
          x="240"
          y="182"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          textAnchor="middle"
          className={LABEL}
        >
          ✶ BLR
        </text>
        <text x="296" y="134" fontSize="9" fontWeight="650" letterSpacing="1" className={LABEL}>
          MG ROAD
        </text>
        <text
          x="196"
          y="258"
          fontSize="7.5"
          fontWeight="650"
          letterSpacing="0.8"
          textAnchor="middle"
          className={LABEL}
        >
          CUBBON PARK
        </text>
        <text
          x="128"
          y="232"
          fontSize="7.5"
          fontWeight="650"
          letterSpacing="0.8"
          className={LABEL}
        >
          JAYANAGAR
        </text>
        <text
          x="150"
          y="92"
          fontSize="8"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          className={LABEL}
        >
          ✶ lakes
        </text>
        <text
          x="386"
          y="234"
          fontSize="7.5"
          fontWeight="650"
          letterSpacing="1"
          textAnchor="middle"
          className={LABEL}
        >
          HAL ✶
        </text>
        <text
          x="452"
          y="64"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
          textAnchor="end"
          className={LABEL}
        >
          → WHITEFIELD
        </text>
        <text
          x="452"
          y="296"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1"
          textAnchor="end"
          className={LABEL}
        >
          → ELECTRONIC CITY
        </text>
      </g>

      {/* ---- compass rose ---- */}
      <g>
        <circle cx="32" cy="44" r="13" fill="none" className="stroke-ink/45" strokeWidth="1.2" />
        <polygon
          points="32,29 36,44 32,41 28,44"
          className="fill-sun stroke-ink"
          strokeWidth="1.4"
        />
        <polygon
          points="32,59 28,44 32,47 36,44"
          className="fill-ink/15 stroke-ink/60"
          strokeWidth="1.1"
        />
        <text
          x="32"
          y="24"
          fontSize="8"
          fontWeight="700"
          textAnchor="middle"
          className="font-mono fill-ink"
        >
          N
        </text>
      </g>

      {/* ---- metro legend ---- */}
      <g>
        <line x1="24" y1="306" x2="42" y2="306" className="stroke-grape" strokeWidth="4" />
        <line x1="24" y1="314" x2="42" y2="314" className="stroke-acid" strokeWidth="4" />
        <line
          x1="24"
          y1="322"
          x2="42"
          y2="322"
          className="stroke-flamingo"
          strokeWidth="4"
          strokeDasharray="5 3"
        />
        <text
          x="48"
          y="317"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.5"
          className="font-mono fill-ink"
        >
          METRO ✶
        </text>
      </g>

      {/* ---- scale bar ---- */}
      <g fill="none">
        <path d="M104,311 h72" className="stroke-ink/60" strokeWidth="2" />
        <path
          d="M104,307 v8 M128,308 v6 M152,308 v6 M176,307 v8"
          className="stroke-ink/50"
          strokeWidth="1.5"
        />
      </g>
      <g fontSize="7" className="font-mono fill-ink/60">
        <text x="104" y="324" textAnchor="middle">
          0
        </text>
        <text x="176" y="324" textAnchor="middle">
          5 KM
        </text>
      </g>

      {/* paper frame, drawn last so edges stay crisp */}
      <rect
        x="8"
        y="8"
        width="464"
        height="344"
        fill="none"
        className="stroke-ink"
        strokeWidth="2.5"
      />
    </svg>
  );
}
