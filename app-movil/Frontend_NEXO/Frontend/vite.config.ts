/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react(), legacy()],
  server: {
    host: 'localhost',
    port: 8100,
    https: {
      key: fs.readFileSync(
        path.resolve('C:/Users/USUARIO/Documents/Programacion movil/backend/Backend-Nexo2/backend-nexo/secrets/localhost-key.pem')
      ),
      cert: fs.readFileSync(
        path.resolve('C:/Users/USUARIO/Documents/Programacion movil/backend/Backend-Nexo2/backend-nexo/secrets/localhost.pem')
      ),
    },
  },
});
