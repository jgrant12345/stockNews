import React from 'react'
import style from "./index.module.css"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      news: []
    }
  }
  handleSubmit = (event) => {
    console.log("this was clicked");
    event.preventDefault();
    this.fetchStockNews(this.state.value);
    
    
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
   
   
    
  }

  newsCreator = (props) =>{
    return(
      <a href = {props['summary']} className = {style.newsArticle}>
        <img src = {props['image']} width = '200' height = '100'></img>
        <h3>{props['title']}</h3>
    <p>{props['summary']}</p>
      </a>
    )
   
  }


  fetchStockNews = (props) => {
    var tempNewsArray = []
    const API_NEWS_KEY = 'dSgyySKSrTp44mgcX443KL8bxVv5vWMg'
    let API_CALLS = 'https://api.polygon.io/v1/meta/symbols/'+ props+'/news?perpage=5&page=1&apiKey=' + API_NEWS_KEY
    fetch(API_CALLS)
    .then(response => response.json())
     .then(
      data => {
      console.log(data);
      for(var index in data){
        let newsArticle = {title: data[index]['title'], 
        summary: data[index]['summary'], url: data[index]['url'], image: data[index]['image']}
       
      tempNewsArray.push(newsArticle)
      }
      this.setState({
        news: tempNewsArray
      })
  
       }
     )
      }

  render(){
    return (
   <div>
     <h1>news</h1>
     <form onSubmit = {this.handleSubmit}>
       <input type = "text" value = {this.state.value} onC hange = {this.handleChange}></input>
       <input type = 'submit' value = "Submit"></input>
     </form>
     
    <div className = {style.newsArticleWrapper}>{this.state.news.map(this.newsCreator)}</div>
   </div>
      );

  }
  
}

export default App;
