import React from 'react';
import { Link } from 'react-router-dom'
import { QuestionData } from '../../service/question-data';

import './form.css';

const QuestionForm = (props) => {

  const { getNewQuestion, currentCategory } = props

  const name = QuestionData[currentCategory][0].name

  const hideQuestionForm = () => {
    const showObj = document.getElementById('question_list');
    const hideObj = document.getElementById('question_form');
    hideObj.style.display = 'none';
    showObj.style.display = 'block';
  }

  const check = () => {
    const question = document.getElementById('question-form').value
    const answer = document.getElementById('answer-form').value

    if (String(question).length !== 0 && String(answer).length !== 0) {
      getNewQuestion();
    }

    if (String(question).length !== 0) {
      document.getElementById('question-form')
              .classList.remove('warning');
    } else document.getElementById('question-form')
              .className += ' warning'

    if (String(answer).length !== 0) {
      document.getElementById('answer-form')
              .classList.remove('warning')
    } else {
      document.getElementById('answer-form')
                .className += ' warning'
    }

  }

  const resetStyle = (e) => e.target.classList.remove('warning');

  return(
    <ul className="list-group" id="question_form">
      <li className="list-group-item no-active">
        <Link to="/" className="item">Add new question on {name}</Link>
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
                id="question-form" onClick={ (e) => resetStyle(e) }
                aria-describedby="emailHelp"
                placeholder="New question" />
            </div>
            <div className ="form-group question">
              <textarea type="text"
                id="answer-form" onClick={ (e) => resetStyle(e) }
                aria-describedby="emailHelp"
                placeholder="Add answer" />
            </div>
            <div className ="form-group question">
              <button
                type="button" onClick={ check }
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
