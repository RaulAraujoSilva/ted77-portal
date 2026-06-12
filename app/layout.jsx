import './globals.css';
import Link from 'next/link';
import { TEMAS } from '../lib/dados';

export const metadata = {
  title: 'TED 77/2024 · Divulgação Científica — Transformação Digital do SUS',
  description:
    'Portal de divulgação científica do TED 77/2024 (UFF · Ministério da Saúde): apostilas, vídeos, podcasts, painéis e bases de dados abertas sobre a transformação digital do SUS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/fonts/rawline/css/rawline.css"
        />
      </head>
      <body>
        <a className="skip" href="#conteudo">Ir para o conteúdo</a>
        <header className="topo">
          <span className="petal p1" aria-hidden="true" />
          <span className="petal p2" aria-hidden="true" />
          <span className="petal p3" aria-hidden="true" />
          <div className="container linha">
            <Link href="/">
              <img src="/brand/logotipo-sus-digital-b.png" alt="SUS Digital — página inicial" />
            </Link>
            <div className="t">
              <h1>Divulgação Científica · TED 77/2024</h1>
              <div className="sub">Transformação Digital do SUS · UFF · Ministério da Saúde</div>
            </div>
            <nav className="principal" aria-label="Navegação principal">
              <Link href="/">Início</Link>
              <Link href="/#areas">Áreas</Link>
              <Link href="/#artigos">Artigos</Link>
              <Link href="/#conteudos">Tipos de conteúdo</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="rodape">
          <div className="container linha">
            <img src="/brand/regua-institucional.png" alt="Assinaturas institucionais: Ministério da Saúde, Governo Federal, UFF e LabDGE" />
            <div className="txt">
              Coleção de Divulgação Científica · TED nº 77/2024 — UFF · FEC · SEIDIGI/Ministério da Saúde
              <br />
              Conteúdos sob licença CC-BY 4.0 · dados abertos no{' '}
              <a href="https://github.com/RaulAraujoSilva/ted77-sih-rj-dados-abertos">GitHub</a>
            </div>
            <nav className="areas-chips" aria-label="Atalhos por área">
              {TEMAS.map((t) => (
                <a key={t.id} href={`/areas/${t.id}/`} data-tema={t.sigla}>{t.sigla} · {t.nome.split(' ')[0]}</a>
              ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
