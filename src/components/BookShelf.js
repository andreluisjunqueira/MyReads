import React from 'react';
import AddButton from './AddButton';
import PropTypes from 'prop-types';

const BookShelf = (props)=>{
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>{ props.title }</h1>
            </div>
            <div className="list-books-content">
                <div>
                    { props.children }
                </div>
            </div>
            <AddButton/>
        </div>
    )
}

BookShelf.propTypes = {
    title : PropTypes.string.isRequired
}

export default BookShelf;