<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

//Services
import { commentsServices } from "../services/commentsServices";

//Store
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

const myComments = ref([]);

const toast = useToast();

onMounted(async () => {
  getMyComments();
});

const getMyComments = async () => {
  await commentsServices
    .myComments(userStore.user.idUsuario, userStore.user.token)
    .then((res) => {
      myComments.value = res.data.comentarios;
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteComment = async (id) => {
  await commentsServices
    .deleteComment(id)
    .then((res) => {
      toast.success(res.data.message);
      getMyComments();
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
};
</script>

<template>
  <div class="col-12 row">
    <div v-if="myComments.length">
      <h4 class="text-center pt-5">Meus comentários</h4>
      <ul class="container-comments text-center py-3">
        <li
          class="bg-dark p-3 border"
          v-for="myComment in myComments"
          :key="myComment.id"
        >
          <p>Notícia:</p>
          <p>{{ myComment.titulo }}</p>
          <p>Comentário:</p>
          <p class="comentario">{{ myComment.comentario }}</p>
          <p>Avaliação:</p>
          <p>{{ myComment.avaliacao }} / 5</p>
          <button
            class="btn btn-danger rounded-3"
            @click="deleteComment(myComment.idComentario)"
          >
            Excluir
          </button>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2 class="text-center py-3">Não tem comentários</h2>
    </div>
  </div>
</template>

<style scoped>
.comentario {
  max-width: 800px;
  margin: 20px auto;
  word-wrap: break-word;
}
</style>
