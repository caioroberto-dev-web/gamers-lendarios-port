<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

//Store
import { useUserStore } from "../store/useUserStore";

//Services
import { userServices } from "../services/usersServices";

//Components
import LvButton from "../components/LvButton.vue";

const loading = ref("Verificar");

const router = useRouter();

const toast = useToast();

const userStore = useUserStore();

const handleSubmit = async (field) => {
  loading.value = "Carregando...";

  await userServices
    .verifyRegistration(field)
    .then(async (res) => {
      await userStore.verifyRegistration(field);
      toast.success(res.data.message);
      router.push("/recover-password");
    })
    .catch((err) => {
      loading.value = "Verificar";
      toast.error(err.response.data.message);
    });
};
</script>

<template>
  <div class="container-secret-word">
    <FormKit
      type="form"
      id="myForm"
      @submit="handleSubmit"
      :actions="false"
      #default="{ value }"
    >
      <div class="row">
        <h2 class="text-center py-5">Verificar cadastro</h2>
        <div class="row bg-dark p-5 rounded m-auto">
          <div class="col-lg-12 py-3">
            <FormKit
              type="email"
              name="email"
              label="E-mail"
              validation="required|email"
            />
          </div>
          <div class="col-lg-12 py-3">
            <FormKit
              type="text"
              name="palavraSecreta"
              label="Palavra secreta"
              validation="required"
            />
          </div>
          <lv-button class="btn-secret-word" :loading="loading" />
        </div>
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.container-secret-word {
  width: 436px;
  margin: 0 auto;
}
</style>
