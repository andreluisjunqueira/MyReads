import React, { Component } from 'react';
import { getAll, search, update } from '../services/BooksAPI';
import Book from './Book';
import debounce from '../Utils/debounce';

export default class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            booksStatus :{},
            books : [],
            loading : false,
            searching : false
        }
        this.t=null;
    }

    componentWillMount() {
        getAll().then((books)=>{
            const booksStatus={};
            books.forEach(({id, shelf})=>booksStatus[id]=shelf);
           this.setState({booksStatus});
        })    
    }

    _searchBooks(term){

        if(!term)
            return this._loadBooks([],false);

        this.setState({loading:true});
        
        search(term).then((books)=>{
            if(books.error) books=[];
            this._loadBooks(books);
        });
    }

    _loadBooks(books=[], searching=true){
        this.setState({books, loading:false, searching});
    }

    _onChangeShelf(shelf, bookId){
        update(bookId, shelf)
    }

    _renderBooks(){
        const { books, booksStatus } = this.state;

        return books.map((book, index)=>{
            book['shelf'] = booksStatus[book.id];
            return(
                <li key={index}>
                    <Book 
                        book={book}
                        onChangeShelf={ this._onChangeShelf.bind(this) }
                    />
                </li>
            )
        })
    }
    _voltar(){
        this.props.history.push('/');
    }

    _showLoading(){
        const {loading, books, searching} = this.state
        let msg = null
        if(loading)
            msg = <div style={{fontSize:18+'px', fontWeight:'bold', width:'100%', textAlign:'center'}}>Searching books wait ...</div>;
        else if(!loading && books.length < 1 && searching)
            msg = <div style={{fontSize:18+'px', fontWeight:'bold', width:'100%', textAlign:'center'}}>No books found</div>;
        
        return msg;
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <a onClick={()=>this._voltar()} className="close-search" >Close</a>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={({target})=>debounce(this._searchBooks.bind(this,target.value), 800)}/>
                </div>
                </div>
                <div className="search-books-results">
                    { this._showLoading() }
                <ol className="books-grid">
                    { this._renderBooks() }
                </ol>
                </div>
            </div>
        )
    }
}