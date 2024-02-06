// vite.config.js
import fs,{ readFileSync } from 'fs';

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
      writeBundle() {
        console.log('\n\n BUILD END ');
        const files = fs.readdirSync('dist/assets');

        const fileCss = files.find((file) => file.startsWith('index-') && file.endsWith('.css'));
        const fileScript = files.find((file) => file.startsWith('index-') && file.endsWith('.js'));


        // prepend 'fileScript' with 'fileCss' content
        const css = fs.readFileSync(`dist/assets/${fileCss}`);
        const script = fs.readFileSync(`dist/assets/${fileScript}`);
        fs.writeFileSync(`dist/assets/${fileScript}`, 
        `
        let styleScriptInject = document.createElement('style');
        styleScriptInject.innerHTML = \`${css}\`;
        document.head.appendChild(styleScriptInject);
        \n\n\n
        // start line of main SCRIPT
        ${script}`
        );
      }
    }
  ],
};