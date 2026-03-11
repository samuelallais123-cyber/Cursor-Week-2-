import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith('REACT_APP_')) {
      processEnv[`process.env.${key}`] = JSON.stringify(env[key]);
    }
  });

  return {
    plugins: [react()],
    define: processEnv,
  };
});
