import axios from "axios";

const http = axios.create({
  baseURL: "https://apibloggames.onrender.com",
});

export default http;
