/**
 * Vue-Pell-Editor
 * @author Pell
 */
import Vue from 'vue'
import WYSIWYG from './editor'

new Vue({ // eslint-disable-line
  el: '#app',
  render: (h) => h(WYSIWYG)
})
