<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

//components
import LvButton from "../components/LvButton.vue";

//services
import { newsServices } from "../services/newsServices";

//store
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

const loading = ref("Postar noticia");

const toast = useToast();

const router = useRouter();

const postNew = ref({
  titulo: "",
  plataforma: "",
  descricao: "",
  image: null,
});

const postNewInfor = async (field) => {
  loading.value = "Carregando...";

  const formData = new FormData();

  formData.append("image", field.image[0].file);

  for (const [key, value] of Object.entries(field)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }

  await newsServices
    .postNew(formData, userStore.user.token)
    .then((res) => {
      toast.success(res.data.message);
      router.push("/panel-user/my-news");
    })
    .catch((e) => {
      loading.value = "Postar noticia";
      toast.error(e.response.data.message);
    });
};
</script>

<template>
  <div class="pb-5">
    <h2 class="text-center py-5">Post new</h2>
    <FormKit
      type="form"
      id="myForm"
      @submit="postNewInfor"
      #default="{ value }"
      :actions="false"
    >
      <div class="row container-post-new bg-dark rounded p-5">
        <div class="col-lg-6 col-12">
          <FormKit
            class="form-control form-control-sm"
            type="text"
            name="titulo"
            label="Titulo"
            :help="`Caracteres: ${
              value.titulo ? value.titulo.length : postNew.titulo.length
            } / 50 máx`"
            validation="length:0,50 || required"
            v-model="postNew.titulo"
            :validation-messages="{
              length: `O máximo de caracteres é 50`,
            }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="select"
            label="Plataforma"
            placeholder="Selecione a plataforma"
            name="plataforma"
            v-model="postNew.plataforma"
            :options="[
              'pc',
              'playstation',
              'xbox',
              'nintendo switch',
              'mobile',
            ]"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12 my-2">
          <FormKit
            type="file"
            name="image"
            label="Imagem"
            accept=".jpg, .jpeg, .png"
            multiple="false"
            validation="required"
            v-model="postNew.image"
          />
        </div>
        <div class="col-12">
          <FormKit
            type="textarea"
            name="descricao"
            label="Descrição"
            :help="`Caracteres: ${
              value.descricao
                ? value.descricao.length
                : postNew.descricao.length
            } / 5000 máx`"
            validation="length:0,5000 || required"
            v-model="postNew.descricao"
            :validation-messages="{
              length: `O máximo de caracteres é 5000`,
            }"
          />
        </div>
        <lv-button :loading="'Editar noticia'"></lv-button>
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.container-post-new {
  text-align: start;
  width: 80%;
  margin: 0 auto;
}

@media (max-width: 320px) {
  .container-post-new {
    width: 96%;
  }
}
</style>
