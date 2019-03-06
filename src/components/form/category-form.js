import React from 'react';
import { Link } from 'react-router-dom'

import './form.css';

const CategoryForm = (props) => {

  const { getCategoryName } = props

  const check = () => {
    const { value } = document.getElementById('categoryName')

    if (String(value).length !== 0) {
      getCategoryName();
      document.getElementById('categoryName')
              .classList.remove('warning')
    } else document.getElementById('categoryName')
              .className += ' warning'

  }

  const resetStyle = () => document.getElementById('categoryName')
                                   .classList.remove('warning')

  const onKeyEnter = (e,func) => {
    if (e.which === 13) {
      e.preventDefault();
      func();
    }
  }

  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        <Link to="/" className="item">Category Selection:</Link>
      </li>
      <li className="list-group-item no-active">
        <form>
          <div className ="form-group">
            <input type="text" onClick={ resetStyle }
              onKeyDown={ (e) => onKeyEnter(e,check) }
              className="form-control"
              id="categoryName"
              placeholder="Enter category name" />
          </div>
          <button
             type="button" onClick={ check }
             className="btn btn-secondary list"
             data-title="Add category">
             <i className="fas fa-plus"></i>
          </button>
        </form>
      </li>
    </ul>
  );
};

export default CategoryForm;
