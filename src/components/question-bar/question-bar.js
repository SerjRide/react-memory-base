import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './question-bar.css';

export default class QuestionBar extends Component  {

  componentDidUpdate(prevProps) {
    const { currentQuestion } = this.props
    if (currentQuestion !== prevProps.currentQuestion) {
      document.getElementById('questionNumber').value = currentQuestion
      document.getElementById('answer').focus()
    }
  };

  render(){
    const { currentQuestion , onPrevClick, onNextClick, onQuestionClick,
     onAddQuestion, onBookmarksClick, onFirstClick, onEnterSelect,
     onLastClick, onHelpClick, onDelClick, onBackToList,
      categoryName } = this.props;

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active">
          <Link to="/" className="item crumb"
            onClick={ onBackToList }>
            <i className="fas fa-chevron-left crumb"></i>{ categoryName }
          </Link>
        </li>
      </ul>
      <div className="btn-group btn-group-md"
           role="group"
           aria-label="Basic example">
        <button
           type="button" onClick={ onAddQuestion }
           className="btn btn-secondary"
           data-title="Add new question">
           <i className="fas fa-plus"></i>
        </button>
        <button
           type="button" onClick={ onBookmarksClick }
           className="btn btn-secondary"
           data-title="Add to bookmarks">
           <i className="far fa-bookmark"></i>
        </button>
        <button
           type="button" onClick={ onFirstClick }
           className="btn btn-secondary"
           data-title="Go to the first question">
           <i className="fas fa-angle-double-left"></i>
        </button>
        <button
           type="button" onClick={ onPrevClick }
           className="btn btn-secondary"
           data-title="Previous question">
           <i className="fas fa-angle-left"></i>
        </button>
        <div className="input-group">
          <input type="number" onClick={ onQuestionClick }
            className="form-control" id="questionNumber"
            onKeyDown={ onEnterSelect }

            defaultValue={ currentQuestion }

            aria-label="Input group example"
            aria-describedby="btnGroupAddon"/>
        </div>
        <button id="onNextClick"
           type="button" onClick={ onNextClick }
           className="btn btn-secondary"
           data-title="Next question">
           <i className="fas fa-angle-right"></i>
        </button>
        <button
           type="button" onClick={ onLastClick }
           className="btn btn-secondary"
           data-title="Go to the last question">
           <i className="fas fa-angle-double-right"></i>
        </button>
        <button
           type="button" onClick={ onHelpClick }
           className="btn btn-secondary"
           data-title="Show answer">
           <i className="fas fa-question"></i>
        </button>
        <button
           type="button" onClick={ onDelClick }
           className="btn btn-secondary"
           data-title="Delete question">
           <i className="far fa-trash-alt"></i>
        </button>
      </div>
      </React.Fragment>
    )
  }

};
