import Vue from 'vue'
import Icon from '@/components/icon/icon-component'

Vue.use({
  install(app) {
    app.component('Icon', Icon)
  },
})
