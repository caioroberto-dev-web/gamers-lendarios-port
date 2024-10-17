import http from "../config";

export const commentsServices = {
  async getAllCommentsById(id) {
    return http.get("/qtdcomentario/" + id);
  },
  async postComment(id, data, token) {
    return http.post("/comentario/" + id, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  async myComments(id, token) {
    return http.get("meuscomentarios/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  async deleteComment(id) {
    return http.delete("/excluircomentario/" + id);
  },
  async mediaReviewUsers(id) {
    return http.get("/mediaavaliacao/" + id);
  },
};
