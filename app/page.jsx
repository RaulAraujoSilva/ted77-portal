import Link from 'next/link';
import { TEMAS, PUBLICACOES, TIPOS, porTema } from '../lib/dados';

export default function Home() {
  const prontos = PUBLICACOES.filter((p) => p.manifest);
  return (
    <main id="conteudo">
      <section className="hero">
        <span className="petal h1" aria-hidden="true" />
        <span className="petal h2b" aria-hidden="true" />
        <span className="petal h3b" aria-hidden="true" />
        <div className="container inner">
          <h2>A ciência da transformação digital do SUS, acessível para todos</h2>
          <p>
            43 publicações científicas produzidas pelo TED 77/2024 — traduzidas em apostilas,
            vídeos, podcasts, fichamentos, painéis interativos e bases de dados abertas.
          </p>
          <div className="num">
            <div><b>43</b> publicações</div>
            <div><b>6</b> áreas temáticas</div>
            <div><b>7</b> formatos de conteúdo</div>
            <div><b>100%</b> aberto e reutilizável</div>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="secao" id="areas">1 · Navegue por área</h2>
        <p className="lead">Seis eixos organizam todo o acervo do projeto.</p>
        <div className="grid g3">
          {TEMAS.map((t) => (
            <Link key={t.id} href={`/areas/${t.id}/`} className={`card area t-${t.sigla}`}>
              <span className="sigla">{t.sigla}</span>
              <h3>{t.nome}</h3>
              <span className="qtd">{porTema(t.sigla).length} publicações</span>
            </Link>
          ))}
        </div>

        <h2 className="secao" id="artigos">2 · Hotsites dos artigos</h2>
        <p className="lead">
          Cada artigo ganha um hotsite com todos os seus conteúdos. Já publicado:
        </p>
        <div className="grid g3">
          {prontos.map((p) => (
            <Link key={p.id} href={`/artigos/${p.slug}/`} className="card pub">
              <span className="badge">{p.tema} · {p.tema_nome}</span>
              <h3>{p.titulo_pt}</h3>
              <p className="orig">{p.titulo_original}</p>
              <div className="meta">
                <span className="badge cinza">{p.fonte}</span>
                <span className="badge cinza">hotsite completo →</span>
              </div>
            </Link>
          ))}
          <div className="card">
            <span className="badge cinza">em produção</span>
            <h3 style={{ color: 'var(--rodape)', fontSize: '1rem' }}>
              Os demais 42 artigos entram no ar em ondas, conforme o cronograma editorial.
            </h3>
          </div>
        </div>

        <h2 className="secao" id="conteudos">3 · Navegue por tipo de conteúdo</h2>
        <p className="lead">Todos os recursos de um mesmo formato, em um só lugar.</p>
        <div className="grid g4">
          {TIPOS.map((t) => (
            <Link key={t.id} href={`/conteudos/${t.id}/`} className="card area">
              <h3>{t.nome}</h3>
              <p style={{ fontSize: '.85rem', color: 'var(--cinza)' }}>{t.desc}</p>
              <span className="qtd">ver galeria →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
