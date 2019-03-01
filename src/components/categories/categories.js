import React from 'react';

import './categories.css';

const Categories = () => {
  return(
    <ul className="list-group">
      <li className="list-group-item no-active">
        Category Selection:
      </li>
      <li className="list-group-item">
        HTML
      </li>
      <li className="list-group-item">
        CSS
      </li>
      <li className="list-group-item">
        JavaScript
      </li>
      <li className="list-group-item">
        React
      </li>
      <li className="list-group-item">
        Other
      </li>
    </ul>
  );
};

export default Categories;
