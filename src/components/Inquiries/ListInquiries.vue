<template>
  <div class="home">
   <div class="container">
       <div class="row">
           <div class="col text-left">
               <h2>Lista de consultas</h2>
                  <div v-for="item in inquiries" :key="item">
                    <h3><span class="badge badge-success">* {{item.id}} - {{item.id}}</span></h3>
                    <button class="btn btn-primary">hola</button>
                    <div v-html="item.id"></div>
                </div>
           </div>
       </div>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
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
              console.log(this.inquiries)
          })
          .catch((error) => {
              console.log(error)
          })
      },

      searchWord(){
        if(this.word.trim() == ""){
            this.$swal('Error','Digíta una palabra!!!');
            this.objects = []
        }else{
            const url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch="
            axios.get(url+this.word).then(resp => {
            console.log(resp.data.query.search);
            this.objects = resp.data.query.search;
            this.word = ""
        });
        }
      }
  },
  created(){
      this.getInquiries()
  }
}
</script>