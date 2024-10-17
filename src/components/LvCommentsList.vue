<script setup>
//components
import LvStarRating from "./LvStarRating.vue";

//healpers
import dateFormated from "../helpers/formartDate";

defineProps({
  comments: Array,
});
</script>

<template>
  <div class="pb-5 text-center">
    <div v-if="comments === undefined">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <h6 class="text-center" v-if="comments.length !== 0">Comentários:</h6>
      <h6 class="text-center" v-if="comments.length === 0">
        Seja o primeiro comentar:
      </h6>
      <li
        class="row col-12 m-auto my-3"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="container-profile col-lg-2 col-12 my-3">
          <p class="nome-profile m-0">{{ comment.nome_de_usuario }}</p>
          <img
            class="img-profile d-block m-auto w-50"
            :src="comment.image"
            :alt="comment.nome_de_usuario"
          />
          <small>{{ comment.bio }}</small>
        </div>
        <div class="col-lg-8 col-12">
          <span class="text-start date-post"
            >Postado em: {{ dateFormated(comment.createdAt) }}</span
          >
          <p class="comentario">"{{ comment.comentario }}"</p>
        </div>
        <div class="col-12">
          <p class="text-center">Avaliação:</p>
          <span> {{ comment.avaliacao }} / 5 </span>
          <lv-star-rating
            :rating="parseInt(comment.avaliacao)"
          ></lv-star-rating>
        </div>
      </li>
    </div>
  </div>
</template>

<style scoped>
.img-profile {
  border-radius: 15px;
}

li {
  list-style: none;
  background-color: #fefefe;
  color: #333;
  padding: 15px;
  border-radius: 15px;
}

.container-comentarios {
  padding: 15px;
}

.container-profile {
  height: 130px;
}

.comentario {
  max-width: 800px;
  margin: 20px auto;
  word-wrap: break-word;
}

@media (max-width: 320px) {
  .date-post {
    position: relative;
    top: 50px;
  }

  .comentario {
    margin: 50px auto;
  }
}
</style>
