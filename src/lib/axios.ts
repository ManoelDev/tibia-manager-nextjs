import axios from "axios";
const BASE_URL = "http://localhotshot:3000";

export default axios.create({ baseURL: BASE_URL, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });

export { BASE_URL }