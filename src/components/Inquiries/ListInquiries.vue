<template>
  <div class="home">
    <br><br>
    <div class="row justify-content-center">
        <div class="col-5">
            <Chart></Chart>
        </div>
        <div class="col-3">
            
        <div class="container">
            <div class="row">
                <div class="col text-left">
                    <h3>Lista de consultas</h3>
                    <div style="width: 400px; height: 400px; overflow-y: scroll;">
                         <table class="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Palabra</th>
                                <th scope="col">Número Busquedas</th>
                                <th scope="col">Número Resultados</th>
                                </tr>
                            </thead>
                            <tbody v-for="item in inquiries" :key="item">
                                <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.word}}</td>
                                <td>{{item.number_searches}}</td>
                                <td>{{item.number_results}}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                   
                </div>
            </div>
        </div>
        </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'
import Chart from '@/components/Inquiries/chart.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Chart
  },

  extends: Bar,
  mounted () {
    this.getInquiries()
  },    

  data(){
      return {
          inquiries: []
      }
  },

  methods:{
      getInquiries(){
          const path = 'http://127.0.0.1:8000/api/inquiries/'
          axios.get('http://127.0.0.1:8000/api/inquiries/').then((response) => {
              this.inquiries = response.data
          })
          .catch((error) => {
              console.log(error)
          })
      },
  },
  created(){
      this.getInquiries()
  }
}
</script>