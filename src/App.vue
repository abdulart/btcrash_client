<template>
  <div id="app">
    <div class="header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">Btcrash</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav mr-auto">
              <!--<li class="nav-item active">-->
              <!--<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
              <!--</li>-->

            </ul>
            <form @submit.prevent="logout" class="form-inline my-2 my-lg-0">
              <span class="navbar-brand"><kbd>{{user.rub}} rub.</kbd> {{user.email}}<button class="btn btn-warning ml-3">Выйти</button></span>
            </form>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Header from './views/partials/Header';
  const API_URL = 'http://localhost:5000/';

  export default {
    name: 'app',
    components: {
      Header
    },
    computed: {
      user () {
        return this.$store.state.user;
      },
    },
    mounted() {
      fetch(API_URL, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          if(res.user) {
            this.$store.commit('setUser', res.user);
          } else {
            this.$store.commit('setUser', {});
            localStorage.removeItem('token');
            this.$router.push('login');
          }
        });
    },
    methods: {
      logout() {
        this.$store.commit('setUser', {});
        localStorage.removeItem('token');
        this.$router.push('login');
      },
    },
  }
</script>

<style>
  #app {
  }
  .mb-30 {
    margin-bottom: 30px;
  }
</style>
