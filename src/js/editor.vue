<template lang="html">
  <div ref="editor" class="vp-editor">
    <div class="vp-editor__placeholder" v-if="(vpContent === '' || vpContent === '<br>') && placeholder" @click="$refs.editor.content.focus()">{{ placeholder }}</div>
  </div>
</template>

<script>
  import pell from 'pell'

  export default {
    name: 'VuePellEditor',
    data: () => ({
      vpContent: ''
    }),
    beforeDestroy () {
      this.pell = null
    },
    components: {
      pell
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.$el) {
          this.pell = pell.init({
            element: this.$refs.editor,

            onChange: (html) => {
              this.vpContent = html
              this.$emit('input', html)
              this.$emit('change', {
                editor: this.pell,
                html: html
              })
            },

            styleWithCSS: this.styleWithCss
          })

          if (this.content) {
            this.$refs.editor.content.innerHTML = this.content
          }

          if (this.editorHeight) {
            this.$refs.editor.content.style.height = this.editorHeight
          }
        }
      }
    },
    props: {
      actions: {
        type: Array
      },
      content: {
        type: String
      },
      placeholder: {
        type: String,
        default: 'Write something amazing...'
      },
      editorHeight: {
        default: false
      },
      styleWithCss: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss">
  @import '~pell/src/pell';

  .vp-editor {
    position: relative;

    &__placeholder {
      position: absolute;
      top: 42px;
      left: 10px;
      color: #ddd;
      font-style: italic;
    }
  }
</style>
