import axios from "axios";
import authHeader from "./authHeader";

const API_ACC_TEST_URL = "http://localhost:8080/api/acc/test";

class UserServcie {
  getUserInfo() {
    return axios.get(API_ACC_TEST_URL + "/userData/" + localStorage.getItem('user').userId);
  }
}