'use client';
// Ilha client: mostra progresso de autoestudo da área (localStorage) — Duolingo-style.
import { useEffect, useState } from 'react';

export default function ProgressoArea({ ids, rotulo = 'concluídos no seu autoestudo' }) {
  const [feitos, setFeitos] = useState(null);
  useEffect(() => {
    const ler = () => {
      try {
        const prog = JSON.parse(localStorage.getItem('ted77-progresso') || '{}');
        setFeitos(ids.filter((id) => prog[id]).length);
      } catch { setFeitos(0); }
    };
    ler();
    window.addEventListener('ted77-progresso', ler);
    window.addEventListener('storage', ler);
    return () => {
      window.removeEventListener('ted77-progresso', ler);
      window.removeEventListener('storage', ler);
    };
  }, [ids]);
  if (feitos === null || feitos === 0) return null;
  return (
    <span className="progresso-area" role="status">
      🏅 {feitos} de {ids.length} {rotulo}
    </span>
  );
}
