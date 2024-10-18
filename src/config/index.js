import axios from "axios";

const http = axios.create({
  baseURL: "https://apigames.glitch.me",
});

export default http;
