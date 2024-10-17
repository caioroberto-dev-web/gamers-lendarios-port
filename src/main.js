import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { plugin, defaultConfig } from "@formkit/vue";
import { pt } from "@formkit/i18n";
import "./style.css";
import App from "./App.vue";
import router from "./routers";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Toast);
app.use(
  plugin,
  defaultConfig({
    locales: { pt },
    locale: "pt",
    config: {
      classes: {
        input: "form-control form-control-sm shadow-none border-0",
      },
    },
  })
);
app.mount("#app");
