import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './app.css';

import Header from '../header';
import Categories from '../categories';
import QuestionList from '../question-list';
import Question from '../question';
import Empty from '../empty';
import {
  CategoryForm,
  QuestionForm,
  QuestionChangeForm } from '../form';

import {
  CategoryAlert,
  QuestionAlert,
  CorrectAlert,
  CategoryRenameAlert,
  QuestionRenameAlert } from '../alert';

import Row from '../row';

export default class App extends Component {

  state = {
    rightContent: 'empty',
    categoryAlert: false,
    questionAlert: false,
    correctAlert: false,
    categoryRenameAlert: false,
    questionRenameAlert: false,
    editQuestion: 0,
    showEdit: false,
    thisQuestionEdit: 0,
    badge: 1
  };

  asyncQuestionUpdate = () => {
    this.setState({badge: this.state.badge + 1});
  }

  onCategorySelect = (id) => {
    if (document.getElementById('question_edit')) {
      if (document.getElementById('question_edit').style.display === 'block') {
        document.getElementById('question_list').style.display = 'block';
        document.getElementById('question_edit').style.display = 'none';
      }
    }
    this.setState({
      rightContent: 'question list',
      currentCategory: id
    });
  };

  // Срабатывает, когда я нажимаю edit
  showEdit = (id) => {
    console.log(`showEdit ${this.state.currentCategory}`);
    this.setState({
      rightContent: 'question list',
      // Вызывает question-list
      showEdit: true,
      thisQuestionEdit: id
    });
  };

  didQuestionEdit = (id) => {
    console.log(`didQuestionEdit ${id}`);
    this.onQuestionSelect(id)
    this.setState({showEdit: false});
  }

  onQuestionSelect = (id) => {
    this.setState({
      rightContent: 'show question',
      currentQuestion: id
    });
  };


  onDelCategory = () => {
    this.setState({ rightContent: 'empty' })
  };

  getCategoryName = () => {
    const text = document.getElementById('categoryName').value
    this.setState({
      newCategoryName: text,
      categoryAlert: true
    })
    document.getElementById('categoryName').value = '';
    setTimeout(() => this.setState({ categoryAlert:false }),2000);
  };

  getCategoryRename = () => {
    this.setState({
      categoryRenameAlert: true
    })
  };

  questionRenameAlert = () => {
    this.setState({
      questionRenameAlert: true
    })
  };

  getNewQuestion = () => {
    const question = document.getElementById('question-form').value
    const answer = document.getElementById('answer-form').value
    this.setState({
      newQuestion: question,
      newAnswer: answer,
      questionAlert: true
    })
    document.getElementById('question-form').value = '';
    document.getElementById('answer-form').value = '';

    setTimeout(() => this.setState({ questionAlert:false }),2000);
  }

  editQuestion = () => {
    this.setState({ editQuestion: this.state.editQuestion + 1 });
  }

  getTrueAnswer = () => {
    this.setState({ correctAlert: true });
    setTimeout(() => this.setState({ correctAlert:false }),2000);
  };

  onBackToList = () => this.onCategorySelect(this.state.currentCategory);

  render() {

    const { rightContent, currentCategory, editQuestion,
            currentQuestion, newQuestion, newAnswer, badge,
            showEdit, thisQuestionEdit  } = this.state

    let right = <Empty />

    if (rightContent === 'question list') {
      right = (
        <React.Fragment>
          <QuestionChangeForm
            didQuestionEdit={ this.didQuestionEdit }
            editQuestion={ this.editQuestion }
            questionRenameAlert= { this.questionRenameAlert }/>
          <QuestionForm
             getNewQuestion={ this.getNewQuestion }
             currentCategory={ currentCategory }/>
          <QuestionList id = { currentCategory }
             showEdit={ showEdit }
             thisQuestionEdit = { thisQuestionEdit }
             asyncQuestionUpdate={ this.asyncQuestionUpdate }
             editQuestion = { editQuestion }
             onQuestionSelect = { this.onQuestionSelect }
             onAddQuestion = { this.onAddQuestion }
             newQuestion = { newQuestion }
             newAnswer = { newAnswer }/>
        </React.Fragment>
      )
    }

    if (rightContent === 'show question') {
      right = <Question
                   showEdit={ this.showEdit }
                   getCategoryName={ () => console.log('getCategoryName') }
                   getTrueAnswer={ this.getTrueAnswer }
                   onBackToList={ this.onBackToList }
                   currentQuestion={ currentQuestion }
                   currentCategory={ currentCategory }/>
    }

    let left = (
      <React.Fragment>
        <CategoryForm getCategoryName={ this.getCategoryName }/>
        <Categories
           getCategoryRename={ this.getCategoryRename }
           badge={ badge }
           onCategorySelect={ this.onCategorySelect }
           onDelCategory={ this.onDelCategory }
           newCategoryName={ this.state.newCategoryName }/>
      </React.Fragment>
    )

    let alert = null;

    if (this.state.categoryAlert) {
      alert = <CategoryAlert />
    } else if (this.state.questionAlert) {
      alert = <QuestionAlert />
    } else if (this.state.correctAlert) {
      alert = <CorrectAlert />
    } else if (this.state.categoryRenameAlert) {
      alert = <CategoryRenameAlert />
    } else if (this.state.questionRenameAlert) {
      alert = <QuestionRenameAlert />
    }

    return (
      <div className="app">
        { alert }
        <Header />
        <Router>
          <Row left={left} right={right}/>
        </Router>
      </div>
    );
  };
};
