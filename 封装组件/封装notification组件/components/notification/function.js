import Component from './func-notification'
import Vue from 'vue'

const NotificationConstructor = Vue.extend(Component) // 从func-notification导入的Component相当于一个.vue文件在这个.vue文件上去extend

const instances = [] // instances用来保存已创建的notification
let seed = 1

const removeInstance = (instance) => {
  if (!instance) {
    return
  }
  const len = instances.length
  // 找到需要移除的instance在数组的哪个位置
  const index = instances.findIndex(inst => inst.id === instance.id)
  // 找到id删除
  instances.splice(index, 1)

  // 删除notification时候，上边的会下落补充删除的位置
  if (len <= 1) return // 如果数组只剩最后一个，notification只有一个了就直接返回
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) { // 从被删除的元素开始，循环他上面的所有notification - 1
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16 // 上面的每一个notification的高度等于 原本的高度 - 移除的高度 - 16px
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return // 判断是否是服务端，服务端不能进行dom操作，所以直接return

  const {
    autoClose,
    ...rest // 剩下的所有键值对
  } = options

  const instance = new NotificationConstructor({ // 每次都重新创建一个instance，options就是传入的值给到propsData传入到组件 {content: 'test $notify', btn: 'close'}
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}` // 设置一个不会重样的id
  instance.id = id
  instance.vm = instance.$mount() // 生成一个$el对象，但还为插入到dom中
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => { // 每生成一个notification上一个notification会往上移动中间有16px距离
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16 // 默认需要比屏幕的边框高16px
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  // 接收fade动画结束传来的closed事件，移除notification，以免占用内存
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    // 移除完通过removechild删除dom的el节点
    document.body.removeChild(instance.vm.$el)
    // 移除完还要调用destory方法删除vm对象
    instance.vm.$destroy()
  })

  // 监听点击关闭按钮是触发的事件close,隐藏时又触发动画结束的closed事件，就会移除notification
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })

  return instance.vm
}

export default notify
