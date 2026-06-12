import Link from 'next/link';
import { PUBLICACOES, extraDe, capaDe } from '../../../lib/dados';
import { TipoIcone } from '../../../components/Icones';
import Quiz from '../../../components/Quiz';
import MapaMental from '../../../components/MapaMental';
import Citacao from '../../../components/Citacao';
import TextoComGlossario from '../../../components/Glossario';
import AbrirSecao from '../../../components/AbrirSecao';

const BASE = 'https://ted77-portal.vercel.app';

export function generateStaticParams() {
  return PUBLICACOES.filter((p) => p.manifest).map((p) => ({ id: p.slug }));
}

export function generateMetadata({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  const capa = capaDe(p);
  return {
    title: `${p.titulo_pt} — TED 77/2024`,
    description: `${p.titulo_original} — versão de divulgação científica: apostila, vídeo, podcast, quiz, mapa mental, painel interativo e base de dados aberta.`,
    openGraph: {
      title: p.titulo_pt,
      description: `Divulgação científica do TED 77/2024 · ${p.tema_nome}`,
      url: `${BASE}/artigos/${p.slug}/`,
      images: capa ? [{ url: `${BASE}${capa}` }] : [],
      locale: 'pt_BR', type: 'article',
    },
    other: {
      citation_title: p.titulo_original,
      citation_publication_date: '2026',
      citation_language: 'pt-BR',
      citation_public_url: `${BASE}/artigos/${p.slug}/`,
    },
  };
}

function jsonLd(p, a, l) {
  const itens = [];
  if (l?.base) {
    itens.push({
      '@context': 'https://schema.org', '@type': 'Dataset',
      name: 'Internações hospitalares do SUS no Rio de Janeiro — 2025 (SIH/SUS)',
      description: 'Base aberta derivada dos microdados públicos do SIH/SUS (DATASUS): 926.136 internações de 2025 agregadas por município, especialidade e capítulo CID-10. Licença CC-BY 4.0.',
      url: l.base, license: 'https://creativecommons.org/licenses/by/4.0/',
      creator: { '@type': 'Organization', name: 'TED 77/2024 — Transformação Digital do SUS (UFF/FEC/SEIDIGI-MS)' },
      distribution: [{
        '@type': 'DataDownload', encodingFormat: 'text/csv',
        contentUrl: 'https://raw.githubusercontent.com/RaulAraujoSilva/ted77-sih-rj-dados-abertos/main/clean/sih_rj_2025_municipio_mes_especialidade.csv',
      }],
    });
  }
  if (a?.video) {
    itens.push({
      '@context': 'https://schema.org', '@type': 'VideoObject',
      name: `${p.titulo_pt} (vídeo de divulgação)`,
      description: 'A história do artigo em vídeo de 3 minutos, com narração e legendas em português.',
      contentUrl: `${BASE}${a.video}`, thumbnailUrl: capaDe(p) ? `${BASE}${capaDe(p)}` : undefined,
      uploadDate: '2026-06-13', inLanguage: 'pt-BR',
    });
  }
  return itens;
}

function Sec({ id, icone, titulo, meta, children, tipo }) {
  return (
    <details className="sec" id={id} data-tipo={tipo}>
      <summary>
        <TipoIcone nome={icone} />
        <span className="sec-titulo">
          <b>{titulo}</b>
          <small>{meta}</small>
        </span>
        <span className="chevron" aria-hidden="true" />
      </summary>
      <div className="sec-corpo">{children}</div>
    </details>
  );
}

export default function Artigo({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  const a = p.manifest.assets;
  const l = p.manifest.links;
  const ex = extraDe(p.id);
  const ld = jsonLd(p, a, l);
  const capa = capaDe(p);

  // central de conteúdos: só o que existe para este artigo
  const tiles = [
    a.video && { id: 'sec-video', icone: 'video', nome: 'Vídeo', meta: '3 min' },
    a.apostila && { id: 'sec-apostila', icone: 'apostila', nome: 'Apostila', meta: 'PDF · 21 págs' },
    ex?.quiz && { id: 'sec-quiz', icone: 'quiz', nome: 'Quiz', meta: `${ex.quiz.length} perguntas` },
    ex?.mindmap && { id: 'sec-mapa', icone: 'mapa', nome: 'Mapa mental', meta: 'interativo' },
    a.podcast && { id: 'sec-podcast', icone: 'podcast', nome: 'Podcast', meta: '6 min' },
    l?.painel && { id: 'sec-painel', icone: 'painel', nome: 'Painel', meta: 'dados ao vivo' },
    ex?.historia && { id: null, href: `/artigos/${p.slug}/historia/`, icone: 'historia', nome: 'História visual', meta: '6 passos' },
    l?.base && { id: 'sec-dados', icone: 'base', nome: 'Base de dados', meta: 'CSV aberto' },
    (a.fichamento_a3 || a.fichamento_pptx) && { id: 'sec-fichamento', icone: 'fichamento', nome: 'Fichamento', meta: 'A3 + slides' },
    a.resumo && { id: 'sec-apostila', icone: 'resumo', nome: 'Resumo', meta: 'PDF · 3 págs' },
    ex?.referencias && { id: 'sec-referencias', icone: 'resumo', nome: 'Referências', meta: `${ex.referencias.length} fontes` },
    ex?.citacao && { id: 'sec-citar', icone: 'apostila', nome: 'Como citar', meta: 'ABNT · BibTeX' },
  ].filter(Boolean);

  return (
    <main id="conteudo" className="container" data-tema={p.tema}>
      <AbrirSecao />
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <Link href={`/areas/${p.tema.toLowerCase()}/`}>{p.tema_nome}</Link> › <b>{p.id}</b>
      </nav>

      <section className="hot-hero compacto" data-tema={p.tema}>
        <span className="badge claro">{p.tema} · {p.tema_nome}</span>
        <h2>{p.titulo_pt}</h2>
        <p className="orig">{p.titulo_original}</p>
        <p className="autores">{p.fonte} · {p.tipo_estudo} · acervo TED 77/2024 ({p.id})</p>
      </section>

      {ex?.cinco_perguntas && (
        <div className="bloco">
          <h3>Em 5 perguntas</h3>
          <div className="ficha5 duas-colunas">
            {ex.cinco_perguntas.map((item, i) => (
              <div className="item" key={i}>
                <b>{item.q}</b>
                <p><TextoComGlossario texto={item.a} glossario={ex.glossario} /></p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="central-titulo" id="central">Tudo deste artigo</h3>
      <nav className="central" aria-label="Central de conteúdos do artigo">
        {tiles.map((t, i) =>
          t.href ? (
            <Link key={i} href={t.href} className="tile" data-tipo={t.icone}>
              <TipoIcone nome={t.icone} />
              <b>{t.nome}</b>
              <small>{t.meta}</small>
            </Link>
          ) : (
            <a key={i} href={`#${t.id}`} className="tile" data-abre={t.id} data-tipo={t.icone}>
              <TipoIcone nome={t.icone} />
              <b>{t.nome}</b>
              <small>{t.meta}</small>
            </a>
          )
        )}
      </nav>

      {a.video && (
        <Sec id="sec-video" icone="video" tipo="videos" titulo="Vídeo"
          meta="3 min · MP4 1080p com legendas em português">
          <video controls preload="none" poster={capa || undefined} crossOrigin="anonymous">
            <source src={a.video} type="video/mp4" />
            {a.legendas && (
              <track kind="captions" src={a.legendas} srcLang="pt-BR" label="Português" default />
            )}
            Seu navegador não suporta vídeo HTML5.
          </video>
        </Sec>
      )}

      {a.apostila && (
        <Sec id="sec-apostila" icone="apostila" tipo="apostilas" titulo="Apostila e resumo"
          meta="versão completa para estudo (21 págs) e resumo de 3 páginas">
          <p className="desc">Módulos didáticos, boxes, questões com gabarito e glossário, no padrão SUS Digital.</p>
          <div className="botoes">
            <a className="btn" href={a.apostila} data-evento="download-apostila">Abrir apostila (PDF)</a>
            {a.resumo && <a className="btn sec" href={a.resumo} data-evento="download-resumo">Resumo 3-4 págs (PDF)</a>}
          </div>
        </Sec>
      )}

      {ex?.quiz && (
        <Sec id="sec-quiz" icone="quiz" tipo="quizzes" titulo="Teste seu conhecimento"
          meta={`${ex.quiz.length} perguntas com explicação · selo de conclusão`}>
          <Quiz artigoId={p.id} questoes={ex.quiz} titulo={p.titulo_pt} />
        </Sec>
      )}

      {ex?.mindmap && (
        <Sec id="sec-mapa" icone="mapa" tipo="mapas" titulo="Mapa mental"
          meta="estrutura navegável do artigo · clique para expandir os ramos">
          <MapaMental markdown={ex.mindmap} titulo={p.titulo_pt} tooltips={ex.mindmap_tooltips} />
        </Sec>
      )}

      {a.podcast && (
        <Sec id="sec-podcast" icone="podcast" tipo="podcasts" titulo="Podcast"
          meta="áudio-resumo em conversa (Arthur e Carla) · 6 min">
          <audio controls preload="none" src={a.podcast} />
          <p className="quiz-nota" style={{ marginTop: 'var(--s-2)' }}>
            Assine o feed: <a href="/podcast.xml">/podcast.xml</a>
          </p>
        </Sec>
      )}

      {l?.painel && (
        <Sec id="sec-painel" icone="painel" tipo="paineis" titulo="Painel interativo"
          meta="dados reais com filtros, mapa do estado e morbidade CID-10">
          <p className="desc">
            Filtros por município e período, mapa coroplético e cross-filters.{' '}
            <a href={l.painel}>Abrir em tela cheia ↗</a>
          </p>
          <iframe className="painel" src={l.painel} loading="lazy"
            title="Painel interativo — Internações SUS-RJ 2025" />
        </Sec>
      )}

      {l?.base && (
        <Sec id="sec-dados" icone="base" tipo="bases" titulo="Base de dados aberta"
          meta="CSV + dicionário + datapackage validado · CC-BY 4.0">
          <div className="botoes">
            <a className="btn" href={l.base}>Repositório no GitHub ↗</a>
            <Link className="btn sec" href="/dados/">Baixar pelos dados abertos</Link>
          </div>
        </Sec>
      )}

      {(a.fichamento_a3 || a.fichamento_pptx) && (
        <Sec id="sec-fichamento" icone="fichamento" tipo="fichamentos" titulo="Fichamento DMAIC"
          meta="o artigo em 1 página (A3) e em apresentação">
          <div className="botoes">
            {a.fichamento_a3 && <a className="btn" href={a.fichamento_a3}>Relatório A3 (PDF)</a>}
            {a.fichamento_pptx && <a className="btn sec" href={a.fichamento_pptx}>Apresentação (PPTX)</a>}
          </div>
        </Sec>
      )}

      {ex?.referencias && (
        <Sec id="sec-referencias" icone="resumo" tipo="resumos" titulo="Referências bibliográficas"
          meta={`${ex.referencias.length} fontes · DOI linkado ao original quando disponível`}>
          <ul className="refs-lista">
            {ex.referencias.map((r, i) => (
              <li key={i}>
                {r.texto}{' '}
                {r.doi && (
                  <a className="doi-badge" href={`https://doi.org/${r.doi}`} rel="noopener">
                    DOI ↗
                  </a>
                )}
                {!r.doi && r.url && (
                  <a className="doi-badge cinza" href={r.url} rel="noopener">acessar ↗</a>
                )}
              </li>
            ))}
          </ul>
        </Sec>
      )}

      {ex?.citacao && (
        <Sec id="sec-citar" icone="apostila" tipo="apostilas" titulo="Como citar"
          meta="ABNT e BibTeX copiáveis · licença CC-BY 4.0">
          <Citacao citacao={ex.citacao} />
        </Sec>
      )}

      <div className="bloco">
        <div className="aviso">
          <b>Artigo original:</b> {p.titulo_original} — publicado na {p.fonte}. O texto científico
          completo está disponível nos anais do evento; este hotsite reúne as versões de divulgação
          produzidas pelo TED 77/2024.
        </div>
      </div>
    </main>
  );
}
