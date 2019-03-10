<template>
  <div class="mt-30">
    <form @submit.prevent="signup">
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

      <div class="mb-30 nes-field">
        <label for="confirmPassword">Подтвердите пароль</label>
        <input
          v-model="user.confirmPassword"
          type="password" id="confirmPassword" class="nes-input" required>
      </div>

      <img v-if="signingUp" class="spinner" src="../assets/spinner.svg"/>
      <button v-else type="submit" class="nes-btn">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().trim().min(6).required(),
  confirmPassword: Joi.string().trim().min(6).required(),
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    validUser() {
      this.errorMessage = '';

      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают';
        return false;
      }

      const result = Joi.validate(this.user, schema);

      if (result.error === null) {
        return true;
      }

      if (result.error.message.includes('email')) {
        this.errorMessage = 'Неверный имейл';
      } else {
        this.errorMessage = 'Пароль должен содержать 6+ символов';
      }
      return true;
    },
    signup() {
      if (this.validUser()) {
        const body = {
          email: this.user.email,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return res.json()
              .then((err) => {
                throw new Error(err.message);
              });
          })
          .then((res) => {
            localStorage.token = res.token;
            this.signingUp = false;
            this.$store.commit('setUser', res);
            this.$router.push('dashboard');
          })
          .catch((err) => {
            this.signingUp = false;
            this.errorMessage = err.message;
          });
      }
    },
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
    height: 100px;
    width: 100px;
  }
</style>
