import catalogo from '../content/catalogo.json';
import ind02 from '../content/artigos/IND-02.json';

const manifests = { 'IND-02': ind02 };

export const TEMA_INFO = {
  T1: 'Como medir e orientar a evolução digital dos sistemas e estabelecimentos de saúde: índices de maturidade, estratégias nacionais e panoramas da transformação digital.',
  T2: 'Governança pública, cultura organizacional e sustentabilidade como condições para a transformação digital do SUS dar certo.',
  T3: 'Fazer os sistemas de saúde conversarem: interoperabilidade, dados abertos, integração de bases e painéis de gestão.',
  T4: 'Lean Healthcare e gestão de operações: cortar desperdício, melhorar fluxos e elevar a segurança do paciente.',
  T5: 'Inteligência artificial, IoT e sistemas digitais aplicados diretamente ao cuidado e aos serviços de saúde.',
  T6: 'Capacitação e educação digital: formar as pessoas que fazem a transformação acontecer.',
};

export const TEMAS = Object.entries(catalogo.taxonomia).map(([id, nome]) => ({
  id: id.toLowerCase(),
  sigla: id,
  nome,
  desc: TEMA_INFO[id],
}));

export const PUBLICACOES = catalogo.publicacoes.map((p) => ({
  ...p,
  slug: p.id.toLowerCase(),
  manifest: manifests[p.id] || null,
}));

export const TIPOS = [
  { id: 'videos', nome: 'Vídeos', chave: 'video', icone: 'video', desc: 'Vídeos de 3 a 5 minutos por artigo, com narração e legendas.' },
  { id: 'apostilas', nome: 'Apostilas', chave: 'apostila', icone: 'apostila', desc: 'Apostilas didáticas completas, no padrão SUS Digital.' },
  { id: 'fichamentos', nome: 'Fichamentos DMAIC', chave: 'fichamento_a3', icone: 'fichamento', desc: 'Relatórios A3 e apresentações no ciclo DMAIC.' },
  { id: 'podcasts', nome: 'Podcasts', chave: 'podcast', icone: 'podcast', desc: 'Áudio-resumos em formato de conversa.' },
  { id: 'resumos', nome: 'Resumos didáticos', chave: 'resumo', icone: 'resumo', desc: 'Versões didáticas de 3-4 páginas (problema → solução → impacto).' },
  { id: 'paineis', nome: 'Painéis interativos', chave: 'painel', icone: 'painel', desc: 'Painéis de dados abertos com filtros, mapas e séries.' },
  { id: 'bases', nome: 'Bases de dados abertas', chave: 'base', icone: 'base', desc: 'Conjuntos de dados limpos, documentados e reutilizáveis.' },
];

export function porTema(sigla) {
  return PUBLICACOES.filter((p) => p.tema === sigla);
}

export function publicadosPorTema(sigla) {
  return porTema(sigla).filter((p) => p.manifest);
}

export function capaDe(p) {
  return p.manifest?.assets?.capa || null;
}

export function comAsset(chave) {
  return PUBLICACOES.filter((p) => {
    const m = p.manifest;
    if (!m) return false;
    return (m.assets && m.assets[chave]) || (m.links && m.links[chave]);
  });
}
