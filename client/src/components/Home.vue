<template>
  <div>
    <h1 class="mb-3 mt-3">Felhasználók</h1>
    <br />
    <button @click="dels()" class="btn btn-info">Session erase</button>
    <br />
    <br />
    <div class="row">
      <div class="col-6 col-md-4" v-for="(felhasznalo,i) in reversedFelhasznalok" :key="felhasznalo._id">
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;" >
          <div class="card-header">@{{felhasznalo.felhasznalonev}} <button @click="deleteFelhasznalo(felhasznalo._id,i)" class="btn btn-info" style="float: right; margin:-5px" >törlés</button> </div>
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
    felhasznalok: [],
    felhasznalo: {
      _id: ''
    }
  }),
  computed: {
    reversedFelhasznalok () {
      return this.felhasznalok.slice().reverse()
    }
  },
  mounted () {
    this.$session.set('redirect', '/')
    fetch(API_URL).then(response => response.json()).then(result => {
      this.felhasznalok = result
    })
  },
  methods: {
    deleteFelhasznalo (index, i) {
      this.felhasznalo._id = index
      fetch(API_URL, {
        method: 'DELETE',
        body: JSON.stringify(this.felhasznalo),
        headers: {
          'content-type': 'application/json'
        }
      })
      this.felhasznalok.splice(((-1 * i) - 1), 1)
    },
    dels () {
      this.$session.destroy()
    }
  }
}
</script>

<style>
.list-unstyled{
  margin-top: 30px;
}
</style>
