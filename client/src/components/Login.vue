<template>
<div class="login">
    <h1 class="mb-3 mt-3" align="center">Bejelentkezés</h1>
    <br />
    <form @submit.prevent="login" novalidate class="needs-validation">
        <div class="form-group">
            <input type="text"
              class="form-control"
              v-bind:class="[ ((correct === '')?'':'is-invalid') ]"
              v-model="email"
              placeholder="Email cím"
              v-model.trim="$v.email.$model"
              v-on:input="resetForm()"
              >
        </div>
        <div class="form-group">
            <input type="password"
               class="form-control"
               v-bind:class="[ ((correct === '')?'':'is-invalid') ]"
               v-model="password"
               placeholder="Jelszó"
               v-model.trim="$v.password.$model"
               v-on:input="resetForm()"
               >
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Bejelentkezés</button>
            <div class="error"  v-if="!(correct === '')">
              <br />
              Hibás email cím vagy jelszó!
            </div>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
            <a href="#" class="pull-right">Forgot Password?</a>
        </div>
    </form>
    <p class="text-center"><router-link to="/register">Felhasználó létrehozása</router-link></p>
</div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import AuthenticationService from '@/services/AuthenticationService'
import { required } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    correct: ''
  }),
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    resetForm () {
      this.correct = ''
    },
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          jelszo: this.password
        })
        if (response.data === 'false') {
          this.correct = 'ERROR'
          return
        }
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push(this.$session.get('redirect'))
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style scoped>
.login{
        width: 600px;
        height: 320px;
        margin-top: 50px;
        position:absolute;
        left:0; right:0;
        top:0; bottom:0;

        max-width:100%;
        max-height:100%;
}
.error{
    color:red;
    font-size: 14px;
  }
</style>
