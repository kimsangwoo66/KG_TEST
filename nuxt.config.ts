// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  plugins: [
    { src: '~/plugins/cytoscape.client.js', mode: 'client' }  // 클라이언트 모드로 등록
  ],
})
