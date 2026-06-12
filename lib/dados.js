import catalogo from '../content/catalogo.json';
import ind02 from '../content/artigos/IND-02.json';

const manifests = { 'IND-02': ind02 };

export const TEMAS = Object.entries(catalogo.taxonomia).map(([id, nome]) => ({
  id: id.toLowerCase(),
  sigla: id,
  nome,
}));

export const PUBLICACOES = catalogo.publicacoes.map((p) => ({
  ...p,
  slug: p.id.toLowerCase(),
  manifest: manifests[p.id] || null,
}));

export const TIPOS = [
  { id: 'videos', nome: 'Vídeos', chave: 'video', desc: 'Vídeos de 3 a 5 minutos por artigo, com narração e legendas.' },
  { id: 'apostilas', nome: 'Apostilas', chave: 'apostila', desc: 'Apostilas didáticas completas, no padrão SUS Digital.' },
  { id: 'fichamentos', nome: 'Fichamentos DMAIC', chave: 'fichamento_a3', desc: 'Relatórios A3 e apresentações no ciclo DMAIC.' },
  { id: 'podcasts', nome: 'Podcasts', chave: 'podcast', desc: 'Áudio-resumos em formato de conversa.' },
  { id: 'resumos', nome: 'Resumos didáticos', chave: 'resumo', desc: 'Versões didáticas de 3-4 páginas (problema → solução → impacto).' },
  { id: 'paineis', nome: 'Painéis interativos', chave: 'painel', desc: 'Painéis de dados abertos com filtros, mapas e séries.' },
  { id: 'bases', nome: 'Bases de dados abertas', chave: 'base', desc: 'Conjuntos de dados limpos, documentados e reutilizáveis.' },
];

export function porTema(sigla) {
  return PUBLICACOES.filter((p) => p.tema === sigla);
}

export function comAsset(chave) {
  return PUBLICACOES.filter((p) => {
    const m = p.manifest;
    if (!m) return false;
    return (m.assets && m.assets[chave]) || (m.links && m.links[chave]);
  });
}
