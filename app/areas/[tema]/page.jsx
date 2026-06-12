import Link from 'next/link';
import { TEMAS, porTema, publicadosPorTema, capaDe } from '../../../lib/dados';

export function generateStaticParams() {
  return TEMAS.map((t) => ({ tema: t.id }));
}

export function generateMetadata({ params }) {
  const t = TEMAS.find((x) => x.id === params.tema);
  return { title: `${t.sigla} · ${t.nome} — TED 77/2024` };
}

export default function Area({ params }) {
  const t = TEMAS.find((x) => x.id === params.tema);
  const pubs = porTema(t.sigla);
  const noAr = publicadosPorTema(t.sigla).length;
  return (
    <main id="conteudo" className="container" data-tema={t.sigla}>
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <Link href="/#areas">Áreas</Link> › <b>{t.sigla}</b>
      </nav>

      <header className="area-hero" data-tema={t.sigla}>
        <span className="sigla">ÁREA {t.sigla}</span>
        <h2>{t.nome}</h2>
        <p>{t.desc}</p>
        <div className="stats">{pubs.length} publicações · {noAr} já no ar</div>
      </header>

      <div className="grid g3">
        {pubs.map((p) => {
          const capa = capaDe(p);
          const thumb = (
            <figure className="thumb">
              {capa ? (
                <img src={capa} alt="" loading="lazy" width="1536" height="1024" />
              ) : (
                <span className="sigla-marca" aria-hidden="true">{p.tema}</span>
              )}
            </figure>
          );
          const corpo = (
            <div className="card-body">
              <span className={p.manifest ? 'badge' : 'badge draft'}>
                {p.manifest ? `${p.id} · publicado` : 'Em produção'}
              </span>
              <h3>{p.titulo_pt}</h3>
              <p className="orig">{p.titulo_original}</p>
              <div className="meta">
                <span className="badge cinza">{p.fonte}</span>
                <span className="badge cinza">{p.tipo_estudo}</span>
              </div>
            </div>
          );
          return p.manifest ? (
            <Link key={p.id} href={`/artigos/${p.slug}/`} className="card pub" data-tema={p.tema}>
              {thumb}{corpo}
            </Link>
          ) : (
            <div key={p.id} className="card pub draft" data-tema={p.tema}>
              {thumb}{corpo}
            </div>
          );
        })}
      </div>
    </main>
  );
}
