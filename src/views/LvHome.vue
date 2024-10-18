<script setup>
import { onMounted, ref } from "vue";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

//components
import LvLista from "../components/LvList.vue";
import LvCarousel from "../components/LvCarousel.vue";

const noticias = ref([]);

onMounted(async () => {
  const newsData = await newsServices.getAllNews();

  const processedData = newsData.data.lista.map(async (noticia) => {
    const commentCount = await commentsServices.getAllCommentsById(
      noticia.idNoticia
    );
    return {
      ...noticia,
      commentCount: commentCount.data.qtdComentario.length,
    };
  });

  Promise.all(processedData).then((data) => {
    noticias.value = data;
  });
});
</script>

<template>
  <div class="container-noticias pt-5">
    <h1 class="pb-5">Últimas noticias</h1>
    <lv-carousel></lv-carousel>
    <lv-lista
      :lists="noticias"
      :properties="'titulo'"
      :properties2="'autor'"
      :properties3="'createdAt'"
      :properties4="'descricao'"
      :properties5="'titulo'"
      :image="'image'"
      :toUrl="'/details-new'"
      :id="'idNoticia'"
    ></lv-lista>
  </div>
</template>

<style scoped>
.container-noticias {
  text-align: center;
}
</style>
