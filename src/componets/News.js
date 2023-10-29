import React, { Component } from 'react'
import NewsIteam from './NewsIteam'
import { wait } from '@testing-library/user-event/dist/utils';
import Spiner from './Spiner';
import PropTypes from 'prop-types';

export class News extends Component {
 
  static defaultProps = {
    country: 'stranger',
    pageSize:10,
    category:'general'
  }
  static defaultProps = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1
    }
    document.title=`${this.props.category}-TopNews` ;
  }
  async componentDidMount(){
    
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b70da6f878a4d8fa0a7ebe7e1e50b41&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    console.log(parseData);
    this.setState({articles:parseData.articles,totalResults:parseData.totalResults,loading:false});
  }
  handelnext=async()=>{
    this.props.setProgress(10)
    if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b70da6f878a4d8fa0a7ebe7e1e50b41&page= ${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    this.props.setProgress(50)
    this.setState({loading:false});
    this.setState({
      page:this.state.page+1,
      articles:parseData.articles
    })
    this.props.setProgress(100)
    }
  }
  handelprev=async()=>{
    this.props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b70da6f878a4d8fa0a7ebe7e1e50b41&page= ${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    this.props.setProgress(50)
    this.setState({loading:true});
   
    this.setState({
      page:this.state.page-1,
      articles:parseData.articles
    })
    this.props.setProgress(100)

  }
 
  render() {
    return (
      <div className="containor my-3">
        <h1 className="text-center" style={{marginTop:"56px"}}>This is the top News of {this.props.category} </h1>
        {this.state.loading&&<Spiner/>}
       
          <div className="row">
         {!this.state.loading&&this.state.articles.map((element)=>{
               return    <div className="col-md-4" key={element.url}>
               <NewsIteam  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,88):""} Imgurl={element.urlToImage} newurl={element.url} author={element.author} date={element.publishedAt} className="card-img-top" alt="..."/>
             </div>
         })}
           
        </div>
        <div className="contanior d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelprev}>	&larr;Previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelnext}>Next&rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News
