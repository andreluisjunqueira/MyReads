import React, { Component } from 'react';

import Book from './Book';
import Shelf from './Shelf';
import { getAll, update } from '../services/BooksAPI';
import BookShelf from './BookShelf';

  class Home extends Component{

    state = {
      books : []
    }

    componentWillMount() {
      this._loadBooks();
    }

    _loadBooks(){
        getAll()
        .then(books=>this.setState({books}))
        .catch((err)=>{})
    }

    _onChangeShelf(shelf, bookId){
        update(bookId, shelf).then(()=>this._loadBooks());
    }

    _renderBooks(shelf){
      const { books } = this.state; 

      return books.filter((book)=>book.shelf === shelf)
        .map((book, index)=>{
          return(
            <li key={index}>
                <Book 
                   book={book}
                   onChangeShelf={this._onChangeShelf.bind(this)}
                />
            </li>
          )
        });
  }

    render(){
      return(
        <BookShelf title='My Reads'>
            <Shelf  
              shelfTitle="Currently Reading"
              renderBooks={()=>this._renderBooks('currentlyReading')}
            />
            <Shelf 
              shelfTitle="Want to read"
              renderBooks={()=>this._renderBooks('wantToRead')}
            />
            <Shelf 
              shelfTitle="Read"
              renderBooks={()=>this._renderBooks('read')}
            />
        </BookShelf>
      )
  }
}

export default Home;