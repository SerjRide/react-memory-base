import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './question-list.css';

import { QuestionData,
         createQuestion,
         removeQuestion  }from '../../service/question-data';

export default class QuestionList extends Component {

  state = {
    update: 0
  };

  componentDidMount(){
    this.renderList();
  };

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
    const { id } = this.props
    createQuestion(id, question, answer);
    this.setState({update: this.state.update + 1 });
  };

  delQuestion = (id) => {
    if (window.confirm('Are you sure?')) {
      console.log(this.props.id)
      removeQuestion(this.props.id,id);
      this.setState({update: this.state.update + 1 });
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
        <button
           type="button" onClick={ () => this.delQuestion(i) }
           className="btn btn-secondary">
           <i className="far fa-trash-alt"></i>
        </button>
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
    const { onQuestionSelect, id, onAddQuestion } = this.props
    let items = QuestionData[id].map((item, i) => {
      const { question } = item;
      if ( i !== 0 ) {
        return this.renderBlock(question,i,() => onQuestionSelect(i), true)
      } else return null
    });

    if (items.length === 1) {
      items = this.renderBlock('Add answers', false, onAddQuestion, false)
    }
    this.setState({items: items});
  };

  render() {

    const { items } = this.state;

    return(
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active">
          <Link to="/" className="item">Choice of question:</Link>
          <button
             type="button" onClick={ this.showForm }
             className="btn btn-secondary list">
             <i className="fas fa-plus"></i>
          </button>
        </li>
        { items }
      </ul>
    );
  }

};
