import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByAllParams, searchByName } from "../../store/actions/articles";
import { findAll } from "../../store/actions/tags";
import ArticleCardList from "./ArticleCardList";

export default function Search(props) {
  const [articleName, setArticleName] = useState(props.search);
  const { tags: tags } = useSelector((state) => state.tags);
  const { articles: articles } = useSelector((state) => state.articles);
  const [noFound, setNoFound] = useState('');
  const dispatch = useDispatch();

  const [tagsInfo, setTagsInfo] = useState({
    isChecked: [],
  });

  useEffect(() => {
    dispatch(findAll());
    dispatch(searchByName(props.search));
  }, []);

  useEffect(() => {
    setArticleName(props.search);
  }, [props.search]);

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

  const handleSearch = () => {
    dispatch(searchByAllParams(articleName, tagsInfo.isChecked));
  };

  const noFoundMessage = () => {
    if (articles && !articles.length) {
      return <h3>No results found for your search</h3>;
    }
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <form>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <label htmlFor="exampleInputPassword1" className="form-label mt-4">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              defaultValue={articleName}
              onChange={onChangeName}
              style={{ borderColor: "#2c3f51" }}
            />
          </div>
          <div className="accordion col-4 mt-5" id="accordionExample">
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
          <div className="row mt-2 justify-content-end">
            <button
              type="button"
              class="btn btn-primary col-md-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <div className="row justify-content-center">
        {noFoundMessage()}
        <ArticleCardList articles={articles} history={'/article/search'}/>
      </div>
    </div>
  );
}
