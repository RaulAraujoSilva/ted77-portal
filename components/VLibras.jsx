'use client';
// Widget VLibras (tradução automática para Libras — gov.br/SGD/UFPB).
// Guard contra montagem dupla; falha silenciosamente se o serviço estiver fora.
import { useEffect } from 'react';

export default function VLibras() {
  useEffect(() => {
    if (document.querySelector('[vw]')) return;
    const wrap = document.createElement('div');
    wrap.setAttribute('vw', '');
    wrap.className = 'enabled';
    wrap.innerHTML =
      '<div vw-access-button class="active"></div>' +
      '<div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
    document.body.appendChild(wrap);
    const s = document.createElement('script');
    s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    s.onload = () => {
      try { new window.VLibras.Widget('https://vlibras.gov.br/app'); } catch { /* serviço fora */ }
    };
    s.onerror = () => {};
    document.body.appendChild(s);
  }, []);
  return null;
}
