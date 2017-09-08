<template>
  <div class="info">
    <div class="info__desc">
      <div class="info__name">{{ newInfo.name }}</div>
      <div class="info__contacts">
        <a class="info__mailto"
          :href="'mailto:' + newInfo.email">{{ newInfo.email }}</a>
      </div>
      <div class="info__location">
        <span class="info__city"
        :class="{
          'info__city--hidden': !newInfo.city
        }">{{ newInfo.city }},</span>
        {{ newInfo.country }}
      </div>
      <div class="info__social">
        <a class="info__profile"
          v-for="social in newInfo.social"
          :href="social.url"
          :class="{
            'info__profile--hidden': !social.url
          }">{{ social.name }}: <span class="info__url">{{ social.url }}</span></a>
      </div>
    </div>
    <div class="info__visual">
      <img class="info__image"
        :src="newInfo.image" alt="" />
    </div>
  </div>
  <div class="finish">
    <a class="button" href="#/contacts"
      v-on:click="resetData()">Пройти заново</a>
  </div>
</template>

<script>
import { getItem, setItem, removeItem } from '../store/storage'

import Pagination from './Pagination.vue'

export default {
  name: 'Info',

  components: {
    Pagination
  },

  data () {
    return {
      prop: 0,
      newInfo: {
        name: getItem('name'),
        email: getItem('email'),
        country: getItem('countryName'),
        city: getItem('cityName'),
        social: [
          { name: 'Facebook', url: getItem('facebook') },
          { name: 'Вконтакте', url: getItem('vk') },
          { name: 'Twitter', url: getItem('twitter') },
          { name: 'Одноклассники', url: getItem('od') }
        ],
        image: getItem('image')
      },
      previus: 'contacts',
      next: '',
      start: true,
      middle: false,
      finish: true
    }
  },

  route: {
    data ({ to }) {
      return {
        prop: to.params.param
      }
    }
  },

  methods: {
    resetData () {
      removeItem('name')
      removeItem('email')
      removeItem('country')
      removeItem('countryName')
      removeItem('city')
      removeItem('cityName')
      removeItem('facebook')
      removeItem('vk')
      removeItem('twitter')
      removeItem('od')
      removeItem('image')
      removeItem('imageName')
    }
  }
}
</script>

<style>
.finish {
  text-align: center;
}

.info {
  display: flex;
  justify-content: space-between;
  width: 510px;
  margin-bottom: 32px;
  margin-left: -127px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: #fff;
}

.info__name {
  font-size: 20px;
  margin-bottom: 4px;
  color: #000;
}

.info__mailto {
  text-decoration: none;
  color: #666675;
}

.info__profile {
  display: block;
}

.info__location {
  margin-top: 38px;
}

.info__social {
  margin-top: 40px;
}

.info__image {
  float: left;
}

.info__profile {
  text-decoration: none;
  color: #2c49cd;
}

.info__profile--hidden {
  display: none;
}

.info__url {
  color: #666;
}

.info__city--hidden {
  display: none;
}

@media (max-width: 480px) {
  .info {
    display: block;
    width: 100%;
    margin-left: 0;
    box-sizing: border-box;
  }

  .info__image {
    display: block;
    float: none;
    margin: 10px auto 0 auto;
  }
}
</style>
