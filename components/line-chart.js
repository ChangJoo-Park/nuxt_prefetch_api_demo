import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Line,
  props: ['data', 'options'],
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
