import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/editor/',
        '/login/',
        '/configuracoes/',
      ],
    },
    sitemap: 'https://dramariaalice.com/sitemap.xml',
  };
}
