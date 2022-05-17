import ArticleCard from "./ArticleCard";

export default function ArticleCardList(props) {
  const cardList = () => {
    if (props.articles) {
      return props.articles.map((article, index) => {
        return <ArticleCard article={article} key={index} history={props.history}/>;
      });
    } else return;
  };

  return (
    <div className="mt-5 col-md-6">
      <h4>{props.header}</h4>
      {cardList()}
    </div>
  );
}
