<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  data() {
    return {
      chartData: {
        type: 'pie',
        datasets: [
          {
            label: '読んだ本の種類',
            labels: ['A型', 'O型', 'B型', 'AB型'],
            backgroundColor: ['#BB5179', '#FAFF67', '#58A27C', '#3C00FF'],
            data: [38, 31, 21, 10],
          },
        ],
      },
      options: {
        responsive: true,
      },
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>
