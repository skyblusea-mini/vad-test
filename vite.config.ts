import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://github.com/ricky0123/vad/issues/9
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js',
          dest: '/',
        },
        {
          src: 'node_modules/@ricky0123/vad-web/dist/*.onnx',
          dest: '/',
        },
        {
          src: 'node_modules/onnxruntime-web/dist/*.wasm',
          dest: '/',
        },
      ],
    }),
  ],
});
