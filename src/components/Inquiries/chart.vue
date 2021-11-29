<template>

<div class="row justify-content-center">
    <div class="col-8">
        <h3>Grafica de consultas</h3>
       <div style="height:400px;width: 400px;display: flex;flex-direction:column;">
        <vue3-chart-js
            :id="doughnutChart.id"
            ref="chartRef"
            :type="doughnutChart.type"
            :data="doughnutChart.data"
        ></vue3-chart-js>
      </div>
    </div>

  </div>


</template>

<script>
var fields = []
var number_searches = []
import { ref } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Vue3ChartJs,
  },
    mounted () {
      var inquiries = []
      const path = 'http://127.0.0.1:8000/api/inquiries/'
          axios.get(path).then((response) => {
            inquiries = response.data
            fields = []
            number_searches = []
            for(var i=0; i<inquiries.length; i++){
              fields.push(inquiries[i].word)
              number_searches.push(inquiries[i].number_searches)
            }
          })
          .catch((error) => {
              console.log(error)
          })

  }, 
  setup () {
    const chartRef = ref(null)  

    const doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        labels:fields,
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: number_searches
          }
        ]
      }
    }

    const updateChart = () => {
      doughnutChart.data.labels = ['Cats', 'Dogs', 'Hamsters', 'Dragons']
      doughnutChart.data.datasets = [
        {
          backgroundColor: [
            '#333333',
            '#E46651',
            '#00D8FF',
            '#DD1B16'
          ],
          data: [100, 20, 800, 20]
        }
      ]

      // chartRef.value.update()
    }

    return {
      doughnutChart,
      updateChart,
      chartRef,
    }
  },
}
</script>