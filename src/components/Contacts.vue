<template>
  <ul class="nav">
    <li class="nav__item nav__item--current"
      :class="{
        'nav__item--valid': isValid
      }">
      <a class="nav__link" href="#/contacts">1</a>
    </li><li class="nav__item"
      :class="{
        'nav__item--current': isValid
      }">
      <a class="nav__link"
        :href="isValid && '#/locations'">2</a>
    </li><li class="nav__item">
      <span class="nav__link">3</span>
    </li><li class="nav__item">
      <span class="nav__link">4</span>
    </li>
  </ul>
  <div class="contacts">
     <label class="contacts__label" for="name">1. Введите имя и e-mail</label>
     <div class="contacts__input input"
        :class="{
          'input--error': !validation.name
        }">
       <input class="input__field" id="name" type="text" placeholder="Имя"
          v-model="newUser.name"
          v-on:focusout="addName()">
       <span class="input__hint"
          :class="{
            'input__hint--visible': !validation.name
          }">– имя не должно быть пустое</span>
     </div>
     <div class="contacts__input input"
       :class="{
         'input--error': !validation.email
       }">
       <input class="input__field" type="text" placeholder="E-mail"
          v-model="newUser.email"
          v-on:focusout="addEmail()">
       <span class="input__hint"
         :class="{
           'input__hint--visible': !validation.email
         }">– в адресе должен быть символ @</span>
     </div>
  </div>
  <pagination
    :previus="previus"
    :next="next"
    :start="start"
    :middle="middle"
    :finish="finish"
    :valid.sync="isValid"></pagination>
</template>

<script>
import { getItem, setItem, removeItem } from '../store/storage'

import Pagination from './Pagination.vue'

var emailRE = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

export default {
  name: 'Contacts',

  components: {
    Pagination
  },

  data () {
    return {
      newUser: {
        name: '',
        email: ''
      },
      previus: '',
      next: 'locations',
      start: false,
      middle: false,
      finish: false
    }
  },

  computed: {
    validation () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },

    isValid () {
      var validation = this.validation

      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },

  methods: {
    addName () {
      setItem('name', this.newUser.name)
    },

    addEmail () {
      setItem('email', this.newUser.email)
    }
  },

  created () {
    let name = getItem('name')
    let email = getItem('email')

    if (name || email) {
      this.newUser.name = name
      this.newUser.email = email
    }
  }
}
</script>

<style>
@import '../styles/nav.css';
@import '../styles/input.css';

.contacts__label {
  display: block;
  margin-bottom: 40px;
}

.contacts__input {
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .contacts__input {
    margin-bottom: 40px;
  }
}
</style>
