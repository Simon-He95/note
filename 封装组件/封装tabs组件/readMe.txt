封装一个tabs组件tabs包含切换功能，tab包含内部的li，可以通过传递给tabs传递index代表选中第几个，tab传递label对应tab的名字
也可以扩展在tabs中加入span插入tab的content内容


      <tabs
        :value="filter"
        @change="handleChangeTab"
      >
        <tab
          v-for="tab in states"
          :key="tab"
          :label="tab"
          :index="tab"
        />
	<--组件的扩展-->
	<span>tab-content<span> // 但是这个值如果是动态的话会有问题，我改动第二次才会显示第一次的改变，和vue的渲染原理有关，需要去查一下
      </tabs>