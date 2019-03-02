import React, { Component } from 'react';

import './question-area.css';

export default class QuestionArea extends Component {

  componentDidUpdate(prevProps){
    const {answer, help} = this.props
    if (help !== prevProps.help) {
      document.getElementById('answer').value = answer;
      document.getElementById('answer').focus();
    };
  };

  render() {
    const { question, onApplyClick, onEnterApply } = this.props

    return(
      <div className='question-area'>
        <textarea disabled placeholder={ question }></textarea>
        <textarea id="answer" onChange={ this.onAnswerChange }
        onKeyDown={ onEnterApply }/>
        <button
          type="button" onClick={ onApplyClick }
          className="btn btn-success btn-sm btn-block">
          Apply
        </button>
      </div>
    );
  };

};
