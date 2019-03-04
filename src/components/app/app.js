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
  CorrectAlert } from '../alert';

import Row from '../row';

export default class App extends Component {

  state = {
    rightContent: 'empty',
    categoryAlert: false,
    questionAlert: false,
    correctAlert: false,
    editQuestion: 0,
    badge: 1
  };

  asyncQuestionUpdate = () => {
    console.log('asyncQuestionUpdate')
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

  onQuestionSelect = (id) => {
    this.setState({
      rightContent: 'show question',
      currentQuestion: id
    });
  };

  onAddQuestion = () => console.log('add question');

  onDelCategory = () => {
    console.log(`APP del category`)
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

  getNewQuestion = () => {
    console.log('getNewQuestion')
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

  getTrueAnswer = () => {
    this.setState({ correctAlert: true });
    setTimeout(() => this.setState({ correctAlert:false }),2000);
  };

  editQuestion = () => {
    this.setState({ editQuestion: this.state.editQuestion + 1 });
  }

  onBackToList = () => this.onCategorySelect(this.state.currentCategory);

  render() {

    const { rightContent, currentCategory, editQuestion,
            currentQuestion, newQuestion, newAnswer, badge } = this.state

    let right = <Empty />

    if (rightContent === 'question list') {
      right = (
        <React.Fragment>
          <QuestionChangeForm editQuestion={ this.editQuestion }/>
          <QuestionForm
             getNewQuestion={ this.getNewQuestion }
             currentCategory={ currentCategory }/>
          <QuestionList id = { currentCategory }
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
           badge={ badge }
           getAlert={ this.getCategoryAlert }
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
