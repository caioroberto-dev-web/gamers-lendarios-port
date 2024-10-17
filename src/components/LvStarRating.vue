<script setup>
defineProps({
  rating: Number,
});
</script>

<template>
  <div>
    <span v-for="n in rating" :key="n">
      <i class="bi bi-star-fill text-warning"></i>
    </span>
  </div>
</template>

<style scoped></style>
