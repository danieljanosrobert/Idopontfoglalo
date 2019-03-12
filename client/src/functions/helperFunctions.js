import store from '@/store/store'

export default {
  isAunthicated () {
    if (store.state.token === null) {
      return false
    } else {
      return true
    }
  }
}
