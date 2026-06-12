import Link from 'next/link';
import { TIPOS, comAsset, capaDe, destinoDe } from '../../../lib/dados';
import { TipoIcone } from '../../../components/Icones';

export function generateStaticParams() {
  return TIPOS.map((t) => ({ tipo: t.id }));
}

export function generateMetadata({ params }) {
  const t = TIPOS.find((x) => x.id === params.tipo);
  return { title: `${t.nome} — TED 77/2024` };
}

export default function Galeria({ params }) {
  const t = TIPOS.find((x) => x.id === params.tipo);
  const pubs = comAsset(t.chave, t.fonte);
  return (
    <main id="conteudo" className="container" data-tipo={t.id}>
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <Link href="/#conteudos">Tipos de conteúdo</Link> › <b>{t.nome}</b>
      </nav>

      <div className="galeria-cab">
        <TipoIcone nome={t.icone} />
        <div>
          <h2 className="secao" style={{ margin: 0 }}>{t.nome}</h2>
          <p className="lead" style={{ margin: 0 }}>{t.desc}</p>
        </div>
      </div>

      {pubs.length === 0 ? (
        <div className="vazio" data-tipo={t.id}>
          <TipoIcone nome={t.icone} />
          <b>Os primeiros itens desta galeria entram no ar em breve.</b>
          <span>Conforme a produção avança, os {t.nome.toLowerCase()} dos 43 artigos aparecem aqui automaticamente.</span>
        </div>
      ) : (
        <div className="grid g3" style={{ marginTop: 'var(--s-4)' }}>
          {pubs.map((p) => {
            const destino = destinoDe(p, t);
            const externo = !t.fonte && !p.manifest.assets[t.chave];
            const capa = capaDe(p);
            return (
              <div key={p.id} className="card pub" data-tema={p.tema}>
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
                  <p className="orig">{p.id} · {p.fonte}</p>
                  <div className="botoes" style={{ marginTop: 'auto', paddingTop: 'var(--s-3)' }}>
                    <a className="btn" href={destino}>{externo ? 'Abrir ↗' : 'Abrir'}</a>
                    <Link className="btn ter" href={`/artigos/${p.slug}/`}>hotsite do artigo</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pubs.length > 0 && (
        <p style={{ marginTop: 'var(--s-5)', fontSize: '.85rem', color: 'var(--rodape)' }}>
          Conforme a produção avança, todos os {t.nome.toLowerCase()} dos 43 artigos do acervo
          aparecem automaticamente nesta galeria.
        </p>
      )}
    </main>
  );
}
