<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { reset } from "@formkit/core";

//components
import LvButton from "../components/LvButton.vue";

//services
import { userServices } from "../services/usersServices.js";

//store
import { useUserStore } from "../store/useUserStore.js";

const userStore = useUserStore();

const router = useRouter();

const toast = useToast();

const loading = ref("Login");

const handleSubmit = async (field) => {
  loading.value = "Carregando...";

  await userServices
    .loginUser(field)
    .then((res) => {
      userStore.loginUser(field);
      toast.success(res.data.message);
      router.push("/");
      reset("myForm");
    })
    .catch((err) => {
      loading.value = "Login";
      toast.error(err.response.data.message);
    });
};
</script>

<template>
  <div class="container-login">
    <FormKit
      type="form"
      id="myForm"
      @submit="handleSubmit"
      :actions="false"
      #default="{ value }"
    >
      <div class="row">
        <h2 class="text-center py-5">Login</h2>
        <div class="row bg-dark p-5 rounded m-auto">
          <div class="col-lg-12">
            <FormKit
              type="email"
              name="email"
              label="E-mail"
              validation="required|email"
            />
          </div>
          <div class="col-lg-12 py-3">
            <FormKit
              type="password"
              name="senha"
              label="Senha"
              validation="required"
            />
            <small><router-link to="/secret-word">Esqueceu a senha?</router-link></small>
          </div>
          <lv-button class="btn-login" :loading="loading" />
          <p class="text-center">Não possui conta? <router-link to="/register">Clique aqui!</router-link></p>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.container-login {
  max-width: 436px;
  margin: 0 auto;
}

@media (max-width: 576px) {
  .container-login {
    max-width: 280px;
  }

  .btn-login {
    margin: 15px auto;
  }
}
</style>
