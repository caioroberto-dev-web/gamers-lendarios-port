<script setup>
import { onMounted, ref } from "vue";

//components
import LvLista from "../components/LvList.vue";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

const xboxNews = ref();

onMounted(async () => {
  const newsData = await newsServices.getAllXboxNews();
  const processedData = newsData.data.xbox.map(async (xbox) => {
    const commentCount = await commentsServices.getAllCommentsById(
      xbox.idNoticia
    );
    return {
      ...xbox,
      commentCount: commentCount.data.qtdComentario.length,
    };
  });

  Promise.all(processedData).then((data) => {
    xboxNews.value = data;
  });
});
</script>

<template>
  <div class="container-xbox-news pt-5">
    <h2 class="pb-5">
      Xbox <br />
      <i class="bi bi-xbox"></i>
    </h2>
    <lv-lista
      :lists="xboxNews"
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
.container-xbox-news {
  text-align: center;
}
</style>
