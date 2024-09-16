<template>
  <div class="form">

    <h1 class="title">{{ loginForm }} / <a class="link" @click="toggleForm">{{ regForm }}</a></h1>

    <div v-if="!isRegistrationForm">

      <form @submit.prevent="auth">

        <div class="group">
          <input class='input' v-model="email" @blur="validateEmail" placeholder=" ">
          <label class='label'>Email</label>
          <span v-if="emailError" class="errorvalid">{{ emailError }}</span>
        </div>

        <div class="group">
          <input class='input' type='password' v-model="password" placeholder=" ">
          <label class='label'>Пароль</label>
        </div>

        <button class='button' type="submitauth" @click="showToast">Войти</button>

      </form>

    </div>

    <div v-else>

      <form @submit.prevent="register">

        <div class="group">
          <input class='input' v-model="name" @blur="validateName" placeholder=" " required>
          <label class='label'>Имя</label>
          <span v-if="nameError" class="errorvalid">{{ nameError }}</span>
        </div>

        <div class="group">
          <input class='input' v-model="email" @blur="validateEmail" placeholder=" " required>
          <label class='label'>Email</label>
          <span v-if="emailError" class="errorvalid">{{ emailError }}</span>
        </div>

        <div class="group">
          <input class='input' type='password' v-model="password" @blur="validatePassword" placeholder=" " required>
          <label class='label'>Пароль</label>
          <span v-if="passwordError" class="errorvalid">{{ passwordError }}</span>
        </div>

        <button class='button' type="submit">Зарегистрироваться</button>

      </form>

    </div>

  </div>
</template>



<script>
import axios from 'axios';


export default {

  data() {
    return {
      isRegistrationForm: false,
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    }
  },

  computed: {

    loginForm() {
    return this.isRegistrationForm ? 'Регистрация' : 'Вход'
    },

    regForm() {
    return this.isRegistrationForm ? 'Вход' : 'Регистрация'
    }
    
  },

  methods: {

    toggleForm() {
    this.isRegistrationForm = !this.isRegistrationForm
    this.clearFields();
    },

    clearFields() {
      this.email = '';
      this.password = '';
      this.name = '';
      this.emailError = '';
      this.passwordError = '';
      this.nameError = '';
    },
    
    auth() {
      if (this.emailError || this.passwordError) {

      } else {
        axios.post('http://localhost:3000/api/user/login', {email: this.email, password: this.password })
        .then(response => {
          this.$toast.success(`Вы успешно авторизовались!`, {
            type: 'success',
            position: "top",
            duration: 5000
          })
        })
      
        .catch(error => {
          this.$toast.error(`Неверно указан Email или пароль!`, {
            type: 'error',
            position: "top",
            duration: 5000
          })
        })
      }
    },

    register() {
      if (this.nameError || this.emailError || this.passwordError) {

      } else {
        axios.post('http://localhost:3000/api/user/registr', {name: this.name, email: this.email, password: this.password })
        .then(response => {
          this.$toast.success('Вы успешно зарегистрировались, ' + this.name + '!', {
            type: 'success',
            position: "top",
            duration: 5000
          })
        })
        .catch(error => {
          this.$toast.error(`Этот Email уже используется!`, {
            type: 'error',
            position: "top",
            duration: 5000
        })
        })
      }
    },
    
    validateName() {
    if (!this.name) {
        this.nameError = 'Введите имя'
    } else {
        this.nameError = ''
    }
    },

    validateEmail() {
    if (!this.email) {
        this.emailError = 'Введите email'
    } else if (!this.isValidEmail(this.email)) {
        this.emailError = 'Некорректный email'
    } else {
        this.emailError = ''
    }
    },

    isValidEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
    },

    validatePassword() {
    if (!this.password) {
        this.passwordError = 'Введите пароль'
    } else if (this.password.length < 6) {
        this.passwordError = 'Пароль должен содержать не менее 6 символов'
    } else {
        this.passwordError = ''
    }
    },
  },
}
</script>



<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 400px;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 4px 16px #ccc;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.5px;
}

.group {
  position:relative;
  margin-bottom: 32px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #00d18f;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}

.button:focus,
.button:hover {
  background-color: #00a16e;
}

.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  top: -18px;
  font-size: 12px;
  color: #e0e0e0;
}

.label {
  position: absolute;
  left: 0px;
  z-index: -1;
  color: #9e9e9e;
  transition: 0.3s;
}

.input {
  width: 100%;
  padding: 0 0 10px 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background-color: transparent;
  outline: none;
  transition: 0.3s;
}

.input:focus {
  border-bottom: 1px solid #1aa868;
}

.input,
.button {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
}

.title {
  text-align: left;
  margin: 0 0 32px 0;
  font-weight: normal;
}

.link {
  font-weight: 500;
  text-decoration: none;
  color: darkgray;
  -webkit-transition: all .3s ease;
      transition: all .3s ease;
}

.link:hover {
  color:rgb(113, 113, 113);
  cursor: pointer;
}

.errorvalid {
  color: red;
}

</style>