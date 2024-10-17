<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

//services
import { newsServices } from "../services/newsServices";

//components
import LvButton from "../components/LvButton.vue";

//store
import { useUserStore } from "../store/useUserStore";

const route = useRoute();

const router = useRouter();

const userStore = useUserStore();

const getNew = ref();

const toast = useToast();

onMounted(async () => {
  await newsServices
    .detailsNew(route.params.id)
    .then((res) => {
      getNew.value = res.data.noticia[0];
      console.log(getNew.value);
    })
    .catch((e) => {
      console.log(e);
    });
});

const editNewSubmit = async (fields) => {
  const formData = new FormData();

  formData.append("image", fields.image[0].file);

  for (const [key, value] of Object.entries(fields)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }

  await newsServices
    .editNew(route.params.id, formData, userStore.user.token)
    .then((res) => {
      toast.success(res.data.message);
      router.push("/");
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
};
</script>

<template>
  <div>
    <h2 class="text-center py-5">Edit new</h2>
    <div v-if="!getNew">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <FormKit
        type="form"
        @submit="editNewSubmit"
        #default="{ value }"
        :actions="false"
      >
        <div class="row container-edit-new bg-dark rounded p-5">
          <div class="col-lg-6 col-12">
            <FormKit
              class="form-control form-control-sm"
              type="text"
              name="titulo"
              label="Titulo"
              :help="`Caracteres: ${
                value.titulo ? value.titulo.length : getNew.titulo.length
              } / 50 máx`"
              validation="length:0,50 || required"
              v-model="getNew.titulo"
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
              v-model="getNew.plataforma"
              :options="{
                pc: 'pc',
                playstation: 'playstation',
                xbox: 'xbox',
                nintendoSwitch: 'nintendo switch',
                mobile: 'mobile',
              }"
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
              v-model="getNew.image"
              validation="required"
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
                  : getNew.descricao.length
              } / 5000 máx`"
              validation="length:0,5000 || required"
              v-model="getNew.descricao"
              :validation-messages="{
                length: `O máximo de caracteres é 5000`,
              }"
            />
          </div>
          <lv-button :loading="'Editar noticia'"></lv-button>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
.container-edit-new {
  text-align: start;
  width: 80%;
  margin: 0 auto;
}
</style>
