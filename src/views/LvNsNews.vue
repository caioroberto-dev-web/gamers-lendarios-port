<script setup>
import { onMounted, ref } from "vue";

//components
import LvLista from "../components/LvList.vue";

//services
import { newsServices } from "../services/newsServices";
import { commentsServices } from "../services/commentsServices";

const nsNews = ref([]);

onMounted(async () => {
  const newsData = await newsServices.getAllNsNews();

  const processedData = newsData.data.ns.map(async (nintendoSwitch) => {
    const commentCount = await commentsServices.getAllCommentsById(
      nintendoSwitch.idNoticia
    );
    return {
      ...nintendoSwitch,
      commentCount: commentCount.data.qtdComentario.length,
    };
  });

  Promise.all(processedData).then((data) => {
    nsNews.value = data;
  });
});

</script>

<template>
  <div class="container-ns-news pt-5">
    <h2 class="pb-5">
      Nintendo Switch <br />
      <i class="bi bi-nintendo-switch"></i>
    </h2>
    <lv-lista
      :lists="nsNews"
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
.container-ns-news {
  text-align: center;
}
</style>
