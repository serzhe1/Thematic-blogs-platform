import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { findAll } from "../store/actions/tags";
import { createArticle, update } from "../store/actions/articles";
var stateFromHTML = require("draft-js-import-html").stateFromHTML;

export default function NewArticle() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const { user: currentUser } = useSelector((state) => state.auth);

  const [articleName, setArticleName] = useState("");
  const { tags: tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const location = useLocation();

  const [tagsInfo, setTagsInfo] = useState({
    isChecked: [],
  });

  const [isNews, setIsNews] = useState(false);

  useEffect(() => {
    dispatch(findAll());
    if (location.state.edit) {
      setEditorState(
        EditorState.createWithContent(stateFromHTML(location.state.content))
      );

      setArticleName(location.state.name);
      setIsNews(location.state.isNews);
      const tmp = [];
      location.state.tags.forEach((element) => {
        tmp.push(element.id);
      });
      setTagsInfo({
        isChecked: tmp,
      });
    }
  }, []);

  const onChangeChekede = (e) => {
    const { value, checked } = e.target;
    const { isChecked } = tagsInfo;


    if (checked) {
      setTagsInfo({
        isChecked: [...isChecked, value],
      });
    } else {
      setTagsInfo({
        isChecked: isChecked.filter((e) => e !== value),
      });
    }
  };

  const [accordion, setAccordion] = useState(false);

  const changeStateAccordion = () => {
    setAccordion(!accordion);
  };

  const showTags = () => {
    if (accordion) return "accordion-collapse collapse show";
    else return "accordion-collapse collapse";
  };

  const checkedValue = (index) => {
    if (tagsInfo.isChecked.includes(index)) return true;
    else return false;
  };

  const listTags = () => {
    if (tags) {
      return tags.map((tag, index) => {
        return (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value={tag.id}
              defaultChecked={checkedValue(tag.id)}
              onChange={onChangeChekede}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {tag.name}
            </label>
          </div>
        );
      });
    } else return "empty";
  };

  const onChangeName = (e) => {
    setArticleName(e.target.value);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const submit = () => {
    const article = {
      name: articleName,
      content: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      author: currentUser.user.id,
      type: isNews,
      tags: tagsInfo.isChecked,
    };
    dispatch(createArticle(article)).then(() => {
      const path = "/profile";
      navigate(path);
    });
  };
  const edit = () => {
    const article = {
      id: location.state.id,
      name: articleName,
      content: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      author: currentUser.user.id,
      type: isNews,
      tags: tagsInfo.isChecked,
    };
    dispatch(update(article)).then(() => {
      const path = "/profile";
      navigate(path);
    });
  };

  const displayEditCreateButton = () => {
    if (location.state.edit) {
      return (
        <div className="col-md-1">
          <button type="button" class="btn btn-success" onClick={edit}>
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <div className="col-md-1">
          <button type="button" class="btn btn-success" onClick={submit}>
            Create
          </button>
        </div>
      );
    }
  };
  return (
    <div className="container mt-5">
      <form>
        <div className="row justify-content-between">
          <div className="col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label mt-4">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              defaultValue={articleName}
              onChange={onChangeName}
            />
          </div>
          <div className="col-md-4 mt-5">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                    onClick={changeStateAccordion}
                  >
                    Tags
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className={showTags()}
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">{listTags()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <fieldset className="col-md-2">
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                value={isNews}
                checked={isNews}
                onChange={() => {
                  setIsNews(!isNews);
                }}
              />
              <label
                className="form-check-label col"
                htmlFor="flexSwitchCheckDefault"
              >
                News section
              </label>
            </div>
          </fieldset>
        </div>
      </form>
      <div
        style={{
          border: "1px solid #5bc0de",
          padding: "2px",
          minHeight: "400px",
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />{" "}
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-1">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              const path = "/profile";
              navigate(path);
            }}
          >
            Cancel
          </button>
        </div>
        {displayEditCreateButton()}
      </div>
    </div>
  );
}
