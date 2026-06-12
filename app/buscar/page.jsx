import Busca from '../../components/Busca';

export const metadata = { title: 'Buscar — TED 77/2024' };

export default function Buscar() {
  return (
    <main id="conteudo" className="container">
      <h2 className="secao" style={{ marginTop: 'var(--s-4)' }}>
        <span className="kicker">Busca no acervo</span>O que você procura?
      </h2>
      <p className="lead">
        Busque por tema, sigla ou palavra-chave — com suporte a português (acentos e plurais).
      </p>
      <Busca />
    </main>
  );
}
