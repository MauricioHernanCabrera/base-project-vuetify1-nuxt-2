let API_URL = '';
let FRONT_URL = '';

if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.<name-domain>.com';
  FRONT_URL = 'https://<name-domain>.com';
} else {
  API_URL = 'http://127.0.0.1:8000';
  FRONT_URL = 'http://localhost:3000';
}

const page = {
  title: '<name>',
  short_name: '<name>',
  description: '',
  safe_img: `${FRONT_URL}/images/safe_image.png`,
  safe_img_alt: 'Image of <name>',
  favicon: `${FRONT_URL}/images/icon.ico`
};

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: {
    API_URL
  },

  head: {
    title: page.title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,  user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: `${page.description}`
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `${page.title}` },
      { name: 'twitter:description', content: `${page.description}` },
      { name: 'twitter:image', content: `${page.safe_img}` },
      { name: 'twitter:image:alt', content: `${page.safe_img_alt}` },

      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${page.title}` },
      { property: 'og:image', content: `${page.safe_img}` },
      { property: 'og:site_name', content: `${page.title}` },
      { property: 'og:description', content: `${page.description}` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: page.favicon },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ffffff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl', '~/assets/styles.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-components',
    '~/plugins/vuelidate',
    '~/plugins/auth',
    '~/plugins/vuetify'
    // { src: '~/plugins/ga', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: API_URL
  },

  workbox: {},

  manifest: {
    name: page.title,
    short_name: page.short_name,
    lang: 'en-US',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#64B5F6'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],

    babel: {
      plugins: [
        [
          'transform-imports',
          {
            vuetify: {
              transform: 'vuetify/es5/components/${member}',
              preventFullImport: true
            }
          }
        ]
      ]
    }
  }
};
