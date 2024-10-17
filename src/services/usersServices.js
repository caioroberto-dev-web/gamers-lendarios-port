import http from "../config";

export const userServices = {
  async registerUser(data) {
    return http.post("/cadastro", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async loginUser(data) {
    return http.post("/login", data)
  },

  async detailsUser(token) {
    return http.get("/checausuario", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  async editUser(id, token, data) {
    return http.patch("/perfilusuario/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  },
};
