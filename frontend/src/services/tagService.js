import axios from "axios";

const API_TAGS_URL = "http://localhost:8080/api/tags";

class TagServcie {
  async findAll() {
    const response = await axios.get(API_TAGS_URL + "/");
    return response.data;
  }
}

export default new TagServcie();
