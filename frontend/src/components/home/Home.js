import React, { Component } from "react";

export default function Home(props) {
  return (
    <div className="container">
      <figure>
        <blockquote className="blockquote">
          <p className="mb-0">
            Это просто домашняя страница, тут будет что-то, но потом
          </p>
        </blockquote>
        <figcaption className="blockquote-footer">
          С уважением, <cite title="Source Title">поеш говна</cite>
        </figcaption>
      </figure>
    </div>
  );
}
