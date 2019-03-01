import React from 'react';

import './question-list.css';

const QuestionList = () => {
  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        Choice of question:
      </li>
      <li className="list-group-item">
        Вопрос 1
      </li>
      <li className="list-group-item">
        Вопрос 2
      </li>
      <li className="list-group-item">
        Вопрос 3
      </li>
      <li className="list-group-item">
        Вопрос 4
      </li>
      <li className="list-group-item">
        Вопрос 5
      </li>
    </ul>
  );
};

export default QuestionList;
