import React from 'react';
import { Link } from 'react-router-dom';

import './question-list.css';

import { QuestionData } from '../../service/question-data';

const QuestionList = (props) => {

  const { onQuestionSelect, id, onAddQuestion } = props

  let items = QuestionData[id].map((item, i) => {
    const { question } = item;

    if (i !== 0) {
      return (
        <li className="list-group-item" key={ i }>
          <Link to="/" onClick={ () => onQuestionSelect(i) }>
             { question }
          </Link>
        </li>
      );
    }else return null;
  })

  if (items.length === 1) {
    items = (
      <li className="list-group-item add-ansver">
        <i className="fas fa-plus my"></i>
        <Link to="/" onClick={ onAddQuestion }>
           Add answers
        </Link>
      </li>
    )
  }

  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        <Link to="/" className="item">Choice of question:</Link>
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
