import Link from 'next/link';

export const metadata = { title: 'Dados abertos — TED 77/2024' };

const CONJUNTOS = [
  {
    id: 'sih-rj-2025',
    nome: 'Internações hospitalares do SUS no Rio de Janeiro — 2025 (SIH/SUS)',
    desc: '926.136 internações (AIHs aprovadas) das competências 2025-01 a 2025-12, agregadas por município de residência, especialidade do leito e capítulo CID-10. Derivado dos microdados públicos do DATASUS.',
    fonte: 'SIH/SUS · DATASUS · Ministério da Saúde',
    licenca: 'CC-BY 4.0',
    artigo: '/artigos/ind-02/',
    github: 'https://github.com/RaulAraujoSilva/ted77-sih-rj-dados-abertos',
    arquivos: [
      ['sih_rj_2025_municipio_mes_especialidade.csv', 'Município × mês × especialidade (~9 mil linhas)'],
      ['sih_rj_2025_capitulo_cid_mes.csv', 'Capítulo CID-10 × mês × sexo'],
      ['sih_rj_2025_resumo_mensal.csv', 'Série mensal estadual'],
      ['metadata.json', 'Esquema, dicionário e fontes (Frictionless datapackage)'],
    ],
  },
];

export default function Dados() {
  return (
    <main id="conteudo" className="container">
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <b>Dados abertos</b>
      </nav>
      <h2 className="secao" style={{ marginTop: 0 }}>
        <span className="kicker">Dados como URL</span>Dados abertos do projeto
      </h2>
      <p className="lead">
        Conjuntos limpos, documentados e com endereço permanente — prontos para planilha,
        Python, R ou BI. Reutilize citando a fonte (CC-BY 4.0).
      </p>
      {CONJUNTOS.map((c) => (
        <div className="bloco" key={c.id}>
          <h3>{c.nome}</h3>
          <p className="desc">{c.desc}</p>
          <ul className="refs-lista">
            {c.arquivos.map(([arq, d]) => (
              <li key={arq}>
                <a href={`/dados/${c.id}/${arq}`} download data-evento={`download-dados-${c.id}`}>{arq}</a> — {d}
              </li>
            ))}
          </ul>
          <div className="botoes" style={{ marginTop: 'var(--s-3)' }}>
            <a className="btn" href={c.github} target="_blank" rel="noopener">Repositório de dados abertos (GitHub) ↗</a>
            <a className="btn ter" href={c.artigo}>artigo de origem</a>
          </div>
          <p className="quiz-nota" style={{ marginTop: 'var(--s-3)' }}>
            Fonte: {c.fonte} · Licença: {c.licenca} · valores correntes, município = residência do paciente.
          </p>
        </div>
      ))}
      <div className="aviso" style={{ marginTop: 'var(--s-4)' }}>
        Os 10 conjuntos de dados do projeto entram nesta página conforme a produção avança.
      </div>
    </main>
  );
}
