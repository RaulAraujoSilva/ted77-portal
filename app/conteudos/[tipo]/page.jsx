import Link from 'next/link';
import { TIPOS, comAsset } from '../../../lib/dados';

export function generateStaticParams() {
  return TIPOS.map((t) => ({ tipo: t.id }));
}

export function generateMetadata({ params }) {
  const t = TIPOS.find((x) => x.id === params.tipo);
  return { title: `${t.nome} — TED 77/2024` };
}

export default function Galeria({ params }) {
  const t = TIPOS.find((x) => x.id === params.tipo);
  const pubs = comAsset(t.chave);
  return (
    <main id="conteudo" className="container">
      <p className="crumb">
        <Link href="/">Início</Link> › Tipos de conteúdo › {t.nome}
      </p>
      <h2 className="secao" style={{ marginTop: 0 }}>{t.nome}</h2>
      <p className="lead">{t.desc}</p>

      {pubs.length === 0 && (
        <div className="aviso">Os primeiros itens desta galeria entram no ar em breve.</div>
      )}

      <div className="grid g3">
        {pubs.map((p) => {
          const destino = p.manifest.assets[t.chave] || p.manifest.links[t.chave];
          const externo = !p.manifest.assets[t.chave];
          return (
            <div key={p.id} className="card pub">
              <span className="badge">{p.tema} · {p.tema_nome}</span>
              <h3>{p.titulo_pt}</h3>
              <p className="orig">{p.id} · {p.fonte}</p>
              <div className="botoes" style={{ marginTop: 'auto' }}>
                <a className="btn" href={destino}>
                  {externo ? 'Abrir ↗' : 'Abrir'}
                </a>
                <Link className="btn sec" href={`/artigos/${p.slug}/`}>hotsite do artigo</Link>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 24, fontSize: '.85rem', color: 'var(--rodape)' }}>
        Conforme a produção avança, todos os {t.nome.toLowerCase()} dos 43 artigos do acervo
        aparecem automaticamente nesta galeria.
      </p>
    </main>
  );
}
