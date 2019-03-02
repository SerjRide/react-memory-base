import React from 'react';

import './question-list.css';

import { QuestionData } from '../../service/question-data';

const QuestionList = (props) => {

  const { onQuestionSelect, id, onAddQuestion } = props

  let items = QuestionData[id].map((item, i) => {
    const { question } = item;

    if (i !== 0) {
      return (
        <li className="list-group-item"
          key={ i }
          onClick={ () => onQuestionSelect(i) }>
          { question }
        </li>
      );
    }else return null;
  })

  if (items.length === 1) {
    items = (
      <li className="list-group-item add-ansver"
        onClick={ onAddQuestion }>
        <i className="fas fa-plus"></i>
          Add answers
      </li>
    )
  }

  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        <i className="item">Choice of question:</i>
        <button
           type="button"
           className="btn btn-secondary">
           <i className="fas fa-plus"></i>
        </button>
      </li>
      { items }
    </ul>
  );
};

export default QuestionList;
