import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const baseAPI = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export default baseAPI;
