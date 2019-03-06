import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './question-list.css';

import { QuestionData,
         createQuestion,
         removeQuestion }from '../../service/question-data';

export default class QuestionList extends Component {

  state = {
    update: 0
  };

  componentDidMount(){
    if(this.props.showEdit === true){
      this.showEdit(this.props.thisQuestionEdit)
      document.getElementById('question_list').style.display = 'none';
      document.getElementById('question_edit').style.display = 'block';
    };
    this.renderList();
  };

  showEdit = (currentQuestion) => {
    this.setState({currentQuestion: currentQuestion})

    const { id } = this.props;
    const thisQuestion = QuestionData[id][currentQuestion].question
    const thisAnswer = QuestionData[id][currentQuestion].answer

    document.getElementById('question-edit').value = thisQuestion;
    document.getElementById('answer-edit').value = thisAnswer;
    document.getElementById('hidden_id').value = currentQuestion;
  }

  componentDidUpdate(prevProps,prevState) {
    const { id, newQuestion, newAnswer } = this.props;
    const { update } = this.state;
    if (id !== prevProps.id || update !== prevState.update){
      this.renderList();
    };
    if (newQuestion !== prevProps.newQuestion) {
      this.addQuestion(newQuestion, newAnswer);
      this.renderList();
    }
  };

  addQuestion = (question, answer) => {
    const { id, asyncQuestionUpdate } = this.props
    createQuestion(id, question, answer);
    this.setState({update: this.state.update + 1 });
    asyncQuestionUpdate();
  };

  delQuestion = (id) => {
    if (window.confirm('Are you sure?')) {
      removeQuestion(this.props.id,id);
      this.setState({update: this.state.update + 1 });
      this.props.asyncQuestionUpdate();
    };
  };

  showForm = () => {
    const hideObj = document.getElementById('question_list');
    const showObj = document.getElementById('question_form');
    showObj.style.display = 'block';
    hideObj.style.display = 'none';
  };



  renderBlock = (text, i, func, btn) => {

    let button = 0;

    if (btn) {
      button = (
        <React.Fragment>
        <button
           data-title="Delete question"
           type="button" onClick={ () => this.delQuestion(i) }
           className="btn btn-secondary list">
           <i className="far fa-trash-alt"></i>
        </button>
        </React.Fragment>
      );
    }else button = null;

    return (
      <li className="list-group-item" key={ i }>
        <Link to="/" onClick={ func }>
           { text }
        </Link>
        { button }
      </li>
    );
  };

  renderList = () => {
    const { onQuestionSelect, id } = this.props
    let items = QuestionData[id].map((item, i) => {

      let { question } = item;

      if (String(question).length > 30) {
        question = question.substring(0,30) + '...';
      }

      if ( i !== 0 ) {
        return this.renderBlock(question,i,() => onQuestionSelect(i), true)
      } else return null

    });

    if (items.length === 1) {
      items = this.renderBlock('+ add new question', false, (e) => this.showForm(e), false)
    }

    this.setState({items: items});
  };

  render() {

    const { items } = this.state, { id } = this.props
    const { name } = QuestionData[id][0]

    return(
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active">
          <Link to="/" className="item">Select question from { name }</Link>
          <button
             type="button" onClick={ (e) => this.showForm(e) }
             className="btn btn-secondary list head"
              data-title="Add question">
             <i className="fas fa-plus"></i>
          </button>
        </li>
        { items }
      </ul>
    );
  }

};
