'use client';
// Menu principal com indicação da seção atual (aria-current) — o usuário sempre
// sabe em que eixo do portal está, em qualquer página.
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITENS = [
  { href: '/', rotulo: 'Início', ativo: (p) => p === '/' },
  { href: '/#areas', rotulo: 'Eixos temáticos', ativo: (p) => p.startsWith('/areas') },
  { href: '/#artigos', rotulo: 'Artigos', ativo: (p) => p.startsWith('/artigos') },
  { href: '/#conteudos', rotulo: 'Tipos de conteúdo', ativo: (p) => p.startsWith('/conteudos') || p.startsWith('/dados') },
  { href: '/buscar/', rotulo: '🔍 Buscar', ativo: (p) => p.startsWith('/buscar'), accessKey: '3' },
];

export default function NavPrincipal() {
  const path = usePathname() || '/';
  return (
    <nav className="principal" aria-label="Navegação principal" accessKey="2">
      {ITENS.map((i) => (
        <Link key={i.rotulo} href={i.href} accessKey={i.accessKey}
          aria-current={i.ativo(path) ? 'page' : undefined}>
          {i.rotulo}
        </Link>
      ))}
    </nav>
  );
}
