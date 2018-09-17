<template>
  <div>
    <script id="editor" type="text/plain"/>
  </div>
</template>
<script>
export default {
  name: 'UE',
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    const _this = this
    this.editor = UE.getEditor('editor', this.config) // 初始化UE
    this.editor.addListener('ready', function() {
      _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
    })
  },
  destroyed() {
    this.editor.destroy()
  },
  methods: {
    getUEContent() { // 获取内容方法
      return this.editor.getContent()
    }
  }
}
</script>

作者：陈楠酒肆
链接：https://www.jianshu.com/p/4e00f11583fa
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
