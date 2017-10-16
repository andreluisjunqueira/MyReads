import React from 'react';
import PropTypes from 'prop-types';

const Book = (props)=>{
    const { book } = props;
    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                    <select name={book.title} defaultValue={book.shelf||'none'} onChange={({target})=>props.onChangeShelf(target.value, {id : book.id})}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors&&book.authors.map(author=>author)}</div>
        </div>
    )
}

Book.defaultProps = {
    onChangeShelf : ()=>{}
}

Book.propTypes = {
    book : PropTypes.object.isRequired,
    onChangeShelf : PropTypes.func.isRequired
}

export default Book;