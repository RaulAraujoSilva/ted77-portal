import Link from 'next/link';
import Busca from '../../components/Busca';

export const metadata = { title: 'Buscar — TED 77/2024' };

export default function Buscar() {
  return (
    <main id="conteudo" className="container">
      <nav className="crumb" aria-label="Trilha de navegação">
        <Link href="/">Início</Link> › <b>Buscar</b>
      </nav>
      <h2 className="secao" style={{ marginTop: 0 }}>
        <span className="kicker">Busca no acervo</span>O que você procura?
      </h2>
      <p className="lead">
        Busque por tema, sigla ou palavra-chave — com suporte a português (acentos e plurais).
      </p>
      <Busca />
    </main>
  );
}
