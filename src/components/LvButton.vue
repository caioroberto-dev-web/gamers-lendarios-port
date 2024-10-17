<script setup>
defineProps({
  event: Function,
  loading: String,
});
</script>

<template>
  <button
    type="submit"
    :loading="loading"
    :disabled="loading === 'Carregando...'"
  >
    {{ loading }}
  </button>
</template>

<style scoped>
button {
  padding: 7px 15px;
  width: 150px;
  font-size: 18px;
  color: #fefefe;
  background-color: #000;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  margin: 15px;
  transition: all ease-in-out 0.3s;
}

button:hover {
  background-color: #555;
}
</style>
