import { escapeXml } from '../lib/svg.ts';

export const palette = {
  background: '#07101F',
  surface: '#0B1628',
  surfaceStrong: '#111F34',
  line: '#244663',
  structural: '#28556F',
  accent: '#5CA0C6',
  highlight: '#89CFF0',
  text: '#FFFFFF',
  muted: '#A9BED0',
  dim: '#66839A',
  success: '#75E6B5',
};

interface SvgDocumentOptions {
  width: number;
  height: number;
  title: string;
  description: string;
  body: string;
  extraStyle?: string;
}

export function svgDocument(options: SvgDocumentOptions): string {
  const { width, height, title, description, body, extraStyle = '' } = options;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="svg-title svg-desc"><title id="svg-title">${escapeXml(title)}</title><desc id="svg-desc">${escapeXml(description)}</desc><defs>${sharedDefs()}</defs><style>${sharedStyle()}${extraStyle}</style>${body}</svg>`;
}

export function sharedDefs(): string {
  return `
    <linearGradient id="backgroundGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07101F"/>
      <stop offset="52%" stop-color="#0B1628"/>
      <stop offset="100%" stop-color="#10233A"/>
    </linearGradient>
    <linearGradient id="accentGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#28556F"/>
      <stop offset="50%" stop-color="#5CA0C6"/>
      <stop offset="100%" stop-color="#89CFF0"/>
    </linearGradient>
    <radialGradient id="ambientGlow" cx="78%" cy="45%" r="62%">
      <stop offset="0%" stop-color="#5CA0C6" stop-opacity="0.20"/>
      <stop offset="55%" stop-color="#28556F" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#07101F" stop-opacity="0"/>
    </radialGradient>
    <pattern id="microGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#5CA0C6" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
    <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
      <path d="M0 3.5 H4" stroke="#FFFFFF" stroke-opacity="0.018" stroke-width="1"/>
    </pattern>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="tinyGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
}

export function sharedStyle(): string {
  return `
    .display { font-family: Inter, "Segoe UI", Arial, sans-serif; }
    .mono { font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace; }
    .caps { letter-spacing: 2.4px; }
    .muted { fill: ${palette.muted}; }
    .dim { fill: ${palette.dim}; }
    .accent { fill: ${palette.highlight}; }
    .line { stroke: ${palette.line}; }
    .pulse { animation: pulse 2.6s ease-in-out infinite; transform-origin: center; }
    .blink { animation: blink 1.15s steps(1) infinite; }
    .flow { animation: flow 6s linear infinite; }
    .float { animation: float 5s ease-in-out infinite; }
    @keyframes pulse { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
    @keyframes blink { 0%, 48% { opacity: 1; } 49%, 100% { opacity: 0; } }
    @keyframes flow { from { stroke-dashoffset: 90; } to { stroke-dashoffset: 0; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @media (prefers-reduced-motion: reduce) {
      .pulse, .blink, .flow, .float { animation: none !important; }
    }
  `;
}

export function background(width: number, height: number): string {
  return `<rect width="${width}" height="${height}" rx="22" fill="url(#backgroundGradient)"/><rect width="${width}" height="${height}" rx="22" fill="url(#ambientGlow)"/><rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="21" fill="none" stroke="#5CA0C6" stroke-opacity="0.28"/><rect width="${width}" height="${height}" rx="22" fill="url(#microGrid)"/><rect width="${width}" height="${height}" rx="22" fill="url(#scanlines)"/>`;
}

export function cornerMarks(width: number, height: number, inset = 22): string {
  const x2 = width - inset;
  const y2 = height - inset;
  return `<g fill="none" stroke="${palette.highlight}" stroke-opacity="0.55" stroke-width="2">
    <path d="M${inset} ${inset + 16}V${inset}H${inset + 16}"/>
    <path d="M${x2 - 16} ${inset}H${x2}V${inset + 16}"/>
    <path d="M${inset} ${y2 - 16}V${y2}H${inset + 16}"/>
    <path d="M${x2 - 16} ${y2}H${x2}V${y2 - 16}"/>
  </g>`;
}

export function sectionLabel(label: string, x = 48, y = 48): string {
  return `<text x="${x}" y="${y}" class="mono caps" fill="${palette.highlight}" font-size="13" font-weight="700">${escapeXml(label)}</text>`;
}

export function statusPill(label: string, x: number, y: number, width = 110): string {
  return `<g><rect x="${x}" y="${y}" width="${width}" height="32" rx="16" fill="#75E6B5" fill-opacity="0.08" stroke="#75E6B5" stroke-opacity="0.42"/><circle class="pulse" cx="${x + 17}" cy="${y + 16}" r="4" fill="#75E6B5" filter="url(#tinyGlow)"/><text x="${x + 31}" y="${y + 21}" class="mono caps" fill="#A7F3D0" font-size="11" font-weight="700">${escapeXml(label)}</text></g>`;
}

export function panel(x: number, y: number, width: number, height: number, radius = 14): string {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="#0B1628" fill-opacity="0.84" stroke="#5CA0C6" stroke-opacity="0.24"/>`;
}
