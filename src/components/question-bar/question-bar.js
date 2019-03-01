import React from 'react';

import './question-bar.css';

const QuestionBar = () => {
  return(
    <div className="btn-group btn-group-md"
         role="group"
         aria-label="Basic example">
      <button
         type="button"
         className="btn btn-secondary">
         <i className="fas fa-plus"></i>
      </button>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="far fa-bookmark"></i>
      </button>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="fas fa-angle-double-left"></i>
      </button>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="fas fa-angle-left"></i>
      </button>
      <div className="input-group">
        <input type="number"
          className="form-control"
          placeholder="1"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"/>
      </div>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="fas fa-angle-right"></i>
      </button>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="fas fa-angle-double-right"></i>
      </button>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="fas fa-question"></i>
      </button>
      <button
         type="button"
         className="btn btn-secondary">
         <i className="far fa-trash-alt"></i>
      </button>
    </div>
  )
};

export default QuestionBar;
