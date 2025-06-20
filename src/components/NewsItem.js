import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtXTjAddWxgXx6LzITJaBIKyI0bLUwzRlQBQ&usqp=CAU"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
