新建一个notification.vue组件，然后在其基础上扩展组件，最后通过插件的方式导入到index.js，通过Vue.use来全局使用

func-notification是import notification.vue
然后extend组件

function.js是import func-notification
把扩展之后的组件在扩展他的方法
抛出一个notify
挂载到Vue的prototype去调用

在src文件下的index：
需要通过引入这个notification的index.js，通过use来全局使用
	import Notification from './components/notification'
	// 引入全局通知模板
	Vue.use(Notification)

组件中通过：可以绑定在按钮上或者其他
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })


