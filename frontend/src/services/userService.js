import axios from "axios";
import authHeader from "./authHeader";

const API_USER_URL = "http://localhost:8080/api/user";

class UserServcie {
  getUserInfo() {
    // return axios.get(API_ACC_TEST_URL + "/userData/" + localStorage.getItem('user').userId);
  }

  // async editUser(user) {
  //   axios.post(API_USER_URL + '/edit', {user}, {authHeader})
  // }

  async editUser(id, name, username, email, password) {
    const response = await axios.post(
      API_USER_URL + "/edit",
      {
        id,
        name,
        username,
        email,
        password,
      },
      { headers: authHeader() }
    );
    console.log(response.data);
    return response.data;
  }
}

export default new UserServcie();
