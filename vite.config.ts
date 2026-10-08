import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    nitro({
      preset: "vercel",
    }),
    VitePWA({
      strategies: "generateSW",
      registerType: "autoUpdate",
      injectRegister: null,
      manifest: {
        name: "حصن المسلم - حصنك",
        short_name: "حصنك",
        description: "تطبيق حصن المسلم والأذكار",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      devOptions: { enabled: false },
      filename: "sw.js",
      workbox: {
        navigateFallback: "/",
        navigateFallbackDenylist: [/^\/~oauth/],
        additionalManifestEntries: [{ url: "/", revision: null }],
        globPatterns: ["**/*.{js,css,png,svg,ico,woff2,webmanifest,json}"],
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
            handler: "StaleWhileRevalidate",
            options: { 
              cacheName: "pages-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              }
            },
          },
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && (url.pathname.startsWith("/assets/") || url.pathname?.startsWith("/assets/")),
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