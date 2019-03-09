<template>
  <div class="mt-30">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <p v-if="errorMessage" class="note nes-text is-error">{{ errorMessage }}</p>
      <div class="mb-30 nes-field">
        <label for="email">Email</label>
        <input
          v-model="user.email"
          type="email" id="email" class="nes-input" required>
      </div>
      <div class="mb-30 nes-field">
        <label for="password">Пароль</label>
        <input
          v-model="user.password"
          type="password" id="password" class="nes-input" required>
      </div>
      <button type="submit" class="btn btn-primary"><img v-if="loggingIn" class="spinner" src="../assets/spinner.svg"/><span v-else>Войти</span></button>
    </form>
  </div>
</template>

<script>
  import Joi from 'joi';

  const LOGIN_URL = 'http://localhost:5000/auth/login';

  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  export default {
    data: () => ({
      user: {
        email: '',
        password: ''
      },
      errorMessage: '',
      loggingIn: false,
    }),
    methods: {
      login() {
        this.errorMessage = '';
        if(this.validUser()) {
          this.loggingIn = true;
          const body = {
            email: this.user.email,
            password: this.user.password
          };
          fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(body),
          }).then((res) => {
            if(res.ok) {
              return res.json();
            }
            return res.json()
              .then((err) => {
                throw new Error(err.message)
              })
          })
            .then((res) => {
              localStorage.token = res.token;
              this.loggingIn = false;
              this.$router.push('dashboard');
            })
            .catch((err) => {
              this.loggingIn = false;
              this.errorMessage = err.message;
            })
        }
      },
      validUser() {
        const result = Joi.validate(this.user, schema);

        if(result.error === null) {
          return true;
        }

        if (result.error.message.includes('email')) {
          this.errorMessage = 'Неверный имейл';
        }

        return false;
      }
    },
  };
</script>

<style scoped>
  .mb-30 {
    margin-bottom: 30px;
  }

  .mt-30 {
    margin-top: 30px;
  }

  .ps-250 {
    padding-left: 250px;
    padding-right: 250px;
  }

  .spinner {
    height: 18px;
    width: 18px;
  }
</style>
