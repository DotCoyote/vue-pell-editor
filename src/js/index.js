/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */
import Vue from 'vue'
import WYSIWYG from './editor'

new Vue({ // eslint-disable-line
  el: '#app',
  render: (h) => h(WYSIWYG)
})
