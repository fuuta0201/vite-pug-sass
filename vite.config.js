import { defineConfig } from 'vite';
import liveReload from 'vite-plugin-live-reload';
import pug from 'pug';
import path from 'path';
import fs from 'fs-extra';

const outDir = 'dist/wp-content/themes/mytheme';
const srcDir = 'src';

function compilePugToHtml() {
  const pugFiles = fs.readdirSync(srcDir + '/pug').filter(file => path.extname(file) === '.pug');
  
  pugFiles.forEach(file => {
    const filePath = path.join(srcDir + '/pug', file);
    const html = pug.renderFile(filePath, {
      basedir: srcDir,
      filters: {
        php: (text) => {
          return `<?php ${text} ?>`;
        }
      }
    });
    const outPath = path.join(outDir, path.basename(file, '.pug') + '.php');
    fs.outputFileSync(outPath, html);
  });
}

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'info',
  root: '',
  server: {
    host: true,
    cors: true,
    strictPort: true,
    port: 3000,
    hmr: {
      host: "localhost",
    },
    proxy: {
      '/': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      }
    },
    watch: {
      usePolling: true,
      include: `${srcDir}/pug/**/*.pug`,
    },
  },
  plugins: [
    {
      name: 'pug-transformer',
      buildStart() {
        compilePugToHtml();
      },
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.pug')) {
          console.log(`Pug file changed: ${file}`);
          compilePugToHtml();
          server.ws.send({
            type: 'full-reload',
          });
        }
      }
    },
    liveReload('dist/wp-content/themes/mytheme/**/*.php'),
  ],
});