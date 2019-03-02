import React from 'react';
import { Link } from 'react-router-dom';

import './empty.css'

const Empty = () => {
  return(
    <ul className="list-group ">
      <li className="list-group-item no-active">
        <Link to="/">Select a category of questions</Link>
      </li>
    </ul>
  )
};

export default Empty;
