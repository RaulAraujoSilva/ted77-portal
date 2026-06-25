'use client';
// Mapa mental interativo com markmap empacotado (markmap-lib + markmap-view).
// Controlamos a instância para re-ajustar (fit) o mapa a CADA expansão/recolhimento
// — assim nada é cortado — e para marcar/explicar as folhas no hover de forma
// confiável (o autoloader via CDN não re-ajustava no toggle e o title nativo falhava).
import { useEffect, useRef, useState } from 'react';

export default function MapaMental({ markdown, titulo, tooltips }) {
  const wrapRef = useRef(null); // container .mapa-mental-caixa (posiciona o tooltip)
  const svgRef = useRef(null);  // <svg> onde o markmap desenha
  const tipRef = useRef(null);  // tooltip flutuante de explicação
  const mmRef = useRef(null);   // instância do markmap
  const [erro, setErro] = useState(false);
  const [nivel, setNivel] = useState(2);

  useEffect(() => {
    let cancelado = false;
    let mo, ro, rafFit;
    const dict = tooltips || {};

    // Marca cada nó que tem explicação (sublinhado + cursor:help) e guarda o texto
    // no dataset — roda também nos nós revelados depois de um clique.
    const aplicarDicas = () => {
      const svg = svgRef.current;
      if (!svg) return;
      svg.querySelectorAll('foreignObject > div').forEach((el) => {
        const txt = (el.textContent || '').trim();
        const exp = dict[txt];
        if (exp) {
          el.classList.add('mm-folha');
          el.dataset.tip = exp;
        } else {
          el.classList.remove('mm-folha');
          delete el.dataset.tip;
        }
      });
    };

    const reFit = () => {
      cancelAnimationFrame(rafFit);
      rafFit = requestAnimationFrame(() => {
        try { mmRef.current?.fit?.(); } catch {}
      });
    };

    (async () => {
      try {
        const [{ Transformer }, { Markmap }] = await Promise.all([
          import('markmap-lib'),
          import('markmap-view'),
        ]);
        if (cancelado || !svgRef.current) return;
        const { root } = new Transformer().transform(markdown);
        svgRef.current.innerHTML = '';
        const mm = Markmap.create(
          svgRef.current,
          {
            autoFit: true, fitRatio: 0.92, maxWidth: 280, paddingX: 24,
            duration: 250, initialExpandLevel: nivel, colorFreezeLevel: 2,
            spacingVertical: 10,
          },
          root,
        );
        mmRef.current = mm;
        aplicarDicas();
        // A cada toggle o markmap adiciona/remove nós (childList) → re-marca e re-ajusta.
        const g = svgRef.current.querySelector('g');
        if (g) {
          mo = new MutationObserver(() => { aplicarDicas(); reFit(); });
          mo.observe(g, { childList: true, subtree: true });
        }
        ro = new ResizeObserver(reFit);
        if (wrapRef.current) ro.observe(wrapRef.current);
        setTimeout(reFit, 60);
      } catch {
        if (!cancelado) setErro(true);
      }
    })();

    return () => {
      cancelado = true;
      cancelAnimationFrame(rafFit);
      mo?.disconnect();
      ro?.disconnect();
      try { mmRef.current?.destroy?.(); } catch {}
      mmRef.current = null;
    };
  }, [markdown, nivel, tooltips]);

  const moverTip = (e) => {
    const tip = tipRef.current;
    const caixa = wrapRef.current;
    if (!tip || !caixa) return;
    const alvo = e.target.closest?.('.mm-folha');
    if (alvo?.dataset.tip) {
      tip.textContent = alvo.dataset.tip;
      tip.classList.add('mostrar');
      const r = caixa.getBoundingClientRect();
      const x = Math.min(e.clientX - r.left + 14, r.width - tip.offsetWidth - 8);
      tip.style.left = `${Math.max(8, x)}px`;
      tip.style.top = `${Math.min(e.clientY - r.top + 16, r.height - tip.offsetHeight - 8)}px`;
    } else {
      tip.classList.remove('mostrar');
    }
  };
  const sairTip = () => tipRef.current?.classList.remove('mostrar');

  return (
    <div>
      {!erro ? (
        <>
          <div className="mapa-controles">
            <span className="quiz-nota">💡 Clique nas bolinhas para abrir/fechar os ramos. Passe o mouse sobre os itens <b>sublinhados</b> para ver a explicação.</span>
            <button className="btn ter" onClick={() => setNivel(nivel === 2 ? 99 : 2)}>
              {nivel === 2 ? 'expandir tudo' : 'recolher'}
            </button>
          </div>
          <div className="mapa-mental-caixa" ref={wrapRef}
            onMouseMove={moverTip} onMouseLeave={sairTip}>
            <svg ref={svgRef} role="img"
              aria-label={`Mapa mental interativo: ${titulo}. Versão textual disponível abaixo.`} />
            <div ref={tipRef} className="mm-tip" aria-hidden="true" />
          </div>
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
