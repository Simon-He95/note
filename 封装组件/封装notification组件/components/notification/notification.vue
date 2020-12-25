<template>
  <transition
    name="fade"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      v-show="visible"
      class="notification"
      :style="style"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{ content }}</span>
      <a
        href=""
        class="btn"
        @click="handleClose"
      >{{ btn }}</a>
    </div>
  </transition>
</template>
<script>
import '../../assets/styles/global.styl'
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () { // 申明一下，在继承的组件中为了拿到动画后的高度
    },
    createTimer () { // 在鼠标移动到notification时调用，为了不然通知消失，在这里申明为了让extend的组件能获取到
    },
    clearTimer () { // 在鼠标离开notification时调用，3s后让通知消失，在这里申明为了让extend的组件能获取到
    }
  }
}
</script>

<style lang="stylus" scoped>
.notification
  display flex
  background-color #303030
  color rgba(255,255,255,1)
  align-items center
  padding 20px
  position fixed
  min-width 280px
  box-shadow 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.5)
  flex-wrap wrap
  transition all .3s
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer

</style>
