// TODO
// @ts-ignore
import { cwd } from 'process';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      proxy: {
        '^/api/fatsecret': {
          target: env.VITE_API_FATSECRET,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api\/fatsecret/, '')
        }
      }
    }
  };
});
