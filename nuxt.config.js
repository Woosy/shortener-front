export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'shortener-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // custom loading component
  loading: '~/components/Loading.vue',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/global.css',
    '~/assets/css/transitions.css',
    '~/assets/css/toasts.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/directives.ts', ssr: false },
    { src: '~/plugins/vee-validate.ts', ssr: false },
    { src: '~/plugins/global-toasts.ts', ssr: false },
    { src: '~/plugins/base-confirm-modal.ts', ssr: false },
    { src: '~/plugins/base-success-modal.ts', ssr: false },
    { src: '~/plugins/vue-tags-input.ts', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // Doc: https://github.com/teamnovu/nuxt-breaky
    '@teamnovu/nuxt-breaky',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://google-fonts.nuxtjs.org/setup
    '@nuxtjs/google-fonts',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true
  },

  // Auth module configuration (https://auth.nuxtjs.org/schemes/local)
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'user' }
        },
        tokenRequired: false,
        tokenType: false,
        autoFetchUser: true
      }
    }
  },

  // Google-fonts configuration
  googleFonts: {
    families: {
      Roboto: true
    }
  },

  // Fontawesome icons configuration
  fontawesome: {
    icons: {
      solid: ['faBars', 'faTimes', 'faEnvelope', 'faLock', 'faCircleNotch',
        'faPlus', 'faHome', 'faChartLine', 'faCog', 'faSignOutAlt', 'faUser',
        'faUsers', 'faList', 'faBuilding', 'faExclamationCircle', 'faCheckCircle',
        'faInfoCircle', 'faExclamationTriangle', 'faCaretUp', 'faCaretDown', 'faGripLines',
        'faMouse', 'faUserSlash', 'faMoon', 'faCheck', 'faFilter', 'faSearch', 'faTrash',
        'faClipboard', 'faChevronDown', 'faTags'],
      brands: ['faGithub', 'faGoogle']
    }
  },

  // @nuxtjs/color-mode + tailwindcss
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storageKey: 'nuxt-color-mode'
  },

  purgeCSS: {
    whitelist: ['dark-mode']
  },

  // exposeConfig required by breaky
  tailwindcss: {
    exposeConfig: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['@johmun/vue-tags-input'],
    transpile: [
      'vee-validate/dist/rules'
    ]
  },
  env: {
    API_URL: process.env.API_URL
  }
}
