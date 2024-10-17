<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { reset } from "@formkit/core";

//components
import LvButton from "../components/LvButton.vue";

//services
import { commentsServices } from "../services/commentsServices";

//store
import { useUserStore } from "../store/useUserStore";

//Emit personalizado
const emit = defineEmits(["commentSubmitted"]);

const userStore = useUserStore();

const route = useRoute();

const toast = useToast();

const loading = ref("Avaliar");

const comment = ref({
  comentatio: "",
  avaliacao: "",
});

const handleSubmit = async (value) => {
  loading.value = "Carregando...";
  await commentsServices
    .postComment(route.params.id, value, userStore.user.token)
    .then((res) => {
      toast.success(res.data.message);
      emit("commentSubmitted");
      reset("myForm");
      loading.value = "Avaliar";
    })
    .catch((erro) => {
      loading.value = "Avaliar";
      toast.error(erro.response.data.message);
      console.log(erro);
    });
};
</script>

<template>
  <FormKit
    type="form"
    id="myForm"
    @submit="handleSubmit"
    :actions="false"
    #default="value"
  >
    <div class="row container-comment-form p-3 my-3 bg-dark rounded border">
      <div class="col-lg-6 col-12">
        <FormKit
          type="textarea"
          name="comentario"
          label="Comentário"
          :help="`Caracteres: ${
            value.comentatio
              ? value.comentario?.length
              : comment.comentatio?.length
          } / 120 máx`"
          validation="length:5,120||required"
          :validation-messages="{
            length:
              'Comentário é no mínimo de 5 caracteres e não pode exceder os 120 caracteres.',
          }"
          v-model="comment.comentatio"
        />
      </div>
      <div class="col-lg-6 col-12">
        <FormKit
          type="select"
          placeholder="Selecione a nota"
          label="Avaliação"
          name="avaliacao"
          :options="{
            1: '1 estrela',
            2: '2 estrela',
            3: '3 estrela',
            4: '4 estrela',
            5: '5 estrela',
          }"
          validation="required"
          v-model="comment.avaliacao"
        />
      </div>
      <div class="col-lg-1 col-12">
        <lv-button class="ms-auto" :loading="loading"></lv-button>
      </div>
    </div>
  </FormKit>
</template>

<style scoped>
.container-comment-form {
  text-align: start;
  width: 80%;
  margin: 0 auto;
}

@media screen and (max-width: 992px) {
  .container-comment-form {
    width: 100%;
  }
}
</style>
