import axios from "axios";
import authHeader from "./authHeader";

const API_ARTICLES_URL = "http://localhost:8080/api/articles";

class ArticleService {
  async create(article) {
    const response = await axios.post(
      API_ARTICLES_URL + "/create",
      {
        name: article.name,
        content: article.content,
        author: article.author,
        type: article.type,
        tags: article.tags,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async update(article) {
    const response = await axios.post(
      API_ARTICLES_URL + "/update",
      {
        id: article.id,
        name: article.name,
        content: article.content,
        author: article.author,
        type: article.type,
        tags: article.tags,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async findAllAuthorArticles(id) {
    const response = await axios.get(API_ARTICLES_URL + "/author/" + id);
    return response.data;
  }

  async findSavedArticles(username) {
    const response = await axios.get(
      API_ARTICLES_URL + "/" + username + "/saved",
      { headers: authHeader() }
    );
    return response.data;
  }

  async removeArticle(id) {
    const response = await axios.delete(API_ARTICLES_URL + "/remove/" + id, {
      headers: authHeader(),
    });
    return response.data;
  }

  async deleteSavedArticle(username, id) {
    const response = await axios.delete(
      API_ARTICLES_URL + "/" + username + "/saved/" + id,
      { headers: authHeader() }
    );
    return response.data;
  }

  async findAllArticles(username, id) {
    const response = await axios.delete(
      API_ARTICLES_URL + "/" + username + "/saved/" + id,
      { headers: authHeader() }
    );
    return response.data;
  }

  async findAllByType(type) {
    const response = await axios.get(API_ARTICLES_URL + "/" + type);
    return response.data;
  }

  async findAll() {
    const response = await axios.get(API_ARTICLES_URL + "/");
    return response.data;
  }

  async saveArticle(user_id, article_id) {
    const response = await axios.post(
      API_ARTICLES_URL + "/save",
      {
        user_id,
        article_id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async searchByName(name) {
    const response = await axios.get(
      API_ARTICLES_URL + "/search?search=" + name + "&tags=-1"
    );
    return response.data;
  }

  async searchByAllParams(name, tags) {
    let tagsReqParam = "";
    if (tags.length) {
      tags.forEach((e) => {
        tagsReqParam += "&tags=" + e;
      });
    } else tagsReqParam = "&tags=-1";
    const response = await axios.get(
      API_ARTICLES_URL +
        "/search?search=" +
        name +
        tagsReqParam 
    );
    return response.data;
  }
}

export default new ArticleService();
