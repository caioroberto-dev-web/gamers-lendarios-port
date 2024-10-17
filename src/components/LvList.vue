<script setup>
//components
import LvButton from "./LvButton.vue";
import LvImage from "./LvImage.vue";

//helpers
import dateFormated from "../helpers/formartDate";

defineProps({
  lists: Array || Object,
  id: String,
  properties: String,
  properties2: String,
  properties3: String,
  properties4: String,
  image: String,
  toUrl: String,
  commentCount: Number,
});
</script>

<template>
  <ul>
    <li class="nav-item row" v-for="list of lists" :key="list[id]">
      <h4>{{ list[properties] }}</h4>
      <small
        >Postado por <strong>{{ list[properties2] }}</strong> em
        {{ dateFormated(new Date(list[properties3])) }}</small
      >
      <lv-image class="col-lg-6 col-12" :src="list[image]"></lv-image>
      <p
        class="col-lg-6 col-12 text-truncate-custom"
        v-html="list[properties4]"
      ></p>
      <router-link class="nav-link col-lg-3 col-12" :to="toUrl + '/' + list[id]"
        ><lv-button :loading="'Saiba mais...'"></lv-button
      ></router-link>
      <p class="commentCount py-lg-3">
        ( {{ list.commentCount }} ) Comentários
      </p>
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding-bottom: 15px;
}

ul li {
  background-color: #333;
  min-height: 380px;
  width: 800px;
  margin: 15px auto;
  list-style: none;
  padding: 15px;
  border-radius: 15px;
  border: 0.1px solid transparent;
  transition: all ease-in-out 0.3s;
}

ul li:hover {
  border: 0.1px solid #fefefe;
}

img {
  display: block;
  margin: 0 auto;
  padding-bottom: 10px;
  border-radius: 15px;
}

a {
  margin: 0 auto;
}

.commentCount {
  position: relative;
  top: 10px;
}

.text-truncate-custom {
  overflow: hidden;
  height: 185px;
}

@media (max-width: 992px) {
  ul li {
    width: 500px;
  }

  ul {
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  ul li {
    width: 450px;
  }
}

@media (max-width: 576px) {
  ul li {
    width: 300px;
  }
}

@media (max-width: 320px) {
  ul li {
    width: 300px;
  }
}
</style>
