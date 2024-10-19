import { defineStore } from "pinia";

//services
import { userServices } from "../services/usersServices";


export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      idUsuario: 0,
      token: "",
      isLoggedIn: false,
    },
  }),

  getters: {},

  actions: {
    async loginUser(data) {
      await userServices.loginUser(data).then((res) => {
        this.user = res.data;
      });
    },
    async verifyRegistration(data) {
      await userServices.verifyRegistration(data).then((res) => {
        this.user = res.data;
      });
    },
    async logout() {
      this.user = {
        idUsuario: 0,
        token: "",
        isLoggedIn: false,
      };
    },
  },
});
