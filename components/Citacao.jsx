'use client';
// Bloco "Como citar" — ABNT + BibTeX copiáveis (padrão Our World in Data).
import { useState } from 'react';

function BotaoCopiar({ texto, rotulo }) {
  const [ok, setOk] = useState(false);
  return (
    <button className="btn sec btn-copiar"
      onClick={() => {
        navigator.clipboard.writeText(texto).then(() => {
          setOk(true); setTimeout(() => setOk(false), 2000);
        });
      }}>
      {ok ? '✓ copiado' : rotulo}
    </button>
  );
}

export default function Citacao({ citacao }) {
  return (
    <div>
      <p className="cit-texto">{citacao.abnt}</p>
      <div className="botoes">
        <BotaoCopiar texto={citacao.abnt} rotulo="Copiar ABNT" />
        <BotaoCopiar texto={citacao.bibtex} rotulo="Copiar BibTeX" />
      </div>
      <details className="mapa-texto">
        <summary>Ver BibTeX</summary>
        <pre>{citacao.bibtex}</pre>
      </details>
    </div>
  );
}
