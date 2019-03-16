<template>
  <div class="register">
    <h1 class="mb-3 mt-3" align="center">Regisztráció</h1>
    <br />
    <form @submit.prevent="register" novalidate class="needs-validation">
        <div class="form-group">
          <input type="email"
            class="form-control"
            v-bind:class="[((submitStatus === '')?''
              :((!$v.email.required || !$v.email.email)
              ?'is-invalid':'is-valid')) || ((emailStatus === '')?'':'is-invalid') ]"
            id="email"
            v-model="felhasznalo.email"
            placeholder="Email cím"
            v-model.trim="$v.email.$model"
            v-on:input="resetForm()"
          >
          <div class="error"  v-if="!(submitStatus === '')
            && (!$v.email.required || !$v.email.email)">
              Nem megfelelő email formátum!
          </div>
          <div class="error"  v-if="!(emailStatus === '')">
              Ezzel az email címmel már regisztráltak!
          </div>
        </div>
        <div class="form-group">
            <input type="password"
            class="form-control"
            v-bind:class="[((submitStatus === '')?'':
              ((!$v.password.required || !$v.password.regPassword)
                ?'is-invalid':'is-valid'))]"
            id="jelszo"
            v-model="felhasznalo.jelszo"
            placeholder="Jelszó"
            v-model.trim="$v.password.$model"
            v-on:input="resetForm()"
          >
          <div class="error" v-if="!(submitStatus === '')
            && (!$v.password.required || !$v.password.regPassword)">
              A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt,
              egy számot. A jelszó hossza minimum 6, maximum 30 karakter.
          </div>
        </div>
        <div class="form-group">
            <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="text"
              class="form-control"
              v-bind:class="[((submitStatus === '')?''
                :((!$v.uname.required || !$v.uname.regUname)
                ?'is-invalid':'is-valid')) || ((unameStatus === '')?'':'is-invalid')]"
              id="felhasznalonev"
              placeholder="Felhasználónév"
              v-model="felhasznalo.felhasznalonev"
              v-model.trim="$v.uname.$model"
              v-on:input="resetForm()"
            >
          </div>
          <div class="error" v-if="!(submitStatus === '')
            && (!$v.uname.required || !$v.uname.regUname)">
              A felhasználónév hossza minimum 4, maximum 12 karakter.
              Tartalmazhat betűket, számokat, szóközt, "_" és "-"" karaktereket.
              Speciális karakter a felhasználónév elején, vagy végén nem megengedett!
          </div>
          <div class="error"  v-if="!(unameStatus === '')">
              Ezzel a felhasználónévvel már regisztráltak!
          </div>
        </div>
        <div class="form-group">
          <input type="text"
            class="form-control"
            v-bind:class="[((submitStatus === '')?''
              :((!$v.name.required || !$v.name.regName)
              ?'is-invalid':'is-valid'))]"
            id="teljes_nev"
            v-model="felhasznalo.teljes_nev"
            name="name"
            placeholder="Teljes név"
            v-model.trim="$v.name.$model"
            v-on:input="resetForm()"
          >
          <div class="error" v-if="!(submitStatus === '')
            && (!$v.name.required || !$v.name.regName)">
              Nem megfelelő név formátum!
          </div>
        </div>
        <div class="form-group">
          <label class="datelabel" for="szuletesi_ido">Születési idő:</label>
          <input type="date"
            class="form-control"
            v-bind:class="[((submitStatus === '')?''
              :((!$v.date.required || !$v.date.regDate || !$v.date.maxValue)
              ?'is-invalid':'is-valid'))]"
            id="szuletesi_ido"
            v-model="felhasznalo.szuletesi_ido"
            v-model.trim="$v.date.$model"
            v-on:input="resetForm()"
          >
          <div class="error" v-if="!(submitStatus === '')
            && (!$v.date.required || !$v.date.regDate || !$v.date.maxValue)">
              Kérem válasszon reális dátumot!
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input type="checkbox"
              class="form-check-input"
              v-bind:class="[((submitStatus === '')?''
                :((!$v.check.required)?'is-invalid':'is-valid'))]"
              id="gridCheck"
              v-model.trim="$v.check.$model"
              >
            <label class="form-check-label" for="gridCheck">
              Szerződések elfogadása<b style="color: red">*</b>
            </label>
          <div class="error" v-if="!(submitStatus === '') && (!$v.check.required)">
              Szerződések elfogadása kötelező!
          </div>
         </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Felhasználó létrehozása</button>
        </div>
        <p class="error" v-if="submitStatus === 'ERROR'">
          Javítsa ki a hibákat, majd kattintson újra a "Felhasználó létrehozása" gombra!
        </p>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, helpers, email } from 'vuelidate/lib/validators'
import AuthenticationService from '@/services/AuthenticationService'

Vue.use(Vuelidate)

/* import AuthenticationService from '@/services/AuthenticationService' */
// const API_URL = 'http://localhost:8082/felhasznalok'
const regPassword = helpers.regex('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/)
const regUname = helpers.regex('uname', /^((?!.*[_\s-]{2,})[a-zA-Z0-9][a-zA-Z0-9_\s\\-]{2,10}[a-zA-Z0-9])$/)
const regDate = helpers.regex('date', /^(([12]\d{3})-([1-9]|0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
const regName = helpers.regex('name', /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,30}$/u)
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
    },
    submitStatus: '',
    emailStatus: '',
    unameStatus: '',
    email: '',
    password: '',
    uname: '',
    date: '',
    name: '',
    check: ''
  }),
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      regPassword
    },
    uname: {
      required,
      regUname
    },
    date: {
      required,
      regDate,
      maxValue: value => value < new Date().toISOString()
    },
    name: {
      required,
      regName
    },
    check: {
      required
    }
  },
  methods: {
    /* async register () {
      this.error = null
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'Home'
        })
      } catch (error) {
        this.error = error.response.data.error
      } */
    resetForm () {
      this.emailStatus = ''
      this.unameStatus = ''
    },
    async register () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          const response = await AuthenticationService.register({
            email: this.email,
            jelszo: this.password,
            szuletesi_ido: this.date,
            felhasznalonev: this.uname,
            teljes_nev: this.name
          })
          if (response.data === 'email') {
            this.emailStatus = 'ERROR'
            return
          }
          if (response.data === 'uname') {
            this.unameStatus = 'ERROR'
            return
          }
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push('/')
          /*
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
          */
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
  .datelabel {
    font-size: 16px;
    margin: auto;
    color: gray;
    --font-family-sans-serif: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
  .error{
    color:red;
    font-size: 12px;
  }
  .register{
    width: 600px;
    height: 320px;
    margin-top: 50px;
    position:absolute; /*it can be fixed too*/
    left:0; right:0;
    top:0; bottom:0;

    /*this to solve "the content will not be cut when the window is smaller than the content": */
    max-width:100%;
    max-height:100%;
  }
</style>
