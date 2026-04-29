import { MetadataRoute } from 'next';
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dramariaalice.com';

  // Páginas estáticas que sabemos que existem e são públicas
  const staticPages = [
    '',
    '/bio',
    '/contato',
    '/tratamentos',
    '/alzheimer',
    '/copromax',
    '/disturbios-do-sono',
    '/dosagem-de-iodo',
    '/emagrecimento',
    '/envelhecimento-saudavel',
    '/estresse-fisico-emocional',
    '/gene-mais',
    '/gene-x',
    '/histamina',
    '/hormonal-salivar',
    '/microbioma-intestinal',
    '/modulacao-hormonal',
    '/partica-ortomolecular',
    '/perfil-nutrigenetico',
    '/trombofilia',
  ];

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Buscar slugs dinâmicos do banco para garantir que nada foi esquecido
    const pages = await prisma.pagina.findMany({
      select: { slug: true, updatedAt: true },
    });

    const dynamicEntries = pages
      .filter((page) => !['dashboard', 'editor', 'login', 'configuracoes'].includes(page.slug))
      .map((page) => ({
        url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: page.slug === 'home' ? 1 : 0.7,
      }));

    // Combinar e remover duplicatas por URL
    const allEntries = [...staticEntries, ...dynamicEntries];
    const uniqueEntries = Array.from(new Map(allEntries.map(item => [item.url, item])).values());

    return uniqueEntries;
  } catch (error) {
    console.error("Erro ao gerar sitemap:", error);
    return staticEntries;
  }
}
