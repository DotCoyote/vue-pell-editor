<template lang="html">
  <div
    ref="editor"
    class="vp-editor"
  >
    <div
      class="vp-editor__placeholder"
      v-if="(vpContent === '' || vpContent === '<br>') && placeholder"
      @click="$refs.editor.content.focus()"
    >
      {{ placeholder }}
    </div>
  </div>
</template>

<script>
import pell from 'pell'

export default {
  name: 'VuePellEditor',
  components: {
    pell
  },
  props: {
    actions: {
      type: Array,
      default: () => []
    },
    content: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Write something amazing...'
    },
    editorHeight: {
      type: String,
      default: ''
    },
    styleWithCss: {
      type: Boolean,
      default: false
    },
    classes: {
      type: Object,
      default: () => {}
    },
	defaultParagraphSeparator : {
		type : String,
		default : 'div'
	}
  },
  data: () => ({
    vpContent: ''
  }),
  watch: {
    content: function (newVal, oldVal) { // eslint-disable-line
      if (this.pell) {
        if (!!newVal && newVal !== this.vpContent) {
          this.vpContent = newVal
          this.$refs.editor.content.innerHTML = newVal
        } else if (!newVal) {
          this.$refs.editor.content.innerHTML = ''
        }
      }
    },
    value: function (newVal, oldVal) { // eslint-disable-line
      if (this.pell) {
        if (!!newVal && newVal !== this.vpContent) {
          this.vpContent = newVal
          this.$refs.editor.content.innerHTML = newVal
        } else if (!newVal) {
          this.$refs.editor.content.innerHTML = ''
        }
      }
    }
  },
  beforeDestroy () {
    this.pell = null
  },
  mounted () {
    this.init()
    this.$emit('mounted')
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
          classes: this.classes,

          styleWithCSS: this.styleWithCss,

		  defaultParagraphSeparator: this.defaultParagraphSeparator
        }

        if (this.actions && this.actions.length > 0) {
          options.actions = this.actions
        }

        const pellEditor = pell.init(options)

        this.pell = pellEditor
        window.pell = pell

        if (this.content || this.value) {
          this.$refs.editor.content.innerHTML = (this.content || this.value)
          this.vpContent = (this.content || this.value)
        }

        if (this.editorHeight !== '') {
          this.$refs.editor.content.style.height = this.editorHeight
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
