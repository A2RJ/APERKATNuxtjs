const isDev = false;
const url = isDev ? "http://127.0.0.1:8000" : "https://aperkat.uts.ac.id";

export default {
  ssr: true,
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "APERKAT - Universitas Teknologi Sumbawa",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "/vendor/jquery/jquery.min.js" },
      { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js" },
      { src: "/vendor/jquery-easing/jquery.easing.min.js" },
      // { src: "/js/sb-admin-2.min.js" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/vendor/fontawesome-free/css/all.min.css",
    "@/assets/css/sb-admin-2.min.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios.js",
    "@/plugins/numeral.js",
    "@/plugins/vuelidate.js",
    // {src: '~/plugins/vue-list-picker.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/components"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "bootstrap-vue/nuxt",
    "vue-sweetalert2/nuxt",
  ],
  axios: {
    withCredentials: true,
    baseURL: url,
    browserBaseURL: url,
  },
  auth: {
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: url,
        endpoints: {
          login: { url: "/api/login", method: "post" },
          logout: false,
          refresh: { url: "/api/refresh", method: "post" },
          user: { url: "/api/me", method: "get" },
        },
        user: {
          property: false,
          autoFetch: true,
        },
        token: {
          property: "access_token",
          maxAge: 3600,
        },
        refreshToken: {
          maxAge: 3600,
        },
      },
    },
  },

  router: {
    middleware: ["auth"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    // port: 3000 // default: 3000
  },
};
