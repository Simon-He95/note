import '../../assets/styles/tabs.styl'
import TabContent from './tab-content.jsx'
export default {
  name: 'Tabs',
  components: {
    TabContent
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  },
  render () {
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <TabContent panes={this.panes} />
      </div>
    )
  }
}
