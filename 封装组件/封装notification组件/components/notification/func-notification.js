import Notification from './notification.vue'

// 扩展Notification组件
export default {
  extends: Notification,
  computed: { // 默认组件是没有style样式，这里的样式可以去覆盖
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  mounted () {
    this.createTimer()
  },
  beforeDestory () {
    this.clearTimer()
  }
}
