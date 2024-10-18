<script setup>
import { useRouter } from "vue-router";

//store
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
   <nav
    class="navbar navbar-expand-lg bg-black"
    data-bs-theme="dark"
    role="navigation"
    aria-label="Main navigation"
  >
    <router-link class="navbar-brand" to="/"
      ><img class="img-logo" src="/logo.svg" alt="gamers lendários"
    /></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target=".collapse"
      aria-expanded="false"
      aria-controls="nav-menu"
      tabindex="0"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/pc-news">PC</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/psx-news">Playstation</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/xbox-news">Xbox</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/ns-news"
            >Nintendo Switch</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/mob-news">Mobile</router-link>
        </li>
        <div>
          <span v-if="userStore.user.isLoggedIn == false">
            <li class="nav-item">
              <router-link class="nav-link" to="/register"
                >Registro</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </span>
          <span v-else>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="/panel-user/ + userStore.user.idUsuario"
              >
                <img
                  class="img-profile"
                  :src="userStore.user.image"
                  :alt="userStore.user.nome"
                  role="presentation"
                />
                {{ userStore.user.nome_de_usuario }}</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link logout" to="/login" @click="logout"
                >Logout</router-link
              >
            </li>
          </span>
        </div>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

ul li {
  display: inline-block;
  list-style: none;
  margin: 0 15px;
}

.img-profile {
  height: 30px;
}

.img-logo {
  height: 80px;
}

.logout {
  cursor: pointer;
}
</style>
