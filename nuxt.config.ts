// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  compatibility: {
    date: "2024-08-15",
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
    },
  },
  imports: {
    dirs: ["components", "repositories"],
  },
  plugins: ["~/plugins/repositories.ts", "~/plugins/i18n.js"],
};
