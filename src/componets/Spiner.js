import React, { Component } from 'react'
import  Search from './Search.gif';

export class Spiner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Search} alt="Search" />
      </div>
    )
  }
}

export default Spiner
