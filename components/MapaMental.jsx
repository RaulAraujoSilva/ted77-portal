'use client';
// Mapa mental interativo (markmap-autoloader): inicia com folhas recolhidas
// (convida ao clique), tooltips nativos nas folhas e botão expandir/recolher.
import { useEffect, useRef, useState } from 'react';

function injetarTooltips(raiz, tooltips) {
  if (!tooltips) return;
  raiz.querySelectorAll('svg g[data-path] div, svg g[data-path] text, svg foreignObject div')
    .forEach((no) => {
      const txt = no.textContent?.trim();
      if (txt && tooltips[txt] && !no.title) no.title = tooltips[txt];
    });
}

export default function MapaMental({ markdown, titulo, tooltips }) {
  const ref = useRef(null);
  const [erro, setErro] = useState(false);
  const [nivel, setNivel] = useState(2);

  useEffect(() => {
    if (!ref.current) return;
    const md = markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    ref.current.innerHTML =
      `<div class="markmap mapa-mental-caixa"><script type="text/template">---\n` +
      `markmap:\n  maxWidth: 260\n  spacingVertical: 8\n  initialExpandLevel: ${nivel}\n` +
      `  colorFreezeLevel: 2\n---\n\n${md}<\/script></div>`;
    const renderizar = () => {
      try {
        window.markmap?.autoLoader?.renderAll?.();
        setTimeout(() => ref.current && injetarTooltips(ref.current, tooltips), 600);
      } catch { setErro(true); }
    };
    if (window.markmap?.autoLoader) {
      renderizar();
    } else {
      window.markmap = { autoLoader: { manual: true } };
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.12';
      s.onload = renderizar;
      s.onerror = () => setErro(true);
      document.head.appendChild(s);
    }
  }, [markdown, nivel, tooltips]);

  return (
    <div>
      {!erro ? (
        <>
          <div className="mapa-controles">
            <span className="quiz-nota">💡 Clique nos círculos para abrir/fechar cada ramo · passe o mouse nas folhas para ver a explicação.</span>
            <button className="btn ter" onClick={() => setNivel(nivel === 2 ? 99 : 2)}>
              {nivel === 2 ? 'expandir tudo' : 'recolher'}
            </button>
          </div>
          <div ref={ref} role="img"
            aria-label={`Mapa mental interativo: ${titulo}. Versão textual disponível abaixo.`} />
        </>
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
