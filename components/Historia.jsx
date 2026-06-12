'use client';
// Scrollytelling sticky-graphic (padrão The Pudding, sem libs): blocos de texto
// rolam e cada passo muda UMA coisa no gráfico fixo (IntersectionObserver).
import { useEffect, useRef, useState } from 'react';

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const INTERNACOES = [75893, 71711, 73809, 72702, 78403, 77882, 80350, 78989, 80019, 80803, 77129, 75446];
const OBITOS = [5255, 4729, 4663, 4699, 4937, 5503, 5400, 5114, 4948, 4708, 4621, 4619];

const PASSOS = [
  { t: 'Um ano do SUS fluminense em barras', p: 'Cada barra é um mês de 2025: juntas, somam 926.136 internações registradas no SIH/SUS para o estado do Rio de Janeiro. Estes dados estavam em 12 arquivos separados no FTP do DATASUS.', modo: 'todas' },
  { t: 'Fevereiro: o vale', p: 'O mês mais curto registra o menor volume do ano — 71,7 mil internações. Sem um painel, esse padrão ficaria escondido em tabelas mês a mês.', modo: 'destaque', mes: 1 },
  { t: 'Outubro: o pico', p: 'No outro extremo, outubro chega a 80,8 mil internações — 13% acima de fevereiro. Variações assim orientam escala de leitos e equipes.', modo: 'destaque', mes: 9 },
  { t: 'O inverno aparece nos óbitos', p: 'Trocando a lente para óbitos hospitalares, junho salta aos olhos: 5.503 — o maior do ano, em pleno inverno. É o tipo de tendência que a publicação diz ser possível detectar "em minutos, e não em dias".', modo: 'obitos', mes: 5 },
  { t: 'R$ 1,71 bilhão em cuidado', p: 'Cada internação tem valor aprovado: o ano fecha em R$ 1,71 bi. Por trás de cada barra há municípios, especialidades e diagnósticos — tudo navegável no painel interativo.', modo: 'todas' },
  { t: 'Explore você mesmo', p: 'Esta história usou só UMA fatia da base aberta. O painel completo cruza 92 municípios, especialidades e capítulos CID-10 — e os dados são seus para baixar.', modo: 'todas' },
];

export default function Historia() {
  const [ativo, setAtivo] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtivo(Number(e.target.dataset.i));
        });
      },
      { rootMargin: '-35% 0px -45% 0px' }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const passo = PASSOS[ativo];
  const dados = passo.modo === 'obitos' ? OBITOS : INTERNACOES;
  const max = Math.max(...dados);
  const W = 560, H = 330, mL = 46, mB = 24;
  const bw = (W - mL - 10) / 12;

  return (
    <div className="scrolly">
      <div className="grafico-fixo" aria-live="polite">
        <h4>
          {passo.modo === 'obitos' ? 'Óbitos hospitalares por mês · RJ 2025' : 'Internações por mês · RJ 2025'}
        </h4>
        <svg viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label={`Gráfico de barras mensal de ${passo.modo === 'obitos' ? 'óbitos' : 'internações'}`}>
          {dados.map((v, i) => {
            const h = (v / max) * (H - mB - 30);
            const destaque = passo.mes === i;
            const apagar = passo.mes !== undefined && !destaque;
            return (
              <g key={i}>
                <rect className="barra-mes"
                  x={mL + i * bw + 3} y={H - mB - h} width={bw - 6} height={h}
                  rx="4"
                  fill={passo.modo === 'obitos' ? (destaque ? '#E52207' : '#BC1111') : (destaque ? '#E55400' : '#0B3C8C')}
                  opacity={apagar ? 0.28 : 1} />
                {destaque && (
                  <text x={mL + i * bw + bw / 2} y={H - mB - h - 8} textAnchor="middle"
                    fontSize="15" fontWeight="800" fill={passo.modo === 'obitos' ? '#BC1111' : '#C84500'}>
                    {v.toLocaleString('pt-BR')}
                  </text>
                )}
                <text x={mL + i * bw + bw / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="#5A5E6B">
                  {MESES[i]}
                </text>
              </g>
            );
          })}
          <text x="8" y="16" fontSize="11" fill="#5A5E6B">máx: {max.toLocaleString('pt-BR')}</text>
        </svg>
        <p className="quiz-nota">Fonte: base aberta DS-01 · SIH/SUS · DATASUS · elaboração TED 77/2024.</p>
      </div>
      <div className="passos">
        {PASSOS.map((px, i) => (
          <div key={i} data-i={i} ref={(el) => { refs.current[i] = el; }}
            className={`passo ${i === ativo ? 'ativo' : ''}`}>
            <span className="num-passo">PASSO {i + 1} DE {PASSOS.length}</span>
            <h4>{px.t}</h4>
            <p>{px.p}</p>
            {i === PASSOS.length - 1 && (
              <div className="botoes" style={{ marginTop: 'var(--s-3)' }}>
                <a className="btn" href="https://raularaujosilva.github.io/ted77-sih-rj-dados-abertos/painel/">Abrir o painel ↗</a>
                <a className="btn sec" href="/dados/">Baixar os dados</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
