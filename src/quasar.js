import Vue from 'vue'

import './styles/quasar.sass'
import lang from 'quasar/lang/he.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {
      extras: [
          'material-icons',
      ]
  },
  plugins: {
  },
  lang: lang
 })
