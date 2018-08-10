import VuePellEditor from './components/VuePellEditor.vue'

VuePellEditor.install = (Vue: any, options?: Object) => {
  Vue.component('VuePellEditor', VuePellEditor)
}

const install = (Vue: any) => {
  VuePellEditor.install(Vue)
}

export default install
