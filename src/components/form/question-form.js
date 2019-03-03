import React from 'react';
import { Link } from 'react-router-dom'

import './form.css';

const QuestionForm = (props) => {

  const { getNewQuestion } = props

  const hideQuestionForm = () => {
    const showObj = document.getElementById('question_list');
    const hideObj = document.getElementById('question_form');
    hideObj.style.display = 'none';
    showObj.style.display = 'block';
  }

  return(
    <ul className="list-group" id="question_form">
      <li className="list-group-item no-active">
        <Link to="/" className="item">Add new question:</Link>
        <button
           type="button" onClick={ hideQuestionForm }
           className="btn btn-secondary list head">
           <i className="fas fa-chevron-up"></i>
        </button>
      </li>
      <li className="list-group-item no-active">
        <form>
          <div className="form-row">
            <div className ="form-group question">
              <textarea type="text"
                id="question-form"
                aria-describedby="emailHelp"
                placeholder="New question" />
            </div>
            <div className ="form-group question">
              <textarea type="text"
                id="answer-form"
                aria-describedby="emailHelp"
                placeholder="Add answer" />
            </div>
            <div className ="form-group question">
              <button
                type="button" onClick={ getNewQuestion }
                className="btn btn-success btn-sm btn-block">
                Add
              </button>
            </div>
          </div>
        </form>
      </li>
    </ul>
  );
};

export default QuestionForm;
