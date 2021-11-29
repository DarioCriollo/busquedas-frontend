<template>
  <div class="home">
    <br>

  <div class="row justify-content-center">
    <div class="col-4">
      <img width="300" v-bind:src="require('../../assets/lupa.png')"   alt="">
    </div>
    <div class="col-4">
      <br><br><br>
      <h3 style="font-color:success">Tu Buscador Latino</h3>
      <br><br>
      <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Digíte una palabra" v-model="word">
      <div class="input-group-append">
        <button class="btn btn-outline-success" v-on:click="searchEngine" >Buscar</button>
      </div>
    </div>

    </div>
  </div>
  <br>
   <div class="row justify-content-md-center">
    <div class="col-md-auto">
      
      <div v-for="item in objects" :key="item">
        <h3>{{item.title}} <span class="badge badge-success"></span></h3>
        <h4>{{item.pageid}} <span class="badge badge-success"></span></h4>
        <br>
        <div class="alert alert-success" v-html="item.snippet"></div>
      </div>
      <br>
      <hr>
    </div>

  </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'


export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    
    return{
      objects : [],
      word : "",
      objeto : [],
      words : {},
      listaWords: []
  
    }

  },

  methods:{
    searchEngine: function(){

      if(this.word.trim() == ""){
        alert('Error Digíta una palabra')
        this.objects = []
      }else{
          const url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch="
          axios.get(url+this.word).then(resp => {
          this.objects = resp.data.query.search;
          var size = resp.data.query.searchinfo.totalhits
          this.saveWord(this.word, size);
          this.word = ""
      });
      }

    },

    saveWord: function(word,size){
        var words = []
        this.words={
            'word' : word.toLowerCase(),
            'number_searches': 1,
            'number_results': size
        }

        var listaTemporal = []
        let data = localStorage.getItem('wordsf');
        if(data != 'value'){
          listaTemporal = JSON.parse(data)

          var resultado = listaTemporal.find( words => words.word === this.word );
          if(resultado){
            const pb = JSON.parse(localStorage.getItem('wordsf'));
            const itemAModificar = pb.find(item=>item.word === this.word.toLowerCase())
            itemAModificar.number_searches +=1 
            if(itemAModificar.number_searches == 5){
             
              const path = 'http://127.0.0.1:8000/api/inquiries/'
              axios.post(path, itemAModificar).then((response) =>{
                  alert(response.data)
              })
              .catch((error) =>{
                  alert(error)
              })
               itemAModificar.number_searches = 0 

            }
            localStorage.setItem('wordsf', JSON.stringify(pb))
            let data = localStorage.getItem('wordsf');
          }else{
            this.listaWords.push(this.words);
            localStorage.setItem('wordsf', JSON.stringify(this.listaWords))
          }
  
        }else{
           this.listaWords.push(this.words);
            localStorage.setItem('wordsf', JSON.stringify(this.listaWords))
        }
       
    },

    created: function() {
        let data = localStorage.getItem('wordsf');
        if (data != null) {
          this.listaWords = JSON.parse(data)
        }else{
        }
    }
  }

}
</script>