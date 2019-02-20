import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    // token: localStorage.getItem('token') || '',
    token: null,
    user: null,
    isUserLoggedIn: false
  },

  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },

  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    logout ({commit}) {
      commit('setToken', null)
      commit('setUser', null)
    }
  },
  getters: {
    isUserLoggedIn: state => !!state.token,
    getUser: state => state.user
  }
})
/* mutations: {
    authSuccess (state, token) {
      state.token = token
      state.status = 'success'
    },
    authError (state) {
      state.token = ''
      state.status = 'error'
    }
  },

  actions: {
     login (context, payLoad) {
      return new Promise((resolve, reject) => {
         axios.post('/login', payLoad)
          .then((response) => {
            let accessToken = response.data.auth.access_token
            context.commit('authSuccess', accessToken)
            localStorage.setItem('token', accessToken)
            // axios.default.headers.common['Authorization'] = 'Bearer ' + window.token

            resolve(response)
          })
          .catch((error) => {
            localStorage.removeItem('token')
            context.commit('authError')
            console.log(error)
            reject(error)
          })
      })
    },

    logout (context) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        // delete axios.default.headers.common['Authorization']

        resolve()
      })
    }
  },

  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
})
*/
