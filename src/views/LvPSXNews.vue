<script setup>
import { onMounted, ref } from "vue";

//components
import LvLista from "../components/LvList.vue";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

const psxNews = ref([]);

onMounted(async () => {
  const newsData = await newsServices.getAllPSXNews();
  const processedData = newsData.data.psx.map(async (playstation) => {
    const commentCount = await commentsServices.getAllCommentsById(
      playstation.idNoticia
    );
    return {
      ...playstation,
      commentCount: commentCount.data.qtdComentario.length,
    };
  });

  Promise.all(processedData).then((data) => {
    psxNews.value = data;
  });
});
</script>

<template>
  <div class="container-psx-news pt-5">
    <h2 class="pb-5">
      Playstation <br />
      <i class="bi bi-playstation"></i>
    </h2>
    <lv-lista
      :lists="psxNews"
      :properties="'titulo'"
      :properties2="'autor'"
      :properties3="'createdAt'"
      :properties4="'descricao'"
      :image="'image'"
      :toUrl="'/details-new'"
      :id="'idNoticia'"
    ></lv-lista>
  </div>
</template>

<style scoped>
.container-psx-news {
  text-align: center;
}
</style>
