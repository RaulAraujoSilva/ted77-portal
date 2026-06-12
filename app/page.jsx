import Link from 'next/link';
import { TEMAS, PUBLICACOES, TIPOS, porTema, capaDe } from '../lib/dados';
import { TipoIcone } from '../components/Icones';

function CardPub({ p }) {
  const capa = capaDe(p);
  return (
    <Link href={`/artigos/${p.slug}/`} className="card pub" data-tema={p.tema}>
      <figure className="thumb">
        {capa ? (
          <img src={capa} alt="" loading="lazy" width="1536" height="1024" />
        ) : (
          <span className="sigla-marca" aria-hidden="true">{p.tema}</span>
        )}
      </figure>
      <div className="card-body">
        <span className="badge">{p.tema} · {p.tema_nome}</span>
        <h3>{p.titulo_pt}</h3>
        <p className="orig">{p.titulo_original}</p>
        <div className="meta">
          <span className="badge cinza">{p.fonte}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const prontos = PUBLICACOES.filter((p) => p.manifest);
  return (
    <main id="conteudo">
      <section className="hero">
        <span className="petal h1" aria-hidden="true" />
        <span className="petal h2b" aria-hidden="true" />
        <span className="petal h3b" aria-hidden="true" />
        <div className="container inner">
          <div>
            <h2>A ciência da transformação digital do SUS, acessível para todos</h2>
            <p>
              43 publicações científicas produzidas pelo TED 77/2024 — traduzidas em apostilas,
              vídeos, podcasts, fichamentos, painéis interativos e bases de dados abertas.
            </p>
            <div className="ctas">
              <a className="btn cta" href="#areas">Explorar as 6 áreas</a>
              <Link className="btn ghost" href={`/artigos/${prontos[0].slug}/`}>Ver o hotsite piloto</Link>
            </div>
          </div>
          <div className="num">
            <div><b>43</b> publicações</div>
            <div><b>6</b> áreas temáticas</div>
            <div><b>7</b> formatos</div>
            <div><b>100%</b> aberto</div>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="secao" id="areas"><span className="kicker">Explorar por área</span>Seis eixos temáticos</h2>
        <p className="lead">Cada área reúne as publicações e todos os conteúdos derivados delas.</p>
        <div className="grid g3">
          {TEMAS.map((t) => (
            <Link key={t.id} href={`/areas/${t.id}/`} className="card area" data-tema={t.sigla}>
              <span className="sigla">{t.sigla}</span>
              <h3>{t.nome}</h3>
              <span className="qtd">{porTema(t.sigla).length} publicações →</span>
            </Link>
          ))}
        </div>

        <h2 className="secao" id="artigos"><span className="kicker">Explorar por artigo</span>Hotsites dos artigos</h2>
        <p className="lead">Cada artigo ganha um hotsite com todos os seus conteúdos. Já publicado:</p>
        <div className="grid g3">
          {prontos.map((p) => <CardPub key={p.id} p={p} />)}
          <div className="card draft" data-tema="T1">
            <div className="card-body">
              <span className="badge draft">Em produção</span>
              <h3>Os demais 42 artigos entram no ar em ondas, conforme o cronograma editorial.</h3>
            </div>
          </div>
        </div>

        <h2 className="secao" id="conteudos"><span className="kicker">Explorar por formato</span>Tipos de conteúdo</h2>
        <p className="lead">Todos os recursos de um mesmo formato, em um só lugar.</p>
        <div className="grid g4">
          {TIPOS.map((t) => (
            <Link key={t.id} href={`/conteudos/${t.id}/`} className="card tipo" data-tipo={t.id}>
              <TipoIcone nome={t.icone} />
              <div className="t-corpo">
                <h3>{t.nome}</h3>
                <p>{t.desc}</p>
                <span className="qtd">ver galeria →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
