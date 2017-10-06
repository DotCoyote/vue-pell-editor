/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

var pellEditor = require('./src/js/editor.vue')
pellEditor = pellEditor.default || pellEditor

var VuePellEditor = {
  pellEditor: pellEditor,
  install (Vue) {
    Vue.component(pellEditor.name, pellEditor)
  }
}

module.exports = VuePellEditor
