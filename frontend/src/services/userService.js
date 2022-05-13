import axios from "axios";
import authHeader from "./authHeader";

const API_USER_URL = "http://localhost:8080/api/user";

class UserServcie {
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
    return response.data;
  }
}

export default new UserServcie();
