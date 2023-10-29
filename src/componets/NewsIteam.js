import React, { Component } from 'react'

export class NewsIteam extends Component {
  
  render() {
    let {title,description,Imgurl,newurl,author,date}=this.props;
    return (
      <div>
        <div className="card" style={{width: "27rem"}}>
  <img src={Imgurl}/>
  <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p><span class="badge text-bg-success">New</span>
        <p class="card-text"><small class="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newurl} target='_blank' className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsIteam
