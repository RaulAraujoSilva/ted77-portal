'use client';
// Hub do hotsite: tiles abrem o <details> correspondente e rolam até ele;
// chegar com #sec-... na URL também abre a seção.
import { useEffect } from 'react';

export default function AbrirSecao() {
  useEffect(() => {
    const abrir = (id, rolar = true) => {
      const det = document.getElementById(id);
      if (!det) return;
      det.open = true;
      if (rolar) det.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // tiles → seções
    document.querySelectorAll('[data-abre]').forEach((tile) => {
      tile.addEventListener('click', (e) => {
        const id = tile.dataset.abre;
        if (id) { e.preventDefault(); abrir(id); history.replaceState(null, '', `#${id}`); }
      });
    });
    // hash inicial
    if (location.hash.startsWith('#sec-')) {
      setTimeout(() => abrir(location.hash.slice(1)), 150);
    }
    // compat: link antigo #quiz
    if (location.hash === '#quiz') setTimeout(() => abrir('sec-quiz'), 150);
  }, []);
  return null;
}
