<template>
  <ul class="nav">
    <li class="nav__item nav__item--valid">
      <a class="nav__link" href="#/contacts">1</a>
    </li><li class="nav__item nav__item--valid">
      <a class="nav__link" href="#/locations">2</a>
    </li><li class="nav__item nav__item--valid">
      <a class="nav__link" href="#/social">3</a>
    </li><li class="nav__item nav__item--current"
      :class="{
        'nav__item--valid': isValid
      }">
      <a class="nav__link" href="#/cats">4</a>
    </li>
  </ul>
  <div class="cats">
    <div class="cats__title">4. Выберите любимого котика</div>
    <ul class="cats__list">
      <li class="cats__item"
        v-for="cat in cats">
        <label class="cats__label">
          <input class="cats__radio" type="radio"
            v-model="picked"
            :value="cat.name"
            v-on:click="checkValidation()">
          <img class="cats__image" alt=""
            :src="cat.thumb">
        </label>
      </li>
    </ul>
    <div class="cats__hint"
      :class="{
        'cats__hint--visible': !validation
      }">
      Вы выбрали собачку. А надо котика.
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
  name: 'Cats',

  components: {
    Pagination
  },

  data () {
    return {
      picked: '',
      cats: [
        { name: 'cat1', thumb: 'static/cat1-small.jpg', image: 'static/cat1-large.jpg', valid: true },
        { name: 'cat2', thumb: 'static/cat2-small.jpg', image: 'static/cat2-large.jpg', valid: true },
        { name: 'cat3', thumb: 'static/cat3-small.jpg', image: 'static/cat3-large.jpg', valid: true },
        { name: 'dog4', thumb: 'static/dog4-small.jpg', image: 'static/dog4-large.jpg', valid: false }
      ],
      validation: true,
      previus: 'social',
      next: 'info',
      middle: true,
      finish: true
    }
  },

  computed: {
    isValid () {
      if (this.picked == 'dog4') {
        return false
      } else if (this.picked) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    checkValidation () {
      var filter = this.cats.filter(cat => {
        return cat.name == this.picked
      })

      if (filter.length > 0 && filter[0].valid) {
        this.validation = filter[0].valid
      } else {
        this.validation = false
      }

      if (filter.length > 0) {
        setItem('image', filter[0].image)
        setItem('imageName', filter[0].name)
      }
    }
  },

  created () {
    let image = getItem('imageName')

    if (image) {
      this.picked = image
    }
  }
}
</script>

<style>
.cats__title {
  margin-bottom: 50px;
}

.cats__list {
  margin: 0 0 0 -50%;
  padding: 0;
  list-style: none;
  white-space: nowrap;
}

.cats__item {
  display: inline-block;
  margin-left: 16px;
  vertical-align: top;
}

.cats__item:first-child {
  margin-left: -16px;
}

.cats__label {
  cursor: pointer;
}

.cats__radio {
  position: absolute;
  visibility: hidden;
}

.cats__image {
  display: block;
  border-radius: 2px;
}

.cats__item:hover .cats__image {
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3);
}

.cats__radio:checked + .cats__image {
  box-shadow: 0 0 0px 2px #ff9800;
}

.cats__hint {
  display: none;
  margin-top: 16px;
  color: #ff0000;
}

.cats__hint--visible {
  display: block;
}

@media (max-width: 480px) {
  .cats__title {
    margin-bottom: 30px;
  }

  .cats__list {
    margin-left: 16px;
    white-space: normal;
  }

  .cats__item {
    margin-bottom: 16px;
  }

  .cats__image {
    width: 100px;
    height: 100px;
  }
}
</style>
