import React from 'react';
import { Link } from 'react-router-dom'

import './form.css';

const CategoryForm = (props) => {

  const { getCategoryName } = props

  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        <Link to="/" className="item">Category Selection:</Link>
      </li>
      <li className="list-group-item no-active">
        <form>
          <div className ="form-group">
            <input type="text"
              className="form-control"
              id="categoryName"
              aria-describedby="emailHelp"
              placeholder="Enter category name" />
          </div>
          <button
             type="button" onClick={ getCategoryName }
             className="btn btn-secondary list">
             <i className="fas fa-plus"></i>
          </button>
        </form>
      </li>
    </ul>
  );
};

export default CategoryForm;
