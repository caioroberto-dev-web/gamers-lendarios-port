<script setup>
defineProps({
  to: String,
  title: String,
  biClass: String,
});
</script>

<template>
  <router-link :to="to"
    ><i :class="`bi ${biClass} me-2`"></i>{{ title }}</router-link
  >
</template>

<style scoped>
a {
  text-decoration: none;
  background-color: #000;
  color: #fefefe;
  padding: 7px 15px;
  border-radius: 15px;
  margin: 15px auto;
  transition: all ease-in-out 0.3s;
}

a:hover {
  background-color: #333;
  color: #fefefe;
}
</style>
