
import './App.css';

import React, { Component } from 'react'
import NavBar from './componets/NavBar';
import News from './componets/News';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <NavBar/> 
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
        <News setProgress={this.setProgress} pageSize={10} country="in" category="general"/>
      </div>
    )
  }
}
