<template>
  <ul class="nav">
    <li class="nav__item nav__item--valid">
      <a class="nav__link" href="#/contacts">1</a>
    </li><li class="nav__item nav__item--valid">
      <a class="nav__link" href="#/locations">2</a>
    </li><li class="nav__item nav__item--current"
      :class="{
        'nav__item--valid': isValid
      }">
      <a class="nav__link" href="#/social">3</a>
    </li><li class="nav__item"
      :class="{
        'nav__item--current': isValid
      }">
      <a class="nav__link"
        :href="isValid && '#/cats'">4</a>
    </li>
  </ul>
  <div class="social">
    <span class="social__title">3. Отметьте социальные сети</span>
    <div class="social__item">
      <label class="social__label">
        <input type="checkbox" value="facebook"
          v-model="checkedFacebook"> Facebook
      </label>
      <span class="social__input input input--small"
        :class="{
          'social__input--visible': checkedFacebook,
          'input--error': !validation.facebook
        }">
        <input class="input__field" type="text" placeholder="Ваша страница в Facebook"
          v-model="newSocial.facebook"
          v-on:focusout="addFacebook()">
        <span class="input__hint"
          :class="{
            'input__hint--visible': !validation.facebook
          }">Должен быть url</span>
      </span>
    </div>
    <div class="social__item">
      <label class="social__label">
        <input type="checkbox" value="vk"
          v-model="checkedVk"> Вконтакте
      </label>
      <span class="social__input input input--small"
        :class="{
          'social__input--visible': checkedVk,
          'input--error': !validation.vk
        }">
        <input class="input__field" type="text" placeholder="Ваша страница в Вконтакте"
          v-model="newSocial.vk"
          v-on:focusout="addVk()">
          <span class="input__hint"
            :class="{
              'input__hint--visible': !validation.vk
            }">Должен быть url</span>
      </span>
    </div>
    <div class="social__item">
      <label class="social__label">
        <input type="checkbox" value="twitter"
          v-model="checkedTwitter"> Twitter
      </label>
      <span class="social__input input input--small"
        :class="{
          'social__input--visible': checkedTwitter,
          'input--error': !validation.twitter
        }">
        <input class="input__field" type="text" placeholder="Ваша страница в Twitter"
          v-model="newSocial.twitter"
          v-on:focusout="addTwitter()">
          <span class="input__hint"
            :class="{
              'input__hint--visible': !validation.twitter
            }">Должен быть url</span>
      </span>
    </div>
    <div class="social__item">
      <label class="social__label">
        <input type="checkbox" value="od"
          v-model="checkedOd"> Одноклассники
      </label>
      <span class="social__input input input--small"
        :class="{
          'social__input--visible': checkedOd,
          'input--error': !validation.od
        }">
        <input class="input__field" type="text" placeholder="Ваша страница в Одноклассниках"
          v-model="newSocial.od"
          v-on:focusout="addOd()">
          <span class="input__hint"
            :class="{
              'input__hint--visible': !validation.od
            }">Должен быть url</span>
      </span>
    </div
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

var urlRE = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

export default {
  name: 'Social',

  components: {
    Pagination
  },

  data () {
    return {
      newSocial: {
        facebook: '',
        vk: '',
        twitter: '',
        od: ''
      },
      checkedFacebook: false,
      checkedVk: false,
      checkedTwitter: false,
      checkedOd: false,
      previus: 'locations',
      next: 'cats',
      start: false,
      middle: true,
      finish: false
    }
  },

  computed: {
    validation () {
      return {
        facebook: urlRE.test(this.newSocial.facebook),
        vk: urlRE.test(this.newSocial.vk),
        twitter: urlRE.test(this.newSocial.twitter),
        od: urlRE.test(this.newSocial.od)
      }
    },

    isValid () {
      if (this.newSocial.facebook || this.newSocial.vk || this.newSocial.twitter || this.newSocial.od) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    addFacebook () {
      setItem('facebook', this.newSocial.facebook)
    },

    addVk () {
      setItem('vk', this.newSocial.vk)
    },

    addTwitter () {
      setItem('twitter', this.newSocial.twitter)
    },

    addOd () {
      setItem('od', this.newSocial.od)
    }
  },

  created () {
    let facebook = getItem('facebook')
    let vk = getItem('vk')
    let twitter = getItem('twitter')
    let od = getItem('od')

    if (facebook || vk || twitter || od) {
      this.newSocial.facebook = facebook
      this.newSocial.vk = vk
      this.newSocial.twitter = twitter
      this.newSocial.od = od
    }

    if (facebook) {
      this.checkedFacebook = true
    }

    if (vk) {
      this.checkedVk = true
    }

    if (twitter) {
      this.checkedTwitter = true
    }

    if (od) {
      this.checkedOd = true
    }
  }
}
</script>

<style>
.social__title {
  display: block;
  margin-bottom: 50px;
}

.social__item {
  margin-bottom: 23px;
  white-space: nowrap;
  line-height: 36px;
}

.social__label {
  display: inline-block;
  width: 150px;
}

.social__input {
  display: none;
}

.social__input--visible {
  display: inline-block;
}

.social .input__field {
  width: 250px;
}

.social .input__hint {
  top: 0;
  margin-left: 0;
  padding-left: 10px;
}

@media (max-width: 480px) {
  .social__title {
    margin-bottom: 0;
  }

  .social__item {
    margin-bottom: 0;
  }

  .social__input--visible {
    display: block;
  }

  .social .input__field {
    width: 220px;
  }

  .social .input__hint {
    font-size: 10px;
    left: 220px;
  }
}
</style>
