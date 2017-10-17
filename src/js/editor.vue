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
          const options = {
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
          }

          if (this.actions.length > 0) {
            options.actions = this.actions
          }

          this.pell = pell.init(options)

          if (this.content || this.value) {
            this.$refs.editor.content.innerHTML = (this.content || this.value)
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
      value: {
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
    },
    watch: {
      content: function (newVal, oldVal) {
        if (this.pell) {
          if (!!newVal && newVal !== this.vpContent) {
            this.vpContent = newVal
            this.$refs.editor.content.innerHTML = newVal
          } else if (!newVal) {
            this.$refs.editor.content.innerHTML = ''
          }
        }
      },
      value: function (newVal, oldVal) {
        if (this.pell) {
          if (!!newVal && newVal !== this.vpContent) {
            this.vpContent = newVal
            this.$refs.editor.content.innerHTML = newVal
          } else if (!newVal) {
            this.$refs.editor.content.innerHTML = ''
          }
        }
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
