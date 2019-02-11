<template>
  <div>
    <h1 class="mb-3 mt-3">Időpontok</h1>
    <br />
    <button @click="addss()" class="btn btn-info">Kiss Doktor</button>
    <button @click="addss2()" class="btn btn-info">Nagy Doktor</button>
    <br />
    <br />
    <div class="row" v-if="raeresek[0]">
      <div class="col-6 col-md-4" v-for="(raeres) in raeresek[0].raeresek" :key="raeres.nap">
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;" >
          <div class="card-header">nap: {{raeres.nap}} </div>
          <div class="card-body">
            <h4 class="card-title">Kezdés: {{raeres.kezdeti_idopont}}</h4>
            <p class="card-text"> Végzés: {{raeres.veg_idopont}}
              <br />
              <small>Időköz: {{raeres.idokoz}}</small></p>
          </div>
        </div>
      </div>
    </div>
    <p v-else-if="this.$session[doc]===undefined">Kérem válasszon a fenti lehetőségek közül!</p>
    <p v-else>Adatok betöltése folyamatban...</p>
  </div>
</template>

<script>
const API_URL_GET = 'http://localhost:8082/raeresek?arg='

export default {
  name: 'Time',
  data: () => ({
    raeresek: []
  }),
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      fetch(API_URL_GET.concat(this.$session.get('doc'))).then(response => response.json()).then(result => {
        this.raeresek = result
      })
    },
    addss () {
      this.$session.set('doc', '5c5d3daccce24f04eb734c5c')
      this.fetch()
    },
    addss2 () {
      this.$session.set('doc', '5c5d369eefdf7415b840e81f')
      this.fetch()
    }
  }
}
</script>

<style>
.list-unstyled{
  margin-top: 30px;
}
</style>
