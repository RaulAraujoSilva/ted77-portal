export const metadata = { title: 'Acessibilidade — TED 77/2024' };

export default function Acessibilidade() {
  return (
    <main id="conteudo" className="container">
      <h2 className="secao" style={{ marginTop: 'var(--s-4)' }}>
        <span className="kicker">Declaração</span>Acessibilidade digital
      </h2>
      <p className="lead">
        Este portal segue as diretrizes da ABNT NBR 17225:2025 e do padrão internacional
        WCAG 2.1 nível AA, em linha com a política de acessibilidade digital do Governo Federal.
      </p>

      <div className="bloco">
        <h3>Recursos disponíveis</h3>
        <ul>
          <li><b>VLibras</b> — tradução automática do conteúdo para a Língua Brasileira de Sinais (ícone azul à direita da tela).</li>
          <li><b>Legendas</b> em todos os vídeos (closed captions em português) e versão textual dos mapas mentais.</li>
          <li><b>Navegação por teclado</b> — foco visível em laranja; link "Ir para o conteúdo" no topo.</li>
          <li><b>Atalhos</b>: <kbd>1</kbd> conteúdo · <kbd>2</kbd> menu · <kbd>3</kbd> busca (combinados com as teclas do seu navegador, ex.: Alt+Shift no Firefox, Alt no Chrome/Windows).</li>
          <li><b>Contraste</b> — todos os pares texto/fundo auditados em ≥ 4,5:1 (WCAG AA).</li>
          <li><b>Linguagem simples</b> — resumos no padrão internacional de plain language (Cochrane), com glossário de termos técnicos.</li>
          <li><b>Estrutura semântica</b> — títulos hierárquicos, marcos de navegação e textos alternativos nas imagens.</li>
        </ul>
      </div>

      <div className="bloco">
        <h3>Avaliação</h3>
        <p className="desc">
          Última auditoria automatizada (Lighthouse): acessibilidade 96/100. Auditorias são
          refeitas a cada publicação de conteúdo. Encontrou uma barreira? Escreva para a equipe
          do projeto pelo repositório no GitHub — corrigimos com prioridade.
        </p>
      </div>
    </main>
  );
}
