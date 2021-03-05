import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  props: ['data', 'options'],
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
