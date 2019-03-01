import React from 'react';

import './question-list.css';

import QuestionData from '../../service/question-data';

const QuestionList = (props) => {

  const { onQuestionSelect, id } = props

  const items = QuestionData[id].map((item, i) => {
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

  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        Choice of question:
      </li>
      { items }
    </ul>
  );
};

export default QuestionList;
