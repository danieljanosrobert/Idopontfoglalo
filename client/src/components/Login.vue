<template>
<div class="login">
    <h1 class="mb-3 mt-3" align="center">Bejelentkezés</h1>
    <br />
    <form action="/examples/actions/confirmation.php" method="post">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Email cím" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Jelszó" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Bejelentkezés</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
            <a href="#" class="pull-right">Forgot Password?</a>
        </div>
    </form>
    <p class="text-center"><a href="#">Create an Account</a></p>
</div>
</template>

<script>
// const API_URL = 'http://localhost:8082/felhasznalok'

export default {
  name: 'Login',
  data: () => ({
  }),
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
.login{
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
