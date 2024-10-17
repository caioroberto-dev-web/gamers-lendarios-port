<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

//components
import LvImage from "../components/LvImage.vue";
import LvRouterLink from "../components/LvRouterLink.vue";

//services
import { userServices } from "../services/usersServices";

//store
import { useUserStore } from "../store/useUserStore";

const route = useRoute();

const userStore = useUserStore();

const user = ref({});

onMounted(async () => {
  await userServices
    .detailsUser(userStore.user.token)
    .then((res) => {
      console.log(res.data);
      user.value = res.data;
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>

<template>
  <div class="row container-user p-3 m-auto">
    <h2 class="pt-3">Painel Usuário</h2>
    <i class="bi bi-person-circle fs-1 pb-3"></i>
    <div class="row bg-dark m-auto rounded p-3">
      <div class="col-lg-3 col-12">
        <h6>Nome de usuário:</h6>
        <p>{{ user.nome_de_usuario }}</p>
        <img :src="user.image" :alt="user.nome" />
        <h6 class="my-2">Bio:</h6>
        <small>{{ user.bio }}</small>
      </div>
      <div class="row rounded col-lg-9 col-12 mt-lg-0 mt-3 m-auto">
        <lv-router-link
          class="col-lg-auto col-12"
          :to="'/edit-user/' + route.params.id"
          :title="'Editar usuário'"
          :biClass="'bi-pencil-square'"
        ></lv-router-link>
        <lv-router-link
          class="col-lg-auto col-12"
          :to="'/panel-user/my-comments/' + route.params.id"
          :title="'Meus comentários'"
          :biClass="'bi-chat-right-text'"
        ></lv-router-link>
        <lv-router-link
          v-if="userStore.user.tipo === 'admin'"
          class="col-lg-auto col-12"
          :to="'/post-new'"
          :title="'Postar noticia'"
          :biClass="'bi-database-add'"
        ></lv-router-link>
        <lv-router-link
          v-if="userStore.user.tipo === 'admin'"
          class="col-lg-auto col-12"
          :to="'/panel-user/my-news'"
          :title="'Minhas noticias'"
          :biClass="'bi-card-list'"
        ></lv-router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-user {
  text-align: center;
}

h2,
h4 {
  margin: 15px;
}

img {
  height: 120px;
  border-radius: 15px;
}
</style>
