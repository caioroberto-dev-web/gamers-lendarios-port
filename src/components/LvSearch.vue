<script setup>
import { ref } from "vue";

//Components
import LvButton from "../components/LvButton.vue";

const loading = ref("Busca");

</script>

<template>
  <div class="container-search row bg-dark py-3">
    <div class="col-12">
      <div class="col-lg-6 col-12 m-auto">
        <FormKit type="form" :actions="false" #default="{value}">
          <FormKit type="search" label="Search" validation="required || length:3"></FormKit>
        </FormKit>
      </div>
      <div class="col-lg-6 col-12 m-auto">
        <lv-button class="m-0 mt-3 d-block ms-auto" :loading="loading"></lv-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-search {
  height: 135px;
}
</style>
