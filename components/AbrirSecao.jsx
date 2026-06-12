'use client';
// Garante TUDO recolhido por padrão (inclusive em back/refresh via bfcache) e
// abre apenas a seção apontada por #sec-... na URL (deep link deliberado).
import { useEffect } from 'react';

export default function AbrirSecao() {
  useEffect(() => {
    const fecharTodos = () =>
      document.querySelectorAll('details.sec').forEach((d) => { d.open = false; });

    const aplicar = () => {
      fecharTodos();
      let alvo = location.hash.startsWith('#sec-') ? location.hash.slice(1) : null;
      if (location.hash === '#quiz') alvo = 'sec-quiz'; // compat com links antigos
      if (alvo) {
        const det = document.getElementById(alvo);
        if (det) {
          det.open = true;
          det.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    aplicar();
    // bfcache (voltar/avançar) restaura o DOM como estava — reimpor o padrão
    const aoExibir = (e) => { if (e.persisted) aplicar(); };
    window.addEventListener('pageshow', aoExibir);
    window.addEventListener('hashchange', aplicar);
    return () => {
      window.removeEventListener('pageshow', aoExibir);
      window.removeEventListener('hashchange', aplicar);
    };
  }, []);
  return null;
}
