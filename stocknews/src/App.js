import React from 'react'
import style from "./index.module.css"
import IconButton from '@material-ui/core/IconButton';
import { FaSearch } from 'react-icons/fa';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      news: []
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchStockNews(this.state.value); 
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  // function used in mapping to create and transform the news articles into cards
  newsCreator = (props) => {
    return(
      <a href = {props['url']} className = {style.newsArticle}>
        <img src = {props['image']} width = '200' height = '100'></img>
        <h3>{props['title']}</h3>
        <p className = {style.news_Summary}>{props['summary']}</p>
      </a>
    )
  }

  // This function fetches  news about stock that is inputed
  fetchStockNews = (props) => {
    var tempNewsArray = []
    const API_NEWS_KEY = 'dSgyySKSrTp44mgcX443KL8bxVv5vWMg'
    let API_CALLS = 'https://api.polygon.io/v1/meta/symbols/'+ props+'/news?perpage=12&page=1&apiKey=' + API_NEWS_KEY
    fetch(API_CALLS)
    .then(response => response.json())
    .then(
      data => {
      for(var index in data) {
        let newsArticle = {
          title: data[index]['title'], 
          summary: data[index]['summary'], 
          url: data[index]['url'], 
          image: data[index]['image']
        }
        tempNewsArray.push(newsArticle);
      }
      this.setState({
        news: tempNewsArray
      })
      }
    )
  }

  render() {
    return  (
      <div>
        {/* The header for the webPage */}
        <div 
          className = {style.header}>
        </div>
        <div>
          {/* Form that allows user to fetch a stock */}
          <form className = {style.searchStockBackground} onSubmit = {this.handleSubmit}>
            <input 
              placeholder = "Type in a ticker e.g. IBM" 
              type = "text" 
              className = {style.stockSearch} 
              value = {this.state.value} 
              onChange = {this.handleChange}>
            </input>

            <IconButton 
              className = {style.magnifying_glass} 
              type = 'submit' 
              value = "Submit"><FaSearch />
            </IconButton> 
          </form>
        </div>

        <div className = {style.newsArticleWrapper}>
          {this.state.news.map(this.newsCreator)}
        </div>
    </div>
    );

  }
  
}

export default App;
