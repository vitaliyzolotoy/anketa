<template>
  <ul class="pagination">
    <li class="pagination__item pagination__item--left"
      v-if="middle">
      <a class="pagination__link"
        :href="'#/' + previus">
        Предыдущий
      </a>
    </li><li class="pagination__item pagination__item--right"
      v-if="!finish">
      <a class="pagination__link"
        :href="valid && ('#/' + next)">
        Следующий
      </a>
    </li><li class="pagination__item"
      v-if="!start && finish">
      <a class="pagination__link button"
        :href="valid && ('#/' + next)">Завершить</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    previus: String,
    next: String,
    start: Boolean,
    middle: Boolean,
    finish: Boolean,
    valid: Boolean
  },
}
</script>

<style>
@import '../styles/button.css';

.pagination {
  font-weight: bold;
  position: absolute;
  bottom: 0;
  margin: 0 0 20px 0;
  padding: 0;
  list-style: none;
  display: block;
  width: 100%;
}

.pagination__item,
.pagination__link {
  display: inline-block;
  height: 37px;
}

.pagination__item {
  line-height: 37px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: #fff;
}

.pagination__item:first-child {
  margin-right: 16px;
}

.pagination__link {
  text-decoration: none;
  color: #ff9800;
}

.pagination__item--left .pagination__link::before,
.pagination__item--right .pagination__link::after {
  position: relative;
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 0.2em solid #ff9800;
  border-top: 0.2em solid #ff9800;
  transform: rotate(45deg);
}

.pagination__link
{
  padding-left: 9px;
  padding-right: 17px;
}

.pagination__item--left .pagination__link::before {
  transform: rotate(-135deg);
  margin-right: 10px;
}

.pagination__item--right .pagination__link::after {
  transform: rotate(45deg);
  margin-left: 10px;
}
</style>
