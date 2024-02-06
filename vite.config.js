// vite.config.js
import { readFileSync } from 'fs';

export default {
  plugins: [
    {
      name: 'image-to-base64',
      enforce: 'pre',
      resolveId(id) {
        if (id.endsWith('.svg')) {
          return id;
        }
      },
      load(id) {
        if (id.endsWith('.svg')) {
          const file = readFileSync(id);
          const base64 = Buffer.from(file).toString('base64');
          return `export default "data:image/svg+xml;base64,${base64}"`;
        }
      },
    }
  ],
};