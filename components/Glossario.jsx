// Glossário inline (estilo Nutshell simplificado): termos sublinhados com tooltip
// acessível por mouse E teclado (<abbr>-like via <button> + CSS).
// Server component: faz o matching no build; tooltip é CSS puro.

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function TextoComGlossario({ texto, glossario }) {
  if (!glossario) return <>{texto}</>;
  const termos = Object.keys(glossario).sort((a, b) => b.length - a.length);
  const re = new RegExp(`\\b(${termos.map(escapeRegex).join('|')})\\b`, 'i');
  const partes = [];
  let resto = texto;
  let chave = 0;
  while (resto) {
    const m = resto.match(re);
    if (!m) { partes.push(resto); break; }
    if (m.index > 0) partes.push(resto.slice(0, m.index));
    const termoOriginal = m[1];
    const def = glossario[termos.find((t) => t.toLowerCase() === termoOriginal.toLowerCase())];
    partes.push(
      <span className="glos" key={chave++} tabIndex={0} role="button"
        aria-label={`${termoOriginal}: ${def}`}>
        {termoOriginal}
        <span className="glos-tip" role="tooltip">{def}</span>
      </span>
    );
    resto = resto.slice(m.index + termoOriginal.length);
  }
  return <>{partes}</>;
}
