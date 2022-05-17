import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteSavedArticle,
  findSavedArticles,
  getAuthorArticles,
  removeArticle,
} from "../store/actions/articles";

export default function ListArticles() {
  const { articles } = useSelector((state) => state.articles);
  const location = useLocation();
  const dispatch = useDispatch();
  const [header, setHeader] = useState("a neeeet");

  useEffect(() => {
    if (location.state.myArticles) {
      dispatch(getAuthorArticles(location.state.id));
      setHeader("My Articles");
    } else {
      dispatch(findSavedArticles(location.state.username));
      setHeader("Saved Articles");
    }
  }, []);

  const navigate = useNavigate();

  const isNews = (isNews) => {
    if (isNews) {
      return <span>News</span>;
    } else {
      return <span>Article</span>;
    }
  };

  const listTags = (id) => {
    if (articles[id].tags) {
      return articles[id].tags.map((tag, index) => {
        return (
          <Dropdown.Item key={index}>
            {" "}
            <div style={{ zIndex: "100" }}>{tag.name}</div>
          </Dropdown.Item>
        );
      });
    } else {
      return <Dropdown.Item>Empty</Dropdown.Item>;
    }
  };
  const displayEditButton = (index) => {
    if (location.state.myArticles) {
      return (
        <td>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              navigate("/article/new", {
                state: {
                  edit: true,
                  content: articles[index].content,
                  name: articles[index].name,
                  isNews: articles[index].type,
                  tags: articles[index].tags,
                  id: articles[index].id,
                },
              });
            }}
          >
            Edit
          </button>
        </td>
      );
    } else return;
  };

  const remove = (id) => {
    if (location.state.myArticles) {
      dispatch(removeArticle(id));
    } else {
      dispatch(deleteSavedArticle(location.state.username, id));
    }

      window.location.reload();
  };

  const listTr = () => {
    if (articles) {
      return articles.map((article, index) => {
        return (
          <tr class="table-light" key={index}>
            <td>{article.author.name}</td>
            <td>
              {" "}
              <button
                type="button"
                class="btn btn-light"
                onClick={() => {
                  navigate("/article", { state: { article: article, history: '/profile' } });
                }}
              >
                {article.name}
              </button>
            </td>
            <td>
              <td>{isNews(article.type)}</td>
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Tags
                </Dropdown.Toggle>

                <Dropdown.Menu>{listTags(index)}</Dropdown.Menu>
              </Dropdown>
            </td>
            {displayEditButton(index)}
            <td>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  remove(article.id);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        );
      });
    } else return "empty";
  };

  return (
    <div className="container mt-5">
      <div className="mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 mt-5">
            <div class="card border-primary mb-3">
              <div class="card-header text-center">{header}</div>
              <div class="card-body">
                <table class="table table-hover">
                  <thead className="text-center">
                    <tr>
                      <th scope="col">Author</th>
                      <th scope="col">Name (Click on the name to read)</th>
                      <th scope="col">Type</th>
                      <th scope="col">Tags</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">{listTr()}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-1 mt-5">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                const path = "/profile";
                navigate(path);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
