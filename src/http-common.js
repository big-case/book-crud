import axios from "axios";
const BASE_URL = 'http://localhost:3003/';

// axios create and api url
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});