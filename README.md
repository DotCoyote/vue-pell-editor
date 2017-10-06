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
        :styleWithCss="false"
        editorHeight="400px"
    />
</template>

<script>
    import VuePellEditor from 'vue-pell-editor'
    
    export default {
        data: () => ({
            editorContent: '',
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
            editorContent: '<div>Predefined Content</div>'
        }),
        components: {
            VuePellEditor
        }
    }
</script>

<style>
    @import '~vue-pell-editor/dist/vue-pell-editor.css';
</style>
```
