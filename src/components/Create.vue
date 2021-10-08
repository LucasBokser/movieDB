<template>
  <div>

    <div class="form-pic">
      <b-button variant="link" size="lg" class="mb-2 mr-sm-2 mb-sm-0">
        <router-link to="/">Go Back</router-link>
      </b-button>

      <!--      <h1 class="text-center"> Nombre de films {{ movies.length }}</h1>-->

      <br>
      <br>
<!--      <fieldset >-->
<!--        <legend>Formulaire d'ajout d'un film</legend>-->
<!--        <v-toolbar-title>Nom du Film :</v-toolbar-title>-->

<!--        <input-->
<!--            id="title"-->
<!--            v-model="movie.title"-->
<!--            type="text"-->
<!--            title="title"-->
<!--            @keyup="getResult">-->
<!--        <br>-->
<!--        <br>-->
<!--&lt;!&ndash;        <v-autocomplete&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="movie"&ndash;&gt;-->
<!--&lt;!&ndash;            :items="APIMovies"&ndash;&gt;-->
<!--&lt;!&ndash;            item-text="title"&ndash;&gt;-->
<!--&lt;!&ndash;            return-object&ndash;&gt;-->
<!--&lt;!&ndash;            background-color="white"&ndash;&gt;-->
<!--&lt;!&ndash;            filled&ndash;&gt;-->
<!--&lt;!&ndash;            chips&ndash;&gt;-->
<!--&lt;!&ndash;            color="blue-grey lighten-2"&ndash;&gt;-->
<!--&lt;!&ndash;            label="Mon film"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="Voici mon film choisit"&ndash;&gt;-->
<!--&lt;!&ndash;        ></v-autocomplete>&ndash;&gt;-->
<!--        <v-toolbar-title>Genre du film :</v-toolbar-title>-->
<!--        <select-->
<!--            id="genre_ids"-->
<!--            v-model="movie.genre_ids"-->
<!--            name="genre_ids"-->
<!--            border-radius="10"-->

<!--        >-->
<!--          <option v-for="genres in APIGenres"-->
<!--                  :key="genres.id"-->
<!--                  :value="genres.id"></option>-->
<!--          <option value="action">Action</option>-->
<!--          <option value="romance"> Romance</option>-->
<!--          <option value="horreur">Horreur</option>-->
<!--        </select>-->
<!--        <br>-->
<!--        <br>-->
<!--        <v-toolbar-title>Overview :</v-toolbar-title>-->
<!--        <textarea-->
<!--            id="overview"-->
<!--            v-model="movie.overview"-->
<!--            type="text"-->
<!--            name="overview"-->
<!--        ></textarea><br><br>-->

<!--        <v-toolbar-title>Rating :</v-toolbar-title>-->
<!--        <v-rating-->
<!--            hover-->
<!--            length="10"-->
<!--            size="64"-->
<!--            v-model="movie.vote_average"-->

<!--        ></v-rating>-->
<!--        <br>-->
<!--        <div class="submit">-->

<!--&lt;!&ndash;          <button id="button2">&ndash;&gt;-->
<!--&lt;!&ndash;            <router-link to="/">Add New movie</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;          </button>&ndash;&gt;-->
<!--          <router-link to="/"><button class="button2">Add New movie</button></router-link>-->

<!--        </div>-->
<!--      </fieldset>-->
      <fieldset>
        <legend>Formulaire d'ajout d'un film</legend>
        <label for="title">Titre</label>
        <input id="title" type="text" ><br>
        <label for="genre_ids">Genre</label>
        <select id="genre_ids">
          <option value="action">Action</option>
          <option value="romance"> Romance</option>
          <option value="horreur">Horreur</option>
        </select><br>
        <label for="comments">Description</label>
        <textarea id="comments"></textarea>
        <br>
        <v-toolbar-title>Rating :</v-toolbar-title>
        <b-form-rating
            variant="warning"
            hover
            length="10"
            size="64"
            v-model="movie.vote_average"
            class="mb-2"
            stars="10"
        ></b-form-rating>
        <div class="submit">

          <!--          <button id="button2">-->
          <!--            <router-link to="/">Add New movie</router-link>-->
          <!--          </button>-->
          <router-link to="/"><button class="button2">Add New movie</button></router-link>

        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {EventBus} from '../main'

export default {
  name: 'Ajout',
  props: {
    submit: {
      type: Function,
    },
    movies: {
      type: Array,
    }
  },
  data: function () {
    return {
      title: "Bienvenue sur VueFlix !",
      movie:
          {
            id: 0,
            title: "",
            genre_ids: [],
            vote_average: 0,
            overview: "",
          },
      errors: [],
      error: null,
      APIMovies: [],
      APIGenres: [],
      search: null,
      select: null,
      loading: false,
    }
  },
  methods: {
    emitGlobalClickEvent() {
      console.log("coucou");
      EventBus.$emit('test', this.movie)
    },
    getResult() {
      if (this.movie.title !== "") {
        this.loading = true
        this.APIMovies = []
        axios
            .get('https://api.themoviedb.org/3/search/movie?api_key=80d0dd074cbffeb2db4b0123882c7f44&query=' + this.movie.title)
            .then(response => {
              this.APIMovies = response.data.results;
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              this.loading = false
            })
      }
    },
    getAPIGenres() {
      this.loading = true
      this.APIGenres = []
      axios
          .get('https://api.themoviedb.org/3/genre/movie/list?api_key=80d0dd074cbffeb2db4b0123882c7f44')
          .then(response => {
            this.APIGenres = response.data.genre_ids;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
    },
  },
  mounted() {
    this.getAPIGenres()
  },
  watch: {
    errors: function () {
      console.log("Pb dans le formulaire !!")
    }
  }

  // methods: {
  //   submit: function (event) {
  //     this.movie.id = this.movies.length + 1
  //     this.movies.push(
  //         {
  //           id: this.movie.id,
  //           title: this.movie.title,
  //           genre_ids: this.movie.genre_ids,
  //           description: this.movie.description,
  //           overview: this.movie.overview,
  //           vote_average: this.movie.vote_average
  //         });
  //     alert('Votre film ' + this.movie.title + ' a été ajouté !')
  //     if (event) {
  //       alert(event.target.tagName)
  //     }
  //     this.movie.id=""
  //         this.movie.title=""
  //         this.movie.genre_ids=""
  //         this.movie.description=""
  //         this.movie.overview=""
  //         this.movie.vote_average=""
  //   }
  // }
}
</script>


<style lang="scss">

p {
  margin-top: 0px;
}

fieldset {
  margin-bottom: 15px;
  padding: 10px;
}

legend {
  padding: 0px 3px;
  font-weight: bold;
  font-variant: small-caps;
}

label {
  width: 110px;
  display: inline-block;
  vertical-align: top;
  margin: 6px;
}

em {
  font-weight: bold;
  font-style: normal;
  color: #f00;
}

input:focus {
  background: #eaeaea;
}

input, textarea {
  width: 249px;
}

textarea {
  height: 100px;
}

select {
  width: 254px;
}

input[type=checkbox] {
  width: 10px;
}

input[type=submit] {
  width: 150px;
  padding: 10px;
}
$primary-color: #808000;
$darkenColor: darken($primary-color, 10%);


.mx-5 {

}

.form-pic {


  margin-top: -7px;
  margin-bottom: -17px;
}

//.body {
//  background-color: black;
//
//}

.img {

  display: block;
  margin-left: auto;
  margin-right: auto
}

//#button {
//  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
//  background-color: #808000; /* Green */
//  border: none;
//  color: white;
//  padding: 15px 32px;
//  text-align: center;
//  text-decoration: none;
//  display: inline-block;
//  font-size: 16px;
//  margin: 4px 2px;
//  cursor: pointer;
//  -webkit-transition-duration: 0.4s; /* Safari */
//  transition-duration: 0.4s;
//  border-radius: 10px;
//}
//
//#button:hover {
//  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(238, 238, 0, 0.40);
//  background-color: #808000; /* Green */
//  border: none;
//  color: white;
//  padding: 15px 32px;
//  text-align: center;
//  text-decoration: none;
//  display: inline-block;
//  font-size: 16px;
//  margin: 4px 2px;
//  cursor: pointer;
//  -webkit-transition-duration: 0.4s; /* Safari */
//  transition-duration: 0.4s;
//  border-radius: 10px;
//}

.submit {
  text-align: center;
}
//
//fieldset {
//  background-color: black;
//  text-align: center;
//  margin-bottom: 15px;
//  padding: 10px;
//  color: white;
//}

label {
  width: 110px;
  display: inline-block;
  vertical-align: top;
  margin: 6px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}

#genre_ids {
  background-color: white;
}


#overview {
  background-color: white;
}

#vote_average {
  background-color: white;
}

#title {
  background-color: white;
}

.button2 {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
  background-color: $primary-color; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  border-radius: 10px;
}

.button2:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(238, 238, 0, 0.40);
  background-color: $darkenColor; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  border-radius: 10px;
}
</style>