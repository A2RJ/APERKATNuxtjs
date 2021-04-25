import Vue from 'vue'
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
// import { Doughnut } from "vue-chartjs"

Vue.filter('numFormat', numFormat(numeral));

// export default {
//     extends: Doughnut,
//     props:['chartData','options'],
//     methods: {
//       update() {
//         this.$data._chart.update()
//       }
//     },
//     mounted () {
//       this.renderChart(this.chartData, this.options)
//     }
//   };