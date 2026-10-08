import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <--- أضف هذا الاستيراد
import { nitro } from "nitro/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    tailwindcss(), // <--- أضف هذه الإضافة هنا لمعالجة ملفات Tailwind v4 بشكل صحيح
    nitro({
      preset: "vercel",
    }),
    VitePWA({
      // إعدادات الـ PWA الخاصة بك كما هي...
      strategies: "generateSW",
      registerType: "autoUpdate",
      injectRegister: null,
      manifest: false,
      devOptions: { enabled: false },
      filename: "sw.js",
      workbox: {
        navigateFallback: "/",
        additionalManifestEntries: [{ url: "/", revision: null }],
        globPatterns: ["**/*.{js,css,png,svg,ico,woff2,webmanifest,json}"],
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
            handler: "NetworkFirst",
            options: { cacheName: "pages", networkTimeoutSeconds: 4 },
          },
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && url.pathname.pathname?.startsWith("/assets/") || url.pathname.startsWith("/assets/"),
            handler: "CacheFirst",
            options: { cacheName: "assets", expiration: { maxEntries: 200 } },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === "https://fonts.googleapis.com" ||
              url.origin === "https://fonts.gstatic.com",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "fonts" },
          }
        ]
      }
    })
  ]
});