import HTMLReactParser from "html-react-parser";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReadArticle(props) {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <div className="card border-primary mt-5">
            <div className="card-header">
              {location.state.article.author.name}
            </div>
            <div className="card-body">
              <div className="card-text">
                <div>{HTMLReactParser(location.state.article.content)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1 mt-5">
          <div className="btn-group btn-group-lg">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (isLoggedIn && location.state.history === '/profile') navigate("/profile");
                else  navigate(location.state.history);
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
