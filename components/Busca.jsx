'use client';
// Busca Pagefind (índice gerado pós-build: npx pagefind --site out).
import { useEffect, useRef } from 'react';

export default function Busca() {
  const ref = useRef(null);
  useEffect(() => {
    let ui;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/pagefind/pagefind-ui.css';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = '/pagefind/pagefind-ui.js';
    s.onload = () => {
      ui = new window.PagefindUI({
        element: ref.current,
        showSubResults: true,
        showImages: false,
        autofocus: true,
        translations: {
          placeholder: 'Buscar no acervo (ex.: DATASUS, Lean, interoperabilidade)…',
          zero_results: 'Nada encontrado para "[SEARCH_TERM]" — tente um termo mais geral.',
          clear_search: 'Limpar',
          load_more: 'Mais resultados',
          many_results: '[COUNT] resultados para "[SEARCH_TERM]"',
          one_result: '1 resultado para "[SEARCH_TERM]"',
          searching: 'Buscando…',
        },
      });
    };
    s.onerror = () => {
      if (ref.current) {
        ref.current.innerHTML =
          '<p class="quiz-nota">A busca fica disponível na versão publicada do portal (índice gerado no build).</p>';
      }
    };
    document.body.appendChild(s);
    return () => { try { ui?.destroy?.(); } catch {} };
  }, []);
  return <div ref={ref} className="pagefind-caixa" />;
}
