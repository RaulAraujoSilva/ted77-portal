import Link from 'next/link';
import { TEMAS, PUBLICACOES, TIPOS, porTema, capaDe } from '../lib/dados';
import { TipoIcone } from '../components/Icones';
import FiltroLista from '../components/FiltroLista';

function CardPub({ p }) {
  const capa = capaDe(p);
  return (
    <Link href={`/artigos/${p.slug}/`} className="card pub" data-tema={p.tema}
      data-busca={`${p.id} ${p.titulo_pt} ${p.titulo_original} ${p.tema_nome} ${p.fonte} ${p.autores_curto || ''}`}>
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
        {p.autores_curto && (
          <p className="card-autores">{p.autores_curto}{p.ano ? ` · ${p.ano}` : ''}</p>
        )}
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
            <div className="ctas">
              <a className="btn cta" href="#areas">Explorar os 6 eixos</a>
              <Link className="btn ghost" href={`/artigos/${prontos[0].slug}/`}>Ver o hotsite piloto</Link>
            </div>
          </div>
          <div className="num">
            <div><b>43</b> publicações</div>
            <div><b>6</b> eixos temáticos</div>
            <div><b>7</b> formatos</div>
            <div><b>100%</b> aberto</div>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="secao" id="areas"><span className="kicker">Explorar por eixo temático</span>Seis eixos temáticos</h2>
        <p className="lead">Cada eixo temático reúne as publicações e todos os conteúdos derivados delas.</p>
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
        <p className="lead">Em destaque — já no ar com todos os conteúdos:</p>
        <div className="destaques">
          {prontos.slice(0, 3).map((p) => <CardPub key={p.id} p={p} />)}
        </div>

        <p className="lead" style={{ margin: 'var(--s-5) 0 var(--s-2)' }}>
          Acervo completo — {PUBLICACOES.length} artigos (os demais entram no ar em ondas):
        </p>
        <p className="legenda-siglas">
          <b>Como ler os códigos:</b> <b>CAP</b> capítulo de livro · <b>IJC</b> IJCIEOM (congresso) ·{' '}
          <b>IND</b> INDUSCON (congresso IEEE).
        </p>
        <FiltroLista alvo="grade-artigos" areas={TEMAS} placeholder="Filtrar por título, autor, sigla ou tema…" />
        <div className="grid gmini" id="grade-artigos">
          {PUBLICACOES.map((p) => {
            const busca = `${p.id} ${p.titulo_pt} ${p.titulo_original} ${p.tema_nome} ${p.fonte} ${p.autores_curto || ''}`;
            const autoria = p.autores_curto
              ? `${p.autores_curto}${p.ano ? ` · ${p.ano}` : ''}` : null;
            return p.manifest ? (
              <Link key={p.id} href={`/artigos/${p.slug}/`} className="card mini ativo"
                data-tema={p.tema} data-busca={busca}>
                <span className="sigla-mini">{p.id}</span>
                <b>{p.titulo_pt}</b>
                {autoria && <small className="card-autores">{autoria}</small>}
                <small className="no-ar">✓ no ar — abrir hotsite</small>
              </Link>
            ) : (
              <div key={p.id} className="card mini" data-tema={p.tema} data-busca={busca}>
                <span className="sigla-mini">{p.id}</span>
                <b>{p.titulo_pt}</b>
                {autoria && <small className="card-autores">{autoria}</small>}
                <small>em produção</small>
              </div>
            );
          })}
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
