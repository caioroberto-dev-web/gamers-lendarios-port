<script setup>
import { ref } from "vue";

const link = ref("https://www.linkedin.com/in/caioroberto-dev-web");
</script>

<template>
  <footer class="text-center mt-3">
    <img class="my-3" src="/logo-footer.png" alt="gamers lendários" />
    <p>Gamers Lendários</p>
    <p>&copy; 2024 - todos os direitos reservados</p>
    <small class="pb-3"
      >Desenvolvido em Vue.js por <a :href="link" target="blank"> Caio Roberto</a>
    </small>
  </footer>
</template>

<style scoped>
footer {
  height: 200px;
  background-color: #333;
  color: #fefefe;
}

img {
  height: 50px;
}
</style>
