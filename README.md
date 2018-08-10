# vue-pell-editor

> Vue wrapper for [pell WYSIWYG text editor](https://github.com/jaredreich/pell)

## Installation

**Install via NPM or Yarn:**

```shell
$ npm install --save vue-pell-editor
# OR
$ yarn add vue-pell-editor
```

**HTML**:

```vue
<template>
    <VuePellEditor 
        :actions="editorOptions" 
        :content="editorContent" 
        :placeholder="editorPlaceholder"
        v-model="editorContent"
        :style-with-css="false"
        :classes="editorClasses"
        default-paragraph-separator="p"
        @change="doSomething"
        @mounted="doSomethingAfterMounted"
    />
</template>

<script>
import VuePellEditor from 'vue-pell-editor'

export default {
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
          if (url) window.pell.exec('insertImage', ensureHTTP(url))
        }
      },
      {
        name: 'link',
        result: () => {
          const url = window.prompt('Enter the link URL')
          if (url) window.pell.exec('createLink', ensureHTTP(url))
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
  components: {
    VuePellEditor
  },
  methods: {
    doSomething() {
      console.log('Hello')
    },
    doSomethingAfterMounted() {
      console.log('Editor mounted')
    }
  }
}
</script>
```

For the pell-editor-options have a look at the [pell repository](https://github.com/jaredreich/pell#api)
