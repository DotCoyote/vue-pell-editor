# vue-pell-editor

> Vue wrapper for [pell WYSIWYG text editor](https://github.com/jaredreich/pell)

## Installation

**Install via NPM or Yarn:**

```shell
$ npm install --save vue-pell-editor
# OR
$ yarn add vue-pell-editor
```

## Usage

main.js:

```javascript
import Vue from 'vue'
import VuePellEditor from 'vue-pell-editor'

Vue.use(VuePellEditor)
```

example.vue:

```vue
<template>
    <vue-pell-editor 
        v-model="editorContent"
        :actions="editorOptions" 
        :content="editorContent" 
        :placeholder="editorPlaceholder"
        :style-with-css="false"
        :classes="editorClasses"
        default-paragraph-separator="p"
        @change="doSomething"
        @mounted="doSomethingAfterMounted"
    />
</template>

<script>
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

For the pell-editor-options have a look at the [pell repository](https://github.com/jaredreich/pell#api).

## License

vue-pell-editor is open source and released under the [MIT License](LICENSE).

Copyright (c) 2018 [Lars Eichler](https://twitter.com/cinkon).

> _PS: You're a happy user of vue-pell-editor? Let me know via Twitter: [@cinkon](https://twitter.com/cinkon)_.
