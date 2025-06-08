import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }

  static propTypes = {  
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      loadingNext: false, // New state variable to track loading due to Next button click
      page: 1,
      totalArticles: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async fetchNews(page = 1) {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c16ab17af4ae4d3b81af0a6dc9fb8a90&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
      loadingNext: false, // Ensure loadingNext is set to false after fetching data
      loadingPrev: false // Ensure loadingPrev is set to false after fetching data
    });
  }

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.setState({ loadingPrev: true });
      await this.fetchNews(this.state.page - 1);
      this.setState((prevState) => ({ page: prevState.page - 1 }));
    }
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / this.props.pageSize)) {
      this.setState({ loadingNext: true }); // Set loadingNext to true when "Next" is clicked
      await this.fetchNews(this.state.page + 1);
      this.setState((prevState) => ({ page: prevState.page + 1 }));
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines</h1>
        
        {this.state.loadingNext || this.state.loadingPrev? ( // Display spinner only when loadingNext is true
          <Spinner />
        ) : (
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            ))}
          </div>
        )}

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
