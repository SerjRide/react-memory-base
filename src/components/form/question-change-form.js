import React from 'react';
import { Link } from 'react-router-dom'

import './form.css';

const QuestionChangeForm = (props) => {

  const hideQuestionForm = () => {
    const showObj = document.getElementById('question_list');
    const hideObj = document.getElementById('question_edit');
    hideObj.style.display = 'none';
    showObj.style.display = 'block';
  }

  const check = () => {
    const question = document.getElementById('question-edit').value
    const answer = document.getElementById('answer-edit').value

    if (String(question).length !== 0 && String(answer).length !== 0) {
      const questionId = document.getElementById("hidden_id").value
      props.editQuestion()
      props.didQuestionEdit(Number(questionId));
      hideQuestionForm();
      props.questionRenameAlert();
    }

    if (String(question).length !== 0) {
      document.getElementById('question-edit')
              .classList.remove('warning');
    } else document.getElementById('question-edit')
              .className += ' warning'

    if (String(answer).length !== 0) {
      document.getElementById('answer-edit')
              .classList.remove('warning')
    } else {
      document.getElementById('answer-edit')
                .className += ' warning'
    }

  }

  const onKeyEnter = (e,func) => {
    if (e.which === 13) {
      e.preventDefault();
      func();
    }
  }

  return(
    <ul className="list-group" id="question_edit">
      <li className="list-group-item no-active">
        <Link to="/" className="item">Edit question</Link>
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
            <input type="hidden" id="hidden_id"/>
              <textarea type="text"
                aria-describedby="emailHelp"
                id="question-edit"
                placeholder="New question" />
            </div>
            <div className ="form-group question">
              <textarea type="text"
                aria-describedby="emailHelp"
                onKeyDown= { (e) => onKeyEnter(e,check) }
                id="answer-edit"
                placeholder="Add answer" />
            </div>
            <div className ="form-group question">
              <button
                type="button" onClick={ check }
                className="btn btn-success btn-sm btn-block">
                Save
              </button>
            </div>
          </div>
        </form>
      </li>
    </ul>
  );
};

export default QuestionChangeForm;
