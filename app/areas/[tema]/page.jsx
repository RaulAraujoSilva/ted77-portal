import Link from 'next/link';
import { TEMAS, porTema } from '../../../lib/dados';

export function generateStaticParams() {
  return TEMAS.map((t) => ({ tema: t.id }));
}

export function generateMetadata({ params }) {
  const t = TEMAS.find((x) => x.id === params.tema);
  return { title: `${t.sigla} · ${t.nome} — TED 77/2024` };
}

const DESCRICOES = {
  T1: 'Como medir e orientar a evolução digital dos sistemas e estabelecimentos de saúde: índices de maturidade, estratégias nacionais e panoramas da transformação digital.',
  T2: 'Governança pública, cultura organizacional e sustentabilidade como condições para a transformação digital do SUS dar certo.',
  T3: 'Fazer os sistemas de saúde conversarem: interoperabilidade, dados abertos, integração de bases e painéis de gestão.',
  T4: 'Lean Healthcare e gestão de operações: cortar desperdício, melhorar fluxos e elevar a segurança do paciente.',
  T5: 'Inteligência artificial, IoT e sistemas digitais aplicados diretamente ao cuidado e aos serviços de saúde.',
  T6: 'Capacitação e educação digital: formar as pessoas que fazem a transformação acontecer.',
};

export default function Area({ params }) {
  const t = TEMAS.find((x) => x.id === params.tema);
  const pubs = porTema(t.sigla);
  return (
    <main id="conteudo" className="container">
      <p className="crumb">
        <Link href="/">Início</Link> › Áreas › {t.sigla}
      </p>
      <h2 className="secao" style={{ marginTop: 0 }}>
        {t.sigla} · {t.nome}
      </h2>
      <p className="lead">{DESCRICOES[t.sigla]}</p>
      <div className="grid g3">
        {pubs.map((p) =>
          p.manifest ? (
            <Link key={p.id} href={`/artigos/${p.slug}/`} className="card pub">
              <span className="badge">{p.id}</span>
              <h3>{p.titulo_pt}</h3>
              <p className="orig">{p.titulo_original}</p>
              <div className="meta">
                <span className="badge cinza">{p.fonte}</span>
                <span className="badge">hotsite →</span>
              </div>
            </Link>
          ) : (
            <div key={p.id} className="card pub" aria-label={`${p.titulo_pt} — em produção`}>
              <span className="badge cinza">{p.id}</span>
              <h3 style={{ color: 'var(--cinza)' }}>{p.titulo_pt}</h3>
              <p className="orig">{p.titulo_original}</p>
              <div className="meta">
                <span className="badge cinza">{p.fonte}</span>
                <span className="badge cinza">em produção</span>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
