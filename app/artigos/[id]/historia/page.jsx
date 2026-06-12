import Link from 'next/link';
import { PUBLICACOES } from '../../../../lib/dados';
import Historia from '../../../../components/Historia';

export function generateStaticParams() {
  return [{ id: 'ind-02' }];
}

export const metadata = {
  title: 'Em modo história: o tesouro de dados do SUS — TED 77/2024',
  description: 'Uma narrativa visual com os dados reais de 926 mil internações do SUS no RJ em 2025.',
};

export default function PaginaHistoria({ params }) {
  const p = PUBLICACOES.find((x) => x.slug === params.id);
  return (
    <main id="conteudo" className="container" data-tema={p.tema}>
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <Link href={`/artigos/${p.slug}/`}>{p.id}</Link> › <b>Modo história</b>
      </nav>
      <h2 className="secao" style={{ marginTop: 0 }}>
        <span className="kicker">Narrativa visual · role para avançar</span>
        Um ano de internações do SUS, contado em 6 passos
      </h2>
      <p className="lead">
        A versão "data storytelling" do artigo <i>{p.titulo_original}</i> — o gráfico fica fixo e
        responde ao seu scroll.
      </p>
      <Historia />
      <div className="bloco">
        <div className="aviso">
          Prefere o formato completo? Volte ao <Link href={`/artigos/${p.slug}/`}>hotsite do artigo</Link>{' '}
          para a apostila, o vídeo, o podcast e o quiz.
        </div>
      </div>
    </main>
  );
}
