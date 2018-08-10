<template>
  <vue-pell-editor
    v-model="editorContent"
    :actions="editorOptions"
    :content="editorContent"
    :placeholder="editorPlaceholder"
    :style-with-css="true"
    :classes="editorClasses"
    default-paragraph-separator="p"
    @change="doSomething"
    @mounted="doSomethingAfterMounted"
  />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    editorOptions: [
      'bold',
      'underline',
      {
        name: 'italic',
        result: () => window.pell.exec('italic')
      },
      {
        name: 'custom',
        icon: '<b><u><i>C</i></u></b>',
        title: 'Custom Action',
        result: () => console.log('YOLO')
      },
      {
        name: 'image',
        result: () => {
          const url = window.prompt('Enter the image URL')
          if (url) window.pell.exec('insertImage', url)
        }
      },
      {
        name: 'link',
        result: () => {
          const url = window.prompt('Enter the link URL')
          if (url) window.pell.exec('createLink', url)
        }
      }
    ],
    editorPlaceholder: 'Write something amazing...',
    editorContent: '<div>Predefined Content</div>',
    editorClasses: {
      actionbar: 'pell-actionbar',
      button: 'pell-button',
      content: 'pell-content',
      selected: 'pell-button-selected'
    }
  }),
  methods: {
    doSomething() {
      console.log('Hello')
    },
    doSomethingAfterMounted() {
      console.log('Editor mounted')
    }
  }
})
</script>
