<script setup>
defineProps({
  src: String,
  alt: String,
});
</script>
<template>
  <div class="container-img">
    <img class="img-fluid" :src="src" :alt="alt" role="presentation" />
  </div>
</template>

<style scoped>
.container-img {
  text-align: center;
  margin: 15px 0;
}
</style>
