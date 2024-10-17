<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

//components
import LvButton from "../components/LvButton.vue";

//services
import { userServices } from "../services/usersServices";

//store
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

const user = ref();

const toast = useToast();

const router = useRouter();

onMounted(async () => {
  await userServices
    .detailsUser(userStore.user.token)
    .then((res) => {
      user.value = res.data;
    })
    .catch((e) => {
      console.log(e);
    });
});

const loading = ref("Editar");

const editUser = async () => {
  loading.value = "Carregando...";

  const formData = new FormData();

  formData.append("image", user.value.image[0].file);

  formData.append("senha", user.value.password);
  formData.append("confirmaSenha", user.value.password_confirm);

  for (const [key, value] of Object.entries(user.value)) {
    if (key !== "image" || "password" || "password_confirm") {
      formData.append(key, value);
    }
  }

  await userServices
    .editUser(userStore.user.idUsuario, userStore.user.token, formData)
    .then((res) => {
      toast.success(res.data.message);
      router.push("/panel-user/" + userStore.user.idUsuario);
    })
    .catch((e) => {
      toast.error(e.response.data.message);
      loading.value = "Editar";
    });
};
</script>

<template>
  <div class="container-edit-user row col-12">
    <div v-if="!user">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <FormKit
        @submit="editUser"
        type="form"
        :actions="false"
        #default="{ value }"
      >
        <h2 class="text-center py-5">Edita usuário</h2>
        <div class="row gy-3 bg-dark p-5 mb-5 rounded">
          <div class="col-lg-6 col-12">
            <FormKit
              type="text"
              name="nome"
              label="Nome"
              validation="required"
              v-model="user.nome"
            />
          </div>
          <div class="col-lg-6 col-12">
            <FormKit
              type="text"
              name="nome_de_usuario"
              label="Nome de usuário"
              validation="required"
              v-model="user.nome_de_usuario"
            />
          </div>
          <div class="col-lg-6 col-12">
            <FormKit
              type="email"
              name="email"
              label="E-mail"
              validation="required"
              v-model="user.email"
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
              v-model="user.password"
            />
          </div>
          <div class="col-lg-6 col-12">
            <FormKit
              type="password"
              name="password_confirm"
              label="Confirma senha"
              validation="required|confirm"
              validation-label="Password confirmation"
              v-model="user.password_confirm"
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
              v-model="user.image"
            />
          </div>
          <div class="col-lg-6 col-12">
            <FormKit
              type="textarea"
              name="bio"
              label="Biografia"
              :help="`${value.bio ? value.bio.length : 0} / 200 máx`"
              validation="required|length:0,200"
              :validation-messages="{
                length: 'A biografia não pode ultrapassar 200 caracteres.',
              }"
              v-model="user.bio"
            />
          </div>
          <div class="col-12">
            <lv-button :loading="loading"></lv-button>
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
.container-edit-user {
  text-align: start;
  width: 80%;
  margin: 0 auto;
}

@media (max-width: 320px) {
  .container-edit-user {
    width: 96%;
  }
}
</style>
