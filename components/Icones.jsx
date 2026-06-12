// Ícones SVG inline (outline 24×24, estilo Lucide) — stroke:currentColor
const base = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true, focusable: false,
};

export const ICONES = {
  video: (
    <svg {...base}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="M10 9l5 3-5 3z" /></svg>
  ),
  apostila: (
    <svg {...base}><path d="M12 6c-1.5-1.4-3.6-2-6-2H3v14h3c2.4 0 4.5.6 6 2 1.5-1.4 3.6-2 6-2h3V4h-3c-2.4 0-4.5.6-6 2z" /><path d="M12 6v14" /></svg>
  ),
  fichamento: (
    <svg {...base}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3.5h6" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  podcast: (
    <svg {...base}><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="7" rx="2" /><rect x="17" y="13" width="4" height="7" rx="2" /></svg>
  ),
  resumo: (
    <svg {...base}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><path d="M9 12h7M9 16h7" /></svg>
  ),
  painel: (
    <svg {...base}><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="7" /><rect x="12" y="7" width="3" height="11" /><rect x="17" y="13" width="3" height="5" /></svg>
  ),
  base: (
    <svg {...base}><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /><path d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
  ),
  quiz: (
    <svg {...base}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9.2 9a2.8 2.8 0 1 1 3.6 2.7c-.8.3-.8.9-.8 1.8" /><circle cx="12" cy="16.8" r=".4" fill="currentColor" /></svg>
  ),
  mapa: (
    <svg {...base}><circle cx="5" cy="12" r="2.2" /><circle cx="18.5" cy="5.5" r="2" /><circle cx="18.5" cy="12" r="2" /><circle cx="18.5" cy="18.5" r="2" /><path d="M7.2 11.3l9.3-5M7.2 12h9.3M7.2 12.7l9.3 5" /></svg>
  ),
  historia: (
    <svg {...base}><path d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" /><path d="M3 19a2 2 0 0 0 2 2h16" /><path d="M7 8h10M7 12h6" /><path d="M16.5 15.5l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" /></svg>
  ),
};

export function TipoIcone({ nome }) {
  return <span className="tipo-ico">{ICONES[nome] || ICONES.resumo}</span>;
}
