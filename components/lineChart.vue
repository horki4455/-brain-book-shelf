<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        // labels: ['2021年4月', '2021年5月', '2021年6月'],
        datasets: [
          {
            label: '読んだ本の数',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [
              {
                x: '1995-12-17T00:00:00',
                y: 1,
              },
              {
                x: '1995-12-18T00:00:00',
                y: 10,
              },
              {
                x: '1995-12-20T00:00:00',
                y: 20,
              },
              {
                x: '1995-12-21T12:00:00',
                y: 30,
              },
              {
                x: '1996-01-01T00:00:00',
                y: 40,
              },
            ],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>
