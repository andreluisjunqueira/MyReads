import React from 'react';
import PropTypes from 'prop-types';

const Shelf = (props)=>{
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { props.renderBooks() }
                </ol>
            </div>
      </div>
    )
}

Shelf.defaultProps = {
    renderBooks : ()=>{}
}

Shelf.propTypes = {
    renderBooks : PropTypes.func.isRequired,
    shelfTitle : PropTypes.string.isRequired
}

export default Shelf;