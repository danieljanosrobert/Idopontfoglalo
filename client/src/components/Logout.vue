<template>
<p>Kijelentkezés</p>
</template>

<script>

export default {
  name: 'Logout',
  data: () => ({
  }),

  created () {
    this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>

<style>
</style>
