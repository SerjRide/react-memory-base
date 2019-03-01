import React, { Component } from 'react';

import './question-area.css';

export default class QuestionArea extends Component {

  state = {
    answer: ''
  }

  componentDidUpdate(prevProps){
    const {answer, help} = this.props
    if (help !== prevProps.help) {
      document.getElementById('answer').value = answer;
    };
  };

  applyClick = () => {
    const currenAnswer = document.getElementById('answer').value;
    if (currenAnswer !== this.props.answer) {
      alert('Ответ не верный');
    }else{
      this.setState({answer:''});
      document.getElementById('answer').value = '';
    };
  };

  onEnterApply  = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.applyClick();
    }
  };

  render() {
    const { question } = this.props

    return(
      <div className='question-area'>
        <textarea disabled placeholder={ question }></textarea>
        <textarea id="answer" onChange={ this.onAnswerChange }
        onKeyDown={ this.onEnterApply }/>
        <button
          type="button" onClick={ this.applyClick }
          className="btn btn-success btn-sm btn-block">
          Apply
        </button>
      </div>
    );
  };

};
