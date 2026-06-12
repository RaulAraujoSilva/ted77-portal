import Link from 'next/link';
import { PUBLICACOES, extraDe, capaDe } from '../../../lib/dados';
import { TipoIcone } from '../../../components/Icones';
import Quiz from '../../../components/Quiz';
import MapaMental from '../../../components/MapaMental';
import Citacao from '../../../components/Citacao';
import TextoComGlossario from '../../../components/Glossario';

const BASE = 'https://ted77-portal.vercel.app';

export function generateStaticParams() {
  return PUBLICACOES.filter((p) => p.manifest).map((p) => ({ id: p.slug }));
}

export function generateMetadata({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  const capa = capaDe(p);
  return {
    title: `${p.titulo_pt} — TED 77/2024`,
    description: `${p.titulo_original} — versão de divulgação científica: apostila, vídeo, podcast, fichamento DMAIC, painel interativo e base de dados aberta.`,
    openGraph: {
      title: p.titulo_pt,
      description: `Divulgação científica do TED 77/2024 · ${p.tema_nome}`,
      url: `${BASE}/artigos/${p.slug}/`,
      images: capa ? [{ url: `${BASE}${capa}` }] : [],
      locale: 'pt_BR', type: 'article',
    },
    // meta acadêmicas (Highwire) — indexação Google Scholar
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

function Cab({ icone, titulo }) {
  return (
    <div className="cab">
      <TipoIcone nome={icone} />
      <h3>{titulo}</h3>
    </div>
  );
}

export default function Artigo({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  const a = p.manifest.assets;
  const l = p.manifest.links;
  const ex = extraDe(p.id);
  const ld = jsonLd(p, a, l);
  return (
    <main id="conteudo" className="container" data-tema={p.tema}>
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <Link href={`/areas/${p.tema.toLowerCase()}/`}>{p.tema_nome}</Link> › <b>{p.id}</b>
      </nav>

      <section className="hot-hero" data-tema={p.tema}>
        <span className="badge claro">{p.tema} · {p.tema_nome}</span>
        <h2>{p.titulo_pt}</h2>
        <p className="orig">{p.titulo_original}</p>
        <p className="autores">{p.fonte} · {p.tipo_estudo} · acervo TED 77/2024 ({p.id})</p>
        {p.id === 'IND-02' && (
          <div className="botoes" style={{ marginTop: 'var(--s-4)' }}>
            <Link className="btn cta" href={`/artigos/${p.slug}/historia/`}>✨ Ver em modo história</Link>
          </div>
        )}
      </section>

      {ex?.cinco_perguntas && (
        <div className="bloco">
          <h3>Em 5 perguntas</h3>
          <p className="desc">O essencial do estudo, para quem tem pressa.</p>
          <div className="ficha5">
            {ex.cinco_perguntas.map((item, i) => (
              <div className="item" key={i}>
                <b>{item.q}</b>
                <p><TextoComGlossario texto={item.a} glossario={ex.glossario} /></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {a.video && (
        <div className="bloco" data-tipo="videos">
          <Cab icone="video" titulo="Vídeo (3 min)" />
          <p className="desc">A história do artigo em vídeo, com narração e legendas.</p>
          <video controls preload="metadata" crossOrigin="anonymous">
            <source src={a.video} type="video/mp4" />
            {a.legendas && (
              <track kind="captions" src={a.legendas} srcLang="pt-BR" label="Português" default />
            )}
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>
      )}

      <div className="empilha2">
        {a.apostila && (
          <div className="bloco" data-tipo="apostilas">
            <Cab icone="apostila" titulo="Apostila didática" />
            <p className="desc">Versão completa para estudo: módulos, boxes, questões com gabarito e glossário (PDF, ~20 págs).</p>
            <div className="botoes">
              <a className="btn" href={a.apostila}>Abrir apostila (PDF)</a>
              {a.resumo && <a className="btn sec" href={a.resumo}>Resumo 3-4 págs (PDF)</a>}
            </div>
          </div>
        )}
        {(a.fichamento_a3 || a.fichamento_pptx) && (
          <div className="bloco" data-tipo="fichamentos">
            <Cab icone="fichamento" titulo="Fichamento DMAIC" />
            <p className="desc">O artigo em uma página (Relatório A3) e em apresentação, no ciclo Definir-Medir-Analisar-Implementar-Controlar.</p>
            <div className="botoes">
              {a.fichamento_a3 && <a className="btn" href={a.fichamento_a3}>Relatório A3 (PDF)</a>}
              {a.fichamento_pptx && <a className="btn sec" href={a.fichamento_pptx}>Apresentação (PPTX)</a>}
            </div>
          </div>
        )}
      </div>

      {a.podcast && (
        <div className="bloco" data-tipo="podcasts">
          <Cab icone="podcast" titulo="Podcast" />
          <p className="desc">Áudio-resumo em formato de conversa (Arthur e Carla, ~6 min).</p>
          <audio controls preload="metadata" src={a.podcast} />
        </div>
      )}

      {l.painel && (
        <div className="bloco" data-tipo="paineis">
          <Cab icone="painel" titulo="Painel interativo" />
          <p className="desc">
            Os dados do artigo, navegáveis: filtros por município e período, mapa do estado e morbidade
            por capítulo CID-10. <a href={l.painel}>Abrir em tela cheia ↗</a>
          </p>
          <iframe
            className="painel"
            src={l.painel}
            title="Painel interativo — Internações SUS-RJ 2025"
            loading="lazy"
          />
        </div>
      )}

      <div className="empilha2">
        {l.base && (
          <div className="bloco" data-tipo="bases">
            <Cab icone="base" titulo="Base de dados aberta" />
            <p className="desc">CSV limpos + dicionário de dados + datapackage validado, sob licença CC-BY 4.0.</p>
            <div className="botoes">
              <a className="btn" href={l.base}>Acessar no GitHub ↗</a>
            </div>
          </div>
        )}
        {a.infografico && (
          <div className="bloco" data-tipo="resumos">
            <Cab icone="resumo" titulo="Infográfico" />
            <p className="desc">Síntese visual do pipeline de dados proposto pelo artigo.</p>
            <img className="minia" src={a.infografico} loading="lazy"
              alt="Infográfico: pipeline de dados em quatro estações — extração, limpeza, vinculação e OLAP/BI" />
          </div>
        )}
      </div>

      {ex?.mindmap && (
        <div className="bloco">
          <h3>🧠 Mapa mental</h3>
          <p className="desc">A estrutura do artigo em um mapa navegável — clique nos nós para expandir/recolher.</p>
          <MapaMental markdown={ex.mindmap} titulo={p.titulo_pt} />
        </div>
      )}

      {ex?.quiz && (
        <div className="bloco" id="quiz">
          <h3>📝 Teste seu conhecimento</h3>
          <p className="desc">
            {ex.quiz.length} perguntas com explicação a cada resposta. As que você errar voltam
            ao fim da fila — conclua todas para ganhar o selo deste artigo.
          </p>
          <Quiz artigoId={p.id} questoes={ex.quiz} titulo={p.titulo_pt} />
        </div>
      )}

      <div className="empilha2">
        {ex?.citacao && (
          <div className="bloco">
            <h3>📖 Como citar</h3>
            <p className="desc">
              Conteúdo sob licença CC-BY 4.0 — republique e reutilize com atribuição
              (política inspirada na Agência FAPESP).
            </p>
            <Citacao citacao={ex.citacao} />
          </div>
        )}
        {ex?.referencias && (
          <div className="bloco">
            <h3>📚 Referências</h3>
            <p className="desc">Fontes do artigo original e desta versão de divulgação.</p>
            <ul className="refs-lista">
              {ex.referencias.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}
      </div>

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
