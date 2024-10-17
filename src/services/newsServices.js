import http from "../config";

export const newsServices = {
  async postNew(data, token) {
    return http.post("/noticia", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  },
  async getAllNews() {
    return http.get("/todasnoticias");
  },

  async detailsNew(id) {
    return http.get("/detalhes/" + id);
  },

  async getAllPCNews() {
    return http.get("/pcnoticias");
  },

  async getAllPSXNews() {
    return http.get("/psxnoticias");
  },

  async getAllXboxNews() {
    return http.get("/xboxnoticias");
  },

  async getAllNsNews() {
    return http.get("/nsnoticias");
  },

  async getAllMobNews() {
    return http.get("/mobnoticias");
  },

  async deleteNew(id, token) {
    return http.delete("/excluirnoticia/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  async editNew(id, data, token) {
    return http.patch("/editanoticia/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  },
};
