import React from 'react'
import '../App.css'
import { Route } from 'react-router-dom';

import Home from './Home';
import Search from './Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/search" render={({history})=><Search history={history}/>}/>
      </div>
    )
  }
}

export default BooksApp
