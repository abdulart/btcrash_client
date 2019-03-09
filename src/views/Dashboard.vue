<template>
  <div class="nes-container">
    <button @click="logout" class="nes-btn is-warning">Выйти</button>
    <p v-if="user">Hello, {{user.email}} 🐷</p>
  </div>
</template>

<script>
  const API_URL = 'http://localhost:5000/';
  export default {
    data: () => ({
      user: {},
    }),
    mounted() {
      fetch(API_URL, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          if(res.user) {
            this.user = res.user;
          } else {
            localStorage.removeItem('token');
            this.$router.push('login');
          }
        });
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('login');
      }
    },
  }
</script>

<style scoped>

</style>
