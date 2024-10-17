<script setup>
//components
import LvNavBar from "./components/LvNavBar.vue";
import LvFooter from "./components/LvFooter.vue";
import LvSearch from "./components/LvSearch.vue";

const hideInputSearch = [
  "lv-register",
  "lv-login",
  "lv-panel-user",
  "lv-edit-user",
  "lv-post-new",
  "lv-my-news",
  "lv-edit-new",
  "lv-details-new",
  "lv-my-comments",
];
</script>

<template>
  <div class="container-main" role="main">
    <lv-nav-bar></lv-nav-bar>
    <div class="container container-fluid p-0">
      <lv-search
        class="px-5 w-100 m-auto"
        v-if="!hideInputSearch.includes($route.name)"
      ></lv-search>
      <router-view></router-view>
    </div>
    <lv-footer></lv-footer>
  </div>
</template>

<style scoped>
.container {
  background-color: #555;
  min-height: 130vh;
  color: #fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.container-main {
  background-image: url("/background.png");
}
</style>
