<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

//Store
import { useUserStore } from "../store/useUserStore";

//Services
import { userServices } from "../services/usersServices";

//Components
import LvButton from "../components/LvButton.vue";
import { Slice } from "@tiptap/pm/model";

const toast = useToast();

const router = useRouter();

const userStore = useUserStore();

const loading = ref("Recuperar");

const handleSubmit = async (field) => {
  loading.value = "Carregando...";

  field.senha = field.password;
  field.confirmaSenha = field.password_confirm;

  delete field.password;
  delete field.password_confirm;

  await userServices
    .changePassword(field, userStore.user.token)
    .then((res) => {
      toast.success(res.data.message);
      router.push("/panel-user/" + userStore.user.idUsuario);
    })
    .catch((err) => {
      loading.value = "Recuperar";
      toast.error(err.response.data.message);
    });
};
</script>

<template>
  <div class="container-recover-password">
    <FormKit
      type="form"
      id="myForm"
      @submit="handleSubmit"
      :actions="false"
      #default="{ value }"
    >
      <div class="row">
        <h2 class="text-center py-5">Recuperar senha</h2>
        <div class="row bg-dark p-5 rounded m-auto">
          <div class="col-lg-12 py-3">
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
          <div class="col-lg-12 py-3">
            <FormKit
              type="password"
              name="password_confirm"
              label="Confirma senha"
              validation="required|confirm"
            />
          </div>
          <lv-button class="btn-recover-password" :loading="loading" />
        </div>
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.container-recover-password {
  width: 436px;
  margin: 0 auto;
}
</style>
