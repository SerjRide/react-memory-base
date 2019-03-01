import React from 'react';

import './categories.css';

import QuestionData from '../../service/question-data';

const Categories = (props) => {

  const { onCategorySelect } = props;

  const items = QuestionData.map((item, i) => {
    const { name } = item[0], id = i;
    return (
      <li className="list-group-item"
        key = { id }
        onClick={ () => onCategorySelect(id) }>
        { name }
      </li>
    );
  });

  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        Category Selection:
      </li>
      {items}
    </ul>
  );
};

export default Categories;
