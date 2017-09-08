<template>
  <ul class="nav">
    <li class="nav__item nav__item--valid">
      <a class="nav__link" href="#/contacts">1</a>
    </li><li class="nav__item nav__item--current"
      :class="{
        'nav__item--valid': isValid
      }">
      <a class="nav__link" href="#/locations">2</a>
    </li><li class="nav__item"
      :class="{
        'nav__item--current': isValid
      }">
      <a class="nav__link"
        :href="isValid && '#/social'">3</a>
    </li><li class="nav__item">
      <span class="nav__link">4</span>
    </li>
  </ul>
  <div class="locations">
    <label class="locations__label" for="country">2. Выберите страну и город</label>
    <div class="locations__select select">
      <select class="select__input" id="country"
         v-model="newLocation.country"
         v-on:change="addCountry()">
        <option value="0" selected>Страна</option>
        <option
          v-for="country in countries"
          :value="country.id"
          :selected="selectedCountry(country.id)">
          {{ country.name }}
        </option>
      </select>
      <i class="select__icon"></i>
    </div>
    <div class="locations__select select">
      <select class="select__input"
        v-model="newLocation.city"
        v-on:change="addCity()">
        <option value="0" selected>Город</option>
        <option
          v-for="city in filteredCities"
          :value="city.id"
          :selected="selectedCity(city.id)">
          {{ city.name }}
        </option>
      </select>
      <i class="select__icon"></i>
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

export default {
  name: 'Locations',

  components: {
    Pagination
  },

  data () {
    return {
      newLocation: {
        country: '',
        city: ''
      },
      previus: 'contacts',
      next: 'social',
      start: false,
      middle: true,
      finish: false,
      countries: [
        { id: 1, name: 'Украина' },
        { id: 2, name: 'Германия' },
        { id: 3, name: 'Франция' },
        { id: 4, name: 'Испания' },
        { id: 5, name: 'Швеция' },
        { id: 6, name: 'США' },
        { id: 7, name: 'Канада' },
        { id: 8, name: 'Молдова' },
        { id: 9, name: 'Беларусь' },
        { id: 10, name: 'Польша' }
      ],
      cities: [
        { id: 10, country: 3, name: 'Париж'},
        { id: 11, country: 4, name: 'Мадрид'},
        { id: 12, country: 6, name: 'Хьюстон'},
        { id: 13, country: 7, name: 'Монреаль'},
        { id: 14, country: 8, name: 'Кишинев'},
        { id: 15, country: 9, name: 'Минск'},
        { id: 16, country: 10, name: 'Варшава'},
        { id: 100, country: 1, name: 'Львов'},
        { id: 101, country: 1, name: 'Николаев'},
        { id: 102, country: 1, name: 'Переяслав-Хмельницкий'},
        { id: 103, country: 1, name: 'Каменец-Подольский'},
        { id: 104, country: 1, name: 'Донетск'},
        { id: 105, country: 1, name: 'Харьков'},
        { id: 106, country: 1, name: 'Луцк'},
        { id: 107, country: 1, name: 'Полтава'},
        { id: 108, country: 1, name: 'Черновцы'},
        { id: 299, country: 1, name: 'Чернигов'},
        { id: 333, country: 1, name: 'Чернигов'}
      ]
    }
  },

  computed: {
    filteredCities () {
      return this.cities.filter(city => {
        return city.country == this.newLocation.country
      })
    },

    isValid () {
      if (this.newLocation.country > 0 | this.newLocation.city > 0) {
        return true
      }
    }
  },

  methods: {
    addCountry () {
      let countryName = this.countries.filter(country => {
        return country.id == this.newLocation.country
      })

      if (countryName.length > 0) {
        setItem('countryName', countryName[0].name)
      }

      setItem('country', this.newLocation.country)

      removeItem('city')

      removeItem('cityName')
    },

    addCity () {
      let cityName = this.cities.filter(city => {
        return city.id == this.newLocation.city
      })

      if (cityName.length > 0) {
        setItem('cityName', cityName[0].name)
      }

      setItem('city', this.newLocation.city)
    },

    selectedCountry (id) {
      return id === this.newLocation.country
    },

    selectedCity (id) {
      return id === this.newLocation.city
    }
  },

  created () {
    let country = getItem('country')
    let city = getItem('city')

    if (country || city) {
      this.newLocation.country = country
      this.newLocation.city = city
    }
  }
}
</script>

<style>
@import '../styles/select.css';

.outer--valid .nav__item:nth-child(1) .nav__link {
  color: #ff9800;
}

.outer--valid .nav__item:nth-child(2) .nav__link {
  color: #5c5c5c;
}

.locations__label {
  display: block;
  margin-bottom: 40px;
}

.locations__select {
  margin-bottom: 16px;
}
</style>
