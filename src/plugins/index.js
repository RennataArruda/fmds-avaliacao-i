/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import firebaseAppInit from "@/plugins/firebase";

export function registerPlugins (app) {
  app
    .use(firebaseAppInit)
    .use(vuetify)
    .use(pinia)
    .use(router)
}
