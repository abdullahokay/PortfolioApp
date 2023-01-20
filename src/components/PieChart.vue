<template ref="pieChart">
  <div>
    <h2 class="mb-5">Portföy Dağılımı</h2>
    <v-card height="430px">
      <Pie :options="options" :data="chartData" :key="updateChart"></Pie>
    </v-card>
  </div>
</template>

<script>
import 'chart.js/auto';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  data() {
    return {
      updateChart: 0,
      colorList: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                weight: 'bold'
              }
            }
          }
        }
      },
      chartData: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: this.colorList
        }]
      }
    }
  },
  mounted() {
    this.updateChartData();
    this.colorList = this.getColors();
  },

  watch: {
    '$store.state.portfolio': {
      handler() {
        this.updateChartData(),
          this.updateChart++
      },
      deep: true,
    },

    chartData: {
      handler() {
        this.updateChart++
      },
      deep: true,
    },
  },

  methods: {
    updateChartData() {
      // console.log('etiket1', typeof this.chartData.labels);
      // console.log('sayı1', typeof this.chartData.datasets[0].data);
      //  console.log('etiket1', this.chartData.labels);
      //  console.log('sayı1', this.chartData.datasets[0].data);
      if (Object.keys(this.symbolCount).length === 0) {
        this.chartData.datasets[0].data = [100];
        this.chartData.labels = ['No data'];
        // console.log('etiket2', typeof this.chartData.labels);
        // console.log('sayı2', typeof this.chartData.datasets[0].data);
        //  console.log('etiket2if', this.chartData.labels);
        //  console.log('sayı2if', this.chartData.datasets[0].data);
      }
      else {
        // console.log('else');
        this.chartData.labels = Object.keys(this.symbolCount);
        this.chartData.datasets[0].data = Object.keys(this.symbolCount).map(key => this.symbolCount[key]);
        // this.chartData.datasets[0].backgroundColor = Object.keys(this.symbolCount).map(() => this.getRandomColor());
        // console.log('else etik1', typeof this.chartData.labels);
        // console.log('else sayı1', typeof this.chartData.datasets[0].data);
        //  console.log('else etik3', this.chartData.labels);
        //  console.log('else sayı3',  this.chartData.datasets[0].data);
      }
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },

    getColors() {
      let colorList = []
      for (let i = 0; i < Object.keys(this.symbolCount).length; i++) {
        colorList.push(this.getRandomColor())
      }
      return colorList
    },

    
  },

  computed: {
    symbolCount() {
      return this.$store.state.portfolio.reduce((acc, curr) => {
        acc[curr.symbol] = acc[curr.symbol] ? acc[curr.symbol] + 1 : 1;
        return acc;
      }, {});
    },
  },
}
</script>

<style>
.theme--light.v-card {
  height: 430px !important;
}
</style>