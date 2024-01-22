import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    'process.env': process.env,
},
resolve: {
  alias: {
    "./runtimeConfig": "./runtimeConfig.browser",
  },
},
})

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
