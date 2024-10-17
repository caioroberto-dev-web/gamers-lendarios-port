<script setup>
import { onMounted, ref } from "vue";

//components
import LvLista from "../components/LvList.vue";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

const mobNews = ref([]);

onMounted(async () => {
  const newsData = await newsServices.getAllMobNews();
  const processedData = newsData.data.mob.map(async (mobile) => {
    const commentCount = await commentsServices.getAllCommentsById(
      mobile.idNoticia
    );
    return {
      ...mobile,
      commentCount: commentCount.data.qtdComentario.length,
    };
  });

  Promise.all(processedData).then((data) => {
    mobNews.value = data;
  });
});
</script>

<template>
  <div class="container-mob-news pt-5">
    <h2 class="pb-5">
      Mobile <br />
      <i class="bi bi-phone"></i>
    </h2>
    <lv-lista
      :lists="mobNews"
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
.container-mob-news {
  text-align: center;
}
</style>
