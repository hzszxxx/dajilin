import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://dajilin.net';

export default defineConfig({
  site,
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    define: {
      'process.env': '{}',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      proxy: {
        '/api/gn': {
          target: 'https://api.dajilin.net',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/gn/, ''),
          headers: {
            'Origin': 'https://dajilin.net',
          },
        },
      },
    },
  },
  compressHTML: true,
});
