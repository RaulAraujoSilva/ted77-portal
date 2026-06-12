'use client';
// Mapa mental interativo via markmap-autoloader (caminho oficial p/ páginas estáticas)
// + alternativa textual acessível.
import { useEffect, useRef, useState } from 'react';

export default function MapaMental({ markdown, titulo }) {
  const ref = useRef(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    // injeta o template que o autoloader transforma em SVG interativo
    ref.current.innerHTML =
      `<div class="markmap mapa-mental-caixa"><script type="text/template">---\nmarkmap:\n  maxWidth: 260\n  spacingVertical: 8\n---\n\n${markdown
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')}<\/script></div>`;
    const carregar = () => {
      try { window.markmap?.autoLoader?.renderAll?.(); } catch { setErro(true); }
    };
    if (window.markmap?.autoLoader) {
      carregar();
    } else {
      window.markmap = { autoLoader: { manual: true } };
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.12';
      s.onload = carregar;
      s.onerror = () => setErro(true);
      document.head.appendChild(s);
    }
  }, [markdown]);

  return (
    <div>
      {!erro ? (
        <div ref={ref} role="img"
          aria-label={`Mapa mental interativo: ${titulo}. Versão textual disponível abaixo.`} />
      ) : (
        <p className="quiz-nota">O mapa interativo não pôde ser carregado — use a versão textual abaixo.</p>
      )}
      <details className="mapa-texto">
        <summary>Ver como texto (acessível)</summary>
        <pre>{markdown.replace(/^#+\s*/gm, (m) => '  '.repeat(Math.max(0, m.trim().length - 1)) + '• ')}</pre>
      </details>
    </div>
  );
}
