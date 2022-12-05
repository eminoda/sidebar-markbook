import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log(command, mode, ssrBuild);
  return {
    plugins: [react()],
  };
});
