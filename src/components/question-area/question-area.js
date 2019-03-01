import React from 'react';

import './question-area.css';

const QuestionArea = () => {
  return(
    <div className='question-area'>
      <textarea disabled placeholder="Question"></textarea>
      <textarea placeholder="Answer"></textarea>
      <button
        type="button"
        className="btn btn-success btn-sm btn-block">
        Apply
      </button>
    </div>
  )
};

export default QuestionArea;
