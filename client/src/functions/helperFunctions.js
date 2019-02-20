import store from '@/store/store'
import router from '@/router/router'

export default {
  isAunthicated () {
    if (store.state.token === null) {
      router.push('/login')
    }
  }
}
