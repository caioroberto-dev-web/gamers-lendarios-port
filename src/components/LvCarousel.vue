<script setup>
import { onMounted, ref } from "vue";

//services
import { newsServices } from "../services/newsServices";

const noticias = ref();

const activeIndex = ref(0);

onMounted(async () => {
  await newsServices
    .getAllNews()
    .then((res) => {
      noticias.value = res.data.lista;
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>

<template>
  <div id="carousel-captions" class="carousel slide mb-5">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carousel-captions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 0"
      ></button>
      <button
        type="button"
        data-bs-target="#carousel-captions"
        data-bs-slide-to="1"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carousel-captions"
        data-bs-slide-to="2"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carousel-captions"
        data-bs-slide-to="3"
        aria-label="Slide 3"
      ></button>
      <button
        type="button"
        data-bs-target="#carousel-captions"
        data-bs-slide-to="4"
        aria-label="Slide 4"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(noticia, index) in noticias"
        :key="noticia.id"
        class="carousel-item"
        :class="{ active: index === activeIndex }"
      >
        <router-link :to="/details-new/ + noticia.idNoticia">
          <img
            :src="noticia.image"
            class="img-carousel img-fluid d-block m-auto"
            :alt="noticia.titulo"
          />
          <div class="carousel-caption d-none d-md-block p-4">
            <h5>{{ noticia.titulo }}</h5>
          </div>
        </router-link>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carousel-captions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carousel-captions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Próximo</span>
    </button>
  </div>
</template>

<style scoped>
.container-slide {
  height: 300px;
}

.img-carousel {
  border-radius: 15px;
  border: 0.1px solid transparent;
  transition: all ease-in-out 0.3s;
}

.img-carousel:hover {
  border: 0.1px solid #fefefe;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 25px;
  border-radius: 15px;
  border: 0.1px solid #333;
}

.carousel-indicators {
  background-color: rgba(0, 0, 0, 0.7);
  width: 20%;
  margin: 0 auto 15px auto;
  border-radius: 15px;
  border: 0.1px solid #333;
}

@media (min-width: 320px) {
  .img-carousel {
    width: 90%;
  }
}
</style>
