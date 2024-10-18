<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

//components
import LvImage from "../components/LvImage.vue";
import LvCommentForm from "../components/LvCommentForm.vue";
import LvComments from "../components/LvCommentsList.vue";
import LvStarRating from "../components/LvStarRating.vue";

//helpers
import dateFormated from "../helpers/formartDate";

//store
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

const detailsNew = ref();

const route = useRoute();

const comments = ref();

const mediaReviewUsers = ref(0);

onMounted(async () => {
  detailsNewFunction();

  getAllCommentsByIdFunction();

  mediaReviewUsersFunction();
});

const fetchComments = async () => {
  getAllCommentsByIdFunction();
  mediaReviewUsersFunction();
};

const detailsNewFunction = async () => {
  await newsServices
    .detailsNew(route.params.id)
    .then((res) => {
      detailsNew.value = res.data.noticia[0];
    })
    .catch((e) => {
      console.log(e);
    });
};

const getAllCommentsByIdFunction = async () => {
  await commentsServices
    .getAllCommentsById(route.params.id)
    .then((res) => {
      comments.value = res.data.qtdComentario;
    })
    .catch((e) => {
      console.log(e);
    });
};

const mediaReviewUsersFunction = async () => {
  await commentsServices
    .mediaReviewUsers(route.params.id)
    .then((res) => {
      mediaReviewUsers.value = res.data.media;
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>

<template>
  <div class="container-details-new px-3 rounded">
    <div v-if="!detailsNew">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <h2 class="pt-5">{{ detailsNew.titulo }}</h2>
      <img class="img-fluid" :src="detailsNew.image" :alt="`Imagem de carousel de ` + detailsNew.titulo" />
      <p class="text-center">
        Postado por: <strong>{{ detailsNew.autor }}</strong> em
        {{ dateFormated(detailsNew.createdAt) }} - atualizado em
        {{ dateFormated(detailsNew.updatedAt) }}
      </p>
      <p v-html="detailsNew.descricao"></p>
      <div v-if="mediaReviewUsers === null" class="mt-5">
        <p class="text-center">Média de usuários:</p>
        <h3>S/N</h3>
      </div>
      <div v-else class="my-4">
        <p class="text-center">Média de usuários:</p>
        <h3>{{ mediaReviewUsers }} / 5</h3>
      </div>
    </div>

    <div v-if="userStore.user.isLoggedIn === false" class="py-3">
      <p class="text-center">Faça o login para comentar essa notícia.</p>
    </div>
    <div v-else>
      <lv-comment-form @commentSubmitted="fetchComments"></lv-comment-form>
    </div>
    <div class="container-comentarios">
      <lv-comments :comments="comments"></lv-comments>
    </div>
  </div>
</template>

<style scoped>
h2,
h3 {
  text-align: center;
}

img {
  width: 680px;
  display: block;
  margin: 0 auto;
}

a {
  color: #007bff;
}

</style>
