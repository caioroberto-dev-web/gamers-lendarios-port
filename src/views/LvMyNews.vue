<script setup>
import { useToast } from "vue-toastification";

//components
import LvRouterLink from "../components/LvRouterLink.vue";

//services
import { onMounted, ref } from "vue";
import { newsServices } from "../services/newsServices";

//store
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

const myNews = ref([]);

const toast = useToast();

onMounted(() => {
  getAllNews();
});

const deleteNew = async (id) => {
  await newsServices
    .deleteNew(id, userStore.user.token)
    .then((res) => {
      toast.success(res.data.message);
      getAllNews();
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
};

const getAllNews = async () => {
  await newsServices
    .getAllNews()
    .then((res) => {
      myNews.value = res.data.lista;
      console.log(myNews.value);
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>

<template>
  <div>
    <div v-if="myNews.length">
      <table class="table table-dark table-striped-columns">
        <thead>
          <tr>
            <th scope="col" class="text-start py-2">Título</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="myNew in myNews" :key="myNew.id">
            <th scope="row">
              {{ myNew.titulo }}
              <div class="float-end"><lv-router-link
                class="btn btn-primary mx-3 rounded-3"
                :to="'/panel-user/edit-new/' + myNew.idNoticia"
                :title="'Editar noticia'"
              >
              </lv-router-link>
              <button
                class="btn btn-danger rounded-3"
                @click="deleteNew(myNew.idNoticia, userStore.user.token)"
              >
                Excluir
              </button></div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h2 class="text-center py-3">Não tem noticias</h2>
    </div>
  </div>
</template>

<style scoped></style>
