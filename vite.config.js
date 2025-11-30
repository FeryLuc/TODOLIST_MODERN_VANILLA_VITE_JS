import { defineConfig } from 'vite';

export default defineConfig({
  base: '/TODOLIST_MODERN_VANILLA_VITE_JS/', // <-- sous-chemin de ton repo GitHub Pages
  build: {
    outDir: 'dist', // dossier de build par défaut
  },
});
