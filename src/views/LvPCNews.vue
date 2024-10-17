<script setup>
import { onMounted, ref } from "vue";

//components
import LvLista from "../components/LvList.vue";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

const allPCNews = ref();

onMounted(async () => {
  const newsData = await newsServices.getAllPCNews();
  console.log(newsData)
  const processedData = newsData.data.pc.map(async (computador) => {
    const commentCount = await commentsServices.getAllCommentsById(
      computador.idNoticia
    );
    return {
      ...computador,
      commentCount: commentCount.data.qtdComentario.length,
    };
  });
  Promise.all(processedData).then((data) => {
    allPCNews.value = data;
  });
});
</script>

<template>
  <div class="container-pc-news pt-5">
    <h2 class="pb-5">
      PC <br />
      <i class="bi bi-pc-display"></i>
    </h2>
    <lv-lista
      :lists="allPCNews"
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
.container-pc-news {
  text-align: center;
}
</style>
