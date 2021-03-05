import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    options: Object
  },  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
