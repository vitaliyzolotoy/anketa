import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App.vue'
import Contacts from './components/Contacts.vue'
import Locations from './components/Locations.vue'
import Social from './components/Social.vue'
import Cats from './components/Cats.vue'
import Info from './components/Info.vue'

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/contacts': {
    component: Contacts
  },
  '/locations': {
    component: Locations
  },
  '/social': {
    component: Social
  },
  '/cats': {
    component: Cats
  },
  '/info': {
    component: Info
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/contacts'
})

router.start(App, '#app')
