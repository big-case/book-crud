import axios from "axios";

// axios create and api url
export default axios.create({
  baseURL: "http://localhost:3003/",
  headers: {
    "Content-type": "application/json"
  }
});
