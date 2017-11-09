<template>
  <div>
    Foobar
  </div>
</template>

<script>
  import WYSIWYG from './editor.vue' // eslint-disable-line

  export default {
    data: () => ({
      actions: [
        'bold',
        {
          name: 'custom',
          icon: 'C',
          title: 'Custom Action',
          result: () => console.log('YOLO') // eslint-disable-line
        },
        {
          name: 'italic',
          result: () => window.pell.exec('italic')
        },
        'underline'
      ]
    }),
    components: {
      WYSIWYG
    }
  }
</script>

<style>

</style>
