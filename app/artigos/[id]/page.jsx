import Link from 'next/link';
import { PUBLICACOES } from '../../../lib/dados';

export function generateStaticParams() {
  return PUBLICACOES.filter((p) => p.manifest).map((p) => ({ id: p.slug }));
}

export function generateMetadata({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  return { title: `${p.titulo_pt} — TED 77/2024` };
}

export default function Artigo({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  const a = p.manifest.assets;
  const l = p.manifest.links;
  return (
    <main id="conteudo" className="container">
      <p className="crumb">
        <Link href="/">Início</Link> › <Link href={`/areas/${p.tema.toLowerCase()}/`}>{p.tema_nome}</Link> › {p.id}
      </p>

      <section className="hot-hero">
        <span className="badge">{p.tema} · {p.tema_nome}</span>
        <h2>{p.titulo_pt}</h2>
        <p className="orig">{p.titulo_original}</p>
        <p className="autores">
          {p.fonte} · {p.tipo_estudo} · acervo TED 77/2024 ({p.id})
        </p>
      </section>

      {a.video && (
        <div className="bloco">
          <h3>🎬 Vídeo (3 min)</h3>
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
          <div className="bloco">
            <h3>📘 Apostila didática</h3>
            <p className="desc">Versão completa para estudo: módulos, boxes, questões com gabarito e glossário (PDF, ~20 págs).</p>
            <div className="botoes">
              <a className="btn" href={a.apostila}>Abrir apostila (PDF)</a>
              {a.resumo && <a className="btn sec" href={a.resumo}>Resumo 3-4 págs (PDF)</a>}
            </div>
          </div>
        )}
        {(a.fichamento_a3 || a.fichamento_pptx) && (
          <div className="bloco">
            <h3>📋 Fichamento DMAIC</h3>
            <p className="desc">O artigo em uma página (Relatório A3) e em apresentação, no ciclo Definir-Medir-Analisar-Implementar-Controlar.</p>
            <div className="botoes">
              {a.fichamento_a3 && <a className="btn" href={a.fichamento_a3}>Relatório A3 (PDF)</a>}
              {a.fichamento_pptx && <a className="btn sec" href={a.fichamento_pptx}>Apresentação (PPTX)</a>}
            </div>
          </div>
        )}
      </div>

      {a.podcast && (
        <div className="bloco">
          <h3>🎧 Podcast</h3>
          <p className="desc">Áudio-resumo em formato de conversa (Carlos e Carla, ~6 min).</p>
          <audio controls preload="metadata" src={a.podcast} />
        </div>
      )}

      {l.painel && (
        <div className="bloco">
          <h3>📊 Painel interativo</h3>
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
          <div className="bloco">
            <h3>🗃️ Base de dados aberta</h3>
            <p className="desc">CSV limpos + dicionário de dados + datapackage validado, sob licença CC-BY 4.0.</p>
            <div className="botoes">
              <a className="btn" href={l.base}>Acessar no GitHub ↗</a>
            </div>
          </div>
        )}
        {a.infografico && (
          <div className="bloco">
            <h3>🖼️ Infográfico</h3>
            <p className="desc">Síntese visual do pipeline de dados proposto pelo artigo.</p>
            <img className="minia" src={a.infografico} alt="Infográfico: pipeline de dados em quatro estações — extração, limpeza, vinculação e OLAP/BI" />
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
