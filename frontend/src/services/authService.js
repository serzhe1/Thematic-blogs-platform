import axios from "axios";
const API_AUTH_URL = "http://localhost:8080/api/auth";

class AuthService {
  async loggin(usernameOrEmail, password) {
    const response = await axios.post(API_AUTH_URL + "/signin", {
      usernameOrEmail,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, username, email, password) {
    return axios.post(API_AUTH_URL + "/signup", {
      name,
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
