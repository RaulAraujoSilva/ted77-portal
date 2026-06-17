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
      description: 'A história do artigo em vídeo de 3 minutos, com narração e legendas em português. Narração e avatar gerados por inteligência artificial.',
      contentUrl: `${BASE}${a.video}`, thumbnailUrl: capaDe(p) ? `${BASE}${capaDe(p)}` : undefined,
      uploadDate: '2026-06-13', inLanguage: 'pt-BR',
    });
  }
  return itens;
}

function Sec({ id, icone, titulo, meta, children, tipo, grupo }) {
  return (
    <details className="sec" id={id} data-tipo={tipo} data-grupo={grupo}>
      <summary>
        <TipoIcone nome={icone} />
        <span className="sec-titulo">
          <b>{titulo}</b>
          {meta && <small>{meta}</small>}
        </span>
        <span className="chevron" aria-hidden="true" />
      </summary>
      <div className="sec-corpo">{children}</div>
    </details>
  );
}

function GrupoCab({ grupo, nome, qtd }) {
  return (
    <h3 className="grupo-cab" data-grupo={grupo}>
      <span>{nome}</span>
      <small>{qtd} {qtd === 1 ? 'recurso' : 'recursos'}</small>
    </h3>
  );
}

export default function Artigo({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  const a = p.manifest.assets;
  const l = p.manifest.links;
  const ex = extraDe(p.id);
  const ld = jsonLd(p, a, l);
  const capa = capaDe(p);

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
        {ex?.cinco_perguntas?.[0] && (
          <p className="hero-resumo">{ex.cinco_perguntas[0].a}</p>
        )}
        <p className="autores">
          <i>{p.titulo_original}</i> · {p.fonte} · {p.tipo_estudo} · acervo TED 77/2024 ({p.id})
        </p>
      </section>

      {/* ====== AUDIOVISUAL (roxo) — ordem alfabética ====== */}
      <GrupoCab grupo="av" nome="Audiovisual"
        qtd={[ex?.historia, a.podcast, a.video].filter(Boolean).length} />

      {ex?.historia && (
        <Link href={`/artigos/${p.slug}/historia/`} className="sec sec-link" data-grupo="av"
          target="_blank" rel="noopener">
          <TipoIcone nome="historia" />
          <span className="sec-titulo">
            <b>História visual</b>
          </span>
          <span className="seta-link" aria-hidden="true">↗</span>
        </Link>
      )}

      {a.podcast && (
        <Sec id="sec-podcast" icone="podcast" tipo="podcasts" grupo="av" titulo="Podcast">
          <audio controls preload="none" src={a.podcast} />
          <p className="quiz-nota" style={{ marginTop: 'var(--s-2)' }}>
            Assine o feed: <a href="/podcast.xml">/podcast.xml</a>
          </p>
        </Sec>
      )}

      {a.video && (
        <Sec id="sec-video" icone="video" tipo="videos" grupo="av" titulo="Vídeo">
          <video controls preload="none" poster={capa || undefined} crossOrigin="anonymous">
            <source src={a.video} type="video/mp4" />
            {a.legendas && (
              <track kind="captions" src={a.legendas} srcLang="pt-BR" label="Português" default />
            )}
            Seu navegador não suporta vídeo HTML5.
          </video>
          <p className="quiz-nota aviso-ia" style={{ marginTop: 'var(--s-2)' }}>
            ⚠️ <b>Conteúdo gerado com inteligência artificial:</b> a narração (voz) e o
            apresentador (avatar) deste vídeo foram produzidos por IA a partir do conteúdo
            do artigo. Os dados e as conclusões são do estudo original.
          </p>
        </Sec>
      )}

      {/* ====== AUTOESTUDO (verde) ====== */}
      <GrupoCab grupo="auto" nome="Autoestudo"
        qtd={[ex?.mindmap, ex?.quiz].filter(Boolean).length} />

      {ex?.mindmap && (
        <Sec id="sec-mapa" icone="mapa" tipo="mapas" grupo="auto" titulo="Mapa mental">
          <MapaMental markdown={ex.mindmap} titulo={p.titulo_pt} tooltips={ex.mindmap_tooltips} />
        </Sec>
      )}

      {ex?.quiz && (
        <Sec id="sec-quiz" icone="quiz" tipo="quizzes" grupo="auto" titulo="Quiz">
          <Quiz artigoId={p.id} questoes={ex.quiz} titulo={p.titulo_pt} />
        </Sec>
      )}

      {/* ====== DADOS (laranja) ====== */}
      <GrupoCab grupo="dados" nome="Dados"
        qtd={[l?.base, l?.painel].filter(Boolean).length} />

      {l?.base && (
        <Sec id="sec-dados" icone="base" tipo="bases" grupo="dados" titulo="Base de dados aberta">
          <div className="botoes">
            <a className="btn" href={l.base} target="_blank" rel="noopener">Acessar a base de dados aberta (GitHub) ↗</a>
            <Link className="btn sec" href="/dados/" target="_blank" rel="noopener">Baixar pelos dados abertos</Link>
          </div>
        </Sec>
      )}

      {l?.painel && (
        <Sec id="sec-painel" icone="painel" tipo="paineis" grupo="dados" titulo="Painel interativo">
          <p className="desc">
            Filtros por município e período, mapa coroplético e cross-filters.{' '}
            <a href={l.painel} target="_blank" rel="noopener">Abrir em tela cheia ↗</a>
          </p>
          <iframe className="painel" src={l.painel} loading="lazy"
            title="Painel interativo — Internações SUS-RJ 2025" />
        </Sec>
      )}

      {/* ====== LEITURA (azul) ====== */}
      <GrupoCab grupo="leitura" nome="Leitura"
        qtd={[a.apostila, ex?.cinco_perguntas,
              a.fichamento_a3 || a.fichamento_pptx, ex?.referencias, ex?.citacao].filter(Boolean).length} />

      {a.apostila && (
        <Sec id="sec-apostila" icone="apostila" tipo="apostilas" grupo="leitura" titulo="Apostila e resumo">
          <p className="desc">Módulos didáticos, boxes, questões com gabarito e glossário, no padrão SUS Digital.</p>
          <div className="botoes">
            <a className="btn" href={a.apostila} data-evento="download-apostila" target="_blank" rel="noopener">Abrir apostila (PDF)</a>
            {a.resumo && <a className="btn sec" href={a.resumo} data-evento="download-resumo" target="_blank" rel="noopener">Resumo 3-4 págs (PDF)</a>}
          </div>
        </Sec>
      )}

      {ex?.cinco_perguntas && (
        <Sec id="sec-ficha" icone="resumo" tipo="resumos" grupo="leitura" titulo="Em 5 perguntas">
          <div className="ficha5 duas-colunas">
            {ex.cinco_perguntas.map((item, i) => (
              <div className="item" key={i}>
                <b>{item.q}</b>
                <p><TextoComGlossario texto={item.a} glossario={ex.glossario} /></p>
              </div>
            ))}
          </div>
        </Sec>
      )}

      {(a.fichamento_a3 || a.fichamento_pptx) && (
        <Sec id="sec-fichamento" icone="fichamento" tipo="fichamentos" grupo="leitura" titulo="Fichamento DMAIC">
          <div className="botoes">
            {a.fichamento_a3 && <a className="btn" href={a.fichamento_a3} target="_blank" rel="noopener">Relatório A3 (PDF)</a>}
            {a.fichamento_pptx && <a className="btn sec" href={a.fichamento_pptx} target="_blank" rel="noopener">Apresentação (PPTX)</a>}
          </div>
        </Sec>
      )}

      {ex?.referencias && (
        <Sec id="sec-referencias" icone="resumo" tipo="resumos" grupo="leitura" titulo="Referências bibliográficas">
          <ul className="refs-lista">
            {ex.referencias.map((r, i) => (
              <li key={i}>
                {r.texto}{' '}
                {r.doi && (
                  <a className="doi-badge" href={`https://doi.org/${r.doi}`} target="_blank" rel="noopener">
                    DOI ↗
                  </a>
                )}
                {!r.doi && r.url && (
                  <a className="doi-badge cinza" href={r.url} target="_blank" rel="noopener">acessar ↗</a>
                )}
              </li>
            ))}
          </ul>
        </Sec>
      )}

      {ex?.citacao && (
        <Sec id="sec-citar" icone="apostila" tipo="apostilas" grupo="leitura" titulo="Como citar">
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
