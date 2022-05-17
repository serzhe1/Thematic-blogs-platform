import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from "../home/Home";
import Profile from "../account/Profile";
import Login from "../account/Login";
import Register from "../account/Register";
import ProfileSettings from "../account/Settings";
import NewArticle from "../../articles/NewArticle";
import ReadArticle from "../../articles/ReadArticle";
import ListArticles from "../../articles/ArticlesList";
import Search from "../home/Search";
import { useDispatch } from "react-redux";
import { searchByName } from "../../store/actions/articles";
export default function Navbar(props) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
          <Link class="navbar-brand" to={"/"}>
            <img
              id="MDB-logo"
              src="https://icons-for-free.com/download-icon-article+data+document+file+files+newspaper+office+paper-1320185653273206420_512.png"
              alt="MDB Logo"
              draggable="false"
              height="45"
            />
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex align-items-center w-100 form-search">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
              <button
                className="btn"
                onClick={() => {
                  dispatch(searchByName(search));
                }}
              >
                <Link to={"/article/search"}>
                  <img
                    id="MDB-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_search-ltr.svg/1200px-OOjs_UI_icon_search-ltr.svg.png"
                    alt="MDB Logo"
                    draggable="false"
                    height="30"
                  />
                </Link>
              </button>
            </form>

            <ul class="navbar-nav ms-3">
              <li class="nav-item me-3">
                <Link class="nav-link d-flex align-items-center" to={"/"}>
                  Home
                </Link>
              </li>
  
              <li class="nav-item" style={{ width: "65px" }}>
                <Link
                  class="nav-link d-flex align-items-center"
                  to={"/profile"}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/article/new" element={<NewArticle />} />
        <Route path="/article" element={<ReadArticle />} />
        <Route path="/article/my" element={<ListArticles />} />
        <Route path="/article/saved" element={<ListArticles />} />
        <Route path="/article/search" element={<Search search={search} />} />
      </Routes>
    </Router>
  );
}
