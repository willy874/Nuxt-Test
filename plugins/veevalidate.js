/**
 * 表單驗證套件
 * https://logaretm.github.io/vee-validate/
 */

import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure,
  localize,
} from 'vee-validate'
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as rules from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'

// Register it globally
// main.js or any entry file.
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// Import all basic rule
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

// Set status class
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
})

localize('zhTW', zhTW)
