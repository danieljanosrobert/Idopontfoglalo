<template>
  <div>
    <h1 class="mb-3 mt-3">Regisztráció</h1>
    <!-- <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email"/>
    <br>
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"/>
    <br>
    <button
      @click="register">
      Register
    </button> -->
    <form @submit.prevent="register">
      <div class="form-row">
        <div class="form-group col-md-4 mb-3">
          <label for="email">Email cím</label>
          <input type="email" oninvalid="this.setCustomValidity('Valami')"
            oninput="this.setCustomValidity('23')"
            class="form-control" id="email"
            v-model="felhasznalo.email"
            placeholder="Email cím" required
          >
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="form-group col-md-4 mb-3">
          <label for="jelszo">Jelszó</label>
          <input type="password"
            class="form-control" id="jelszo"
            onblur="checkValidity()"
            oninvalid="this.setCustomValidity('A jelszó így kell kinézzen:');"
            oninput="this.setCustomValidity('')"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$"
            v-model="felhasznalo.jelszo"
            placeholder="Jelszó" required
          >
        </div>
        <div class="col-md-4 mb-3">
          <label for="felhasznalonev">Felhasználónév</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="text"
              class="form-control" id="felhasznalonev"
              placeholder="Felhasználónév"
              v-model="felhasznalo.felhasznalonev"
              required
            >
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 mb-4">
          <label for="szuletesi_ido">Születési idő</label>
          <input type="date"
            class="form-control" id="szuletesi_ido"
            v-model="felhasznalo.szuletesi_ido"
            placeholder="NN-HH-EEEE" required
          >
        </div>
        <div class="col-md-6 mb-4">
          <label for="teljes_nev">Teljes név</label>
          <input type="text"
            class="form-control" id="teljes_nev"
            v-model="felhasznalo.teljes_nev" name="name"
            placeholder="Teljes név" style="text-transform: capitalize;" required
          >
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck" required>
          <label class="form-check-label" for="gridCheck">
            Szerződések elfogadása
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Felhasználó létrehozása</button>
    </form>
  </div>
</template>

<script>
/* import AuthenticationService from '@/services/AuthenticationService' */
const API_URL = 'http://localhost:8082/felhasznalok'
export default {
  name: 'Register',
  data: () => ({
    felhasznalok: [],
    felhasznalo: {
      email: '',
      jelszo: '',
      szuletesi_ido: '',
      felhasznalonev: '',
      teljes_nev: ''
    }
  }),
  methods: {
    async register () {
      /* await AuthenticationService.register({
        email: this.email,
        jelszo: this.jelszo,
        szuletesi_ido: this.szuletesi_ido,
        felhasznalonev: this.felhasznalonev,
        teljes_nev: this.teljes_nev
      }) */
      console.log(this.felhasznalo)
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.felhasznalo),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json()).then(result => {
        this.felhasznalok.push(result)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>

</style>
