<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style>
html,
.page {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #666675;
  background: #f5f5f5;
}

.page {
  font: 15px 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 467px;
}

.wrapper {
  position: relative;
  width: 310px;
  height: 447px;
}
</style>
