<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>
        <router-link to="/"><img src="../assets/tenacious-d-5d1a2ef1b54eb.png" /></router-link>
      </b-navbar-brand>
      <b-nav pills>
        <b-nav-item>
          <router-link to="/"><button class="button2">Home</button></router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/Create">
            <button class="button2">Add Movie</button>
          </router-link>
        </b-nav-item>
      </b-nav>
    </b-navbar>
  </div>
</template>


<script>
export default {
  name: "Navigation"
}
</script>


<style scoped>
img {
  margin-top:9px;
  margin-bottom:9px;
  width:auto;
  height:60px;
}
::v-deep .nav-link {
   color: #fff !important;
}
.button2 {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
  background-color: olive; /* Green */
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
  background-color: darkgreen; /* Green */
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
