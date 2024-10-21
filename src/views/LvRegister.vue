<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { reset } from "@formkit/core";

//services
import { userServices } from "../services/usersServices.js";

//componentes
import LvButton from "../components/LvButton.vue";
import { FormKit } from "@formkit/vue";

const router = useRouter();

const toast = useToast();

const loading = ref("Register");

const handleSubmit = async (field) => {
  loading.value = "Carregando...";

  const formData = new FormData();

  formData.append("image", field.image[0].file);

  field.senha = field.password;
  field.confirmaSenha = field.password_confirm;

  delete field.password;
  delete field.password_confirm;

  for (const [key, value] of Object.entries(field)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }
  await userServices
    .registerUser(formData)
    .then((res) => {
      toast.success(res.data.message);
      router.push("/login");
      reset("myForm");
    })
    .catch((err) => {
      loading.value = "Register";
      toast.error(err.response.data.message);
    });
};
</script>

<template>
  <div class="container-registro pb-5">
    <FormKit
      @submit="handleSubmit"
      type="form"
      id="myForm"
      :actions="false"
      #default="{ value }"
    >
      <h2 class="text-center py-5">Register</h2>
      <div class="row bg-dark p-5 rounded gy-3">
        <div class="col-lg-6 col-12">
          <FormKit type="text" name="nome" label="Nome" validation="required" />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="text"
            name="nome_de_usuario"
            label="Nome de usuário"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="email"
            name="email"
            label="E-mail"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="text"
            name="palavraSecreta"
            label="Palavra secreta"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="password"
            name="password"
            label="Senha"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
              matches:
                'Por favor inclua pelo menos um símbolo especial e uma letra maiúscula',
            }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirma senha"
            validation="required|confirm"
            validation-label="Password confirmation"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="file"
            name="image"
            label="Imagem perfil"
            accept=".jpg, .jpeg, .png"
            multiple="false"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="textarea"
            name="bio"
            label="Biografia"
            :help="`${value.bio ? value.bio.length : 0} / 200 máx`"
            validation="required|length:5,200"
            :validation-messages="{
              length:
                'A biografia deve ter no mínimo 5 caracteres, e não pode ultrapassar 200 caracteres.',
            }"
          />
        </div>
        <div class="col-12">
          <lv-button class="m-0" :loading="loading"></lv-button>
        </div>
        <p class="text-center">
          Já possui conta? <router-link to="/login">Clique aqui!</router-link>
        </p>
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.container-registro {
  width: 80%;
  margin: 0 auto;
}

@media (max-width: 320px) {
  .container-registro {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
