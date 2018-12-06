<template>
  <div>
    <h1 class="mb-3 mt-3">Felhasználók</h1>
<!--     <ul class="list-unstyled">
      <li class="media" v-for="felhasznalo in reversedFelhasznalok" :key=felhasznalo._id>
        <img v-if="felhasznalo.kep" class="mr-3" src="" :alt="felhasznalo.teljes_nev">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{felhasznalo.felhasznalonev}}</h4>
          <h5 class="mt-0 mb-1">{{felhasznalo.teljes_nev}}</h5>
          {{felhasznalo.email}}
          <br />
          <small>{{felhasznalo.szuletesi_ido}}</small>
          <hr>
        </div>
      </li>
    </ul> -->
    <div class="row">
      <div class="col-sm-6" v-for="felhasznalo in reversedFelhasznalok" :key=felhasznalo._id >
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;" >
          <div class="card-header">@{{felhasznalo.felhasznalonev}}</div>
          <div class="card-body">
            <h4 class="card-title">Teljes név: {{felhasznalo.teljes_nev}}</h4>
            <p class="card-text"> e-mail: {{felhasznalo.email}}
              <br />
              <small>születési dátum: {{felhasznalo.szuletesi_ido}}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:8082/felhasznalok'

export default {
  name: 'Home',
  data: () => ({
    felhasznalok: []
  }),
  computed: {
    reversedFelhasznalok () {
      return this.felhasznalok.slice().reverse()
    }
  },
  mounted () {
    fetch(API_URL).then(response => response.json()).then(result => {
      this.felhasznalok = result
    })
  }
}
</script>

<style>
.list-unstyled{
  margin-top: 30px;
}
</style>
