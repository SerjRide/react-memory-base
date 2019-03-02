import React from 'react'

import './empty.css'

const Empty = () => {
  return(
    <ul className="list-group ">
      <li className="list-group-item no-active">
        <i className="item">Select a category of questions</i>
      </li>
    </ul>
  )
};

export default Empty;
