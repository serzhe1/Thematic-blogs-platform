import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveArticle } from "../../store/actions/articles";

export default function ArticleCard(props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [successMessage, setSuccessMessage] = useState(false);
  const [unLoggedInMessage, setUnLoggedInMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const article = props.article;

  const typeToName = () => {
    if (article.type) {
      return <span>News</span>;
    } else {
      return <span>Article</span>;
    }
  };

  const read = () => {
    navigate("/article", { state: { article: article, history: props.history} });
  };

  const save = () => {
    if (isLoggedIn) {
      dispatch(saveArticle(currentUser.user.id, article.id));
      setSuccessMessage(true);
    } else {
      setUnLoggedInMessage(true);
    }
  };

  const disableSaveButton = () => {
    if (currentUser) {
      if (currentUser.user.id === article.author.id) return " disabled";
    } else return "";
  };

  const success = () => {
    if (successMessage) {
      return (
        <div class="alert alert-dismissible alert-success mt-2">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            onClick={() => {
              setSuccessMessage(false);
            }}
          ></button>
          <strong>You successfully saved the article </strong>
        </div>
      );
    }
  };

  const unLoggedIn = () => {
    if (unLoggedInMessage) {
      return (
        <div class="alert alert-dismissible alert-danger mt-2">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            onClick={() => {
              setUnLoggedInMessage(false);
            }}
          ></button>
          <strong>
            <Link to={"/login"} class="alert-link">
              LogIn
            </Link>{" "}
          </strong>
          and try again.
        </div>
      );
    }
  };
  return (
    <div>
      <div class="card text-white bg-primary mb-3">
        <div class="card-header">{typeToName()}</div>
        <div class="card-body">
          <h4 class="card-title">{article.name}</h4>
          <p class="card-text">By {article.author.name}</p>
          <div>
            tags:
            <ul>
              {article.tags.map((tag, i) => (
                <li key={i}>{tag.name}</li>
              ))}
            </ul>
          </div>
          <div className="row justify-content-between">
            <button
              type="button"
              class="btn btn-secondary col-md-5"
              onClick={read}
            >
              Read
            </button>
            <button
              type="button"
              class={"btn btn-success col-md-5 " + disableSaveButton()}
              onClick={save}
            >
              Save
            </button>
          </div>
          {success()}
          {unLoggedIn()}
        </div>
      </div>
    </div>
  );
}
