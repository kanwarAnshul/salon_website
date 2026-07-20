/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://glamourstudio-demo.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const paths = [
      '/services',
      '/gallery',
      '/team',
      '/booking',
      '/pricing',
      '/blog',
      '/about',
      '/contact',
    ];

    return paths.map((path) => ({
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }));
  },
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

export default config;
