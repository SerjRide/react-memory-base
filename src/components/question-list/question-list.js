import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './question-list.css';

import { QuestionData,
         createQuestion,
         removeQuestion,
         changeQuestion }from '../../service/question-data';

export default class QuestionList extends Component {

  state = {
    update: 0
  };

  componentDidMount(){
    this.renderList();
  };

  componentDidUpdate(prevProps,prevState) {
    const { id, newQuestion, newAnswer, editQuestion } = this.props;
    const { update } = this.state;
    if (id !== prevProps.id || update !== prevState.update){
      this.renderList();
    };
    if (newQuestion !== prevProps.newQuestion) {
      this.addQuestion(newQuestion, newAnswer);
      this.renderList();
    }
    if (editQuestion !== prevProps.editQuestion) {
      this.editCurrentQuestion(this.state.currentQuestion)
    }
  };

  addQuestion = (question, answer) => {
    const { id } = this.props
    createQuestion(id, question, answer);
    this.setState({update: this.state.update + 1 });
  };

  delQuestion = (id) => {
    if (window.confirm('Are you sure?')) {
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

  showEdit = (e) => {
    this.setState({currentQuestion:e})
    document.getElementById('question_edit').style.display = 'block';

    const { id } = this.props;
    const thisQuestion = QuestionData[id][e].question
    const thisAnswer = QuestionData[id][e].answer

    document.getElementById('question-edit').value = thisQuestion
    document.getElementById('answer-edit').value = thisAnswer

    document.getElementById('question_list').style.display = 'none';
  }

  editCurrentQuestion = (id) => {

    console.log('question-edit');

    const question = String(document.getElementById('question-edit').value)
    const answer = String(document.getElementById('answer-edit').value)

    const currentCategory = this.props.id;
    // const { value } = document.getElementById(`rename_${id}`)
    changeQuestion(currentCategory, id, question, answer)
    // this.hideForm(id);
    this.setState({update: this.state.update + 1 });
  }

  renderBlock = (text, i, func, btn) => {

    let button = 0;

    if (btn) {
      button = (
        <React.Fragment>
        <button
           data-title="Edit Question"
           type="button" onClick={ () => this.showEdit(i) }
           className="btn btn-secondary list">
           <i className="far fa-edit"></i>
        </button>
        <button
           data-title="Delete question"
           type="button" onClick={ () => this.delQuestion(i) }
           className="btn btn-secondary">
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
    const { onQuestionSelect, id, onAddQuestion } = this.props
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
      items = this.renderBlock('Add answers', false, onAddQuestion, false)
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
