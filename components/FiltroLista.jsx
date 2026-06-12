'use client';
// Filtro rápido client-side para grades de artigos (home e páginas de área):
// busca textual instantânea (sem acentos) + filtro por área. Escala para os 43.
import { useEffect, useMemo, useState } from 'react';

const norm = (s) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function FiltroLista({ alvo, areas = [], placeholder = 'Filtrar artigos…' }) {
  const [q, setQ] = useState('');
  const [area, setArea] = useState('');
  const [contagem, setContagem] = useState(null);

  useEffect(() => {
    const grade = document.getElementById(alvo);
    if (!grade) return;
    const cards = [...grade.querySelectorAll('[data-busca]')];
    const nq = norm(q);
    let visiveis = 0;
    cards.forEach((c) => {
      const casaTexto = !nq || norm(c.dataset.busca).includes(nq);
      const casaArea = !area || c.dataset.tema === area;
      const mostra = casaTexto && casaArea;
      c.style.display = mostra ? '' : 'none';
      if (mostra) visiveis++;
    });
    setContagem(q || area ? `${visiveis} de ${cards.length}` : null);
  }, [q, area, alvo]);

  return (
    <div className="filtro-lista" role="search">
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder} aria-label="Filtrar artigos por texto" />
      {areas.length > 0 && (
        <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filtrar por área">
          <option value="">Todas as áreas</option>
          {areas.map((t) => <option key={t.sigla} value={t.sigla}>{t.sigla} · {t.nome}</option>)}
        </select>
      )}
      {contagem && <span className="filtro-contagem" role="status">{contagem}</span>}
    </div>
  );
}
