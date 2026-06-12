import Link from 'next/link';
import { TEMAS, PUBLICACOES, TIPOS, porTema, capaDe } from '../lib/dados';
import { TipoIcone } from '../components/Icones';
import FiltroLista from '../components/FiltroLista';

function CardPub({ p }) {
  const capa = capaDe(p);
  return (
    <Link href={`/artigos/${p.slug}/`} className="card pub" data-tema={p.tema}
      data-busca={`${p.id} ${p.titulo_pt} ${p.titulo_original} ${p.tema_nome} ${p.fonte}`}>
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
        <FiltroLista alvo="grade-artigos" areas={TEMAS} placeholder="Filtrar por título, sigla ou tema…" />
        <div id="grade-artigos">
          <div className="grid g3">
            {prontos.map((p) => <CardPub key={p.id} p={p} />)}
          </div>
          <p className="lead" style={{ margin: 'var(--s-4) 0 var(--s-2)', fontSize: '.85rem' }}>
            Em produção — entram no ar em ondas, conforme o cronograma editorial:
          </p>
          <div className="grid gmini">
            {PUBLICACOES.filter((p) => !p.manifest).map((p) => (
              <div key={p.id} className="card mini" data-tema={p.tema}
                data-busca={`${p.id} ${p.titulo_pt} ${p.titulo_original} ${p.tema_nome} ${p.fonte}`}>
                <span className="sigla-mini">{p.id}</span>
                <b>{p.titulo_pt}</b>
                <small>em produção</small>
              </div>
            ))}
          </div>
        </div>

        <h2 className="secao" id="comece"><span className="kicker">Comece por aqui</span>Trilhas por perfil</h2>
        <p className="lead">Três jeitos de entrar no acervo, conforme o seu objetivo.</p>
        <div className="trilhas">
          <div className="trilha" style={{ borderTopColor: 'var(--azul)' }}>
            <h3>🏛️ Para quem gere o SUS</h3>
            <p className="quem">Secretarias, coordenações e fiscalização</p>
            <ol>
              <li>Leia o artigo <Link href="/artigos/ind-02/">em 5 perguntas</Link> (2 min)</li>
              <li>Explore o <a href="https://raularaujosilva.github.io/ted77-sih-rj-dados-abertos/painel/">painel interativo</a> do seu município</li>
              <li>Baixe o <Link href="/artigos/ind-02/">fichamento A3</Link> para a reunião de gestão</li>
            </ol>
          </div>
          <div className="trilha" style={{ borderTopColor: 'var(--verde)' }}>
            <h3>🩺 Para quem atua na ponta</h3>
            <p className="quem">Profissionais de saúde e residentes</p>
            <ol>
              <li>Assista ao <Link href="/conteudos/videos/">vídeo de 3 minutos</Link></li>
              <li>Estude com a <Link href="/conteudos/apostilas/">apostila didática</Link></li>
              <li>Ganhe o selo no <Link href="/artigos/ind-02/#quiz">quiz de autoestudo</Link></li>
            </ol>
          </div>
          <div className="trilha" style={{ borderTopColor: 'var(--roxo)' }}>
            <h3>🔬 Para quem pesquisa e reusa</h3>
            <p className="quem">Pesquisadores, jornalistas de dados e cidadãos</p>
            <ol>
              <li>Veja a <Link href="/artigos/ind-02/historia/">história visual dos dados</Link></li>
              <li>Baixe as <Link href="/dados/">bases abertas</Link> (CSV + dicionário)</li>
              <li>Cite com 1 clique (<Link href="/artigos/ind-02/">ABNT/BibTeX</Link>, CC-BY)</li>
            </ol>
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
