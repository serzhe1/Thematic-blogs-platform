import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "../../store/actions/articles";
import ArticleCard from "./ArticleCard";
import ArticleCardList from "./ArticleCardList";

export default function Home(props) {
  const { articles: articles } = useSelector((state) => state.articles);
  const [justArticles, setJustArticles] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [count, setCount] = useState(false);
  const dispatch = useDispatch();
  const WAIT_TIME = 5000;

  useEffect(() => {
    // const id = setInterval(() => {}, WAIT_TIME);
    dispatch(findAll());
    // return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let news = [];
    let just = [];
    if (articles) {
      articles.forEach((e) => {
        if (e.type) {
          news.push(e);
        } else {
          just.push(e);
        }
      });

      setNewsArticles(news);
      setJustArticles(just);
    }
  }, [articles])

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row justify-content-around">
        <ArticleCardList articles={newsArticles} header={"News"} history={'/'}/>
        <ArticleCardList articles={justArticles} header={"Articles"} history={'/'}/>
      </div>
    </div>
  );
}
