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
    visableCategory:0,
    editQuestion: 0,
    showEdit: false,
    thisQuestionEdit: 0,
    badge: 1
  };

  asyncQuestionUpdate = () => {
    this.setState({badge: this.state.badge + 1});
  }

  onCategorySelect = (id = this.state.currentCategory) => {
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

  showEdit = (id) => {
    this.setState({
      rightContent: 'question list',
      showEdit: true,
      thisQuestionEdit: id
    });
  };

  returnToQuestion = (id) => {
    this.onQuestionSelect(id);
    this.setState({
      rightContent: 'show question',
      showEdit: false
    });
  }

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
    this.setState({ categoryRenameAlert:true });
    setTimeout(() => this.setState({ categoryRenameAlert:false }),2000);
  };

  questionRenameAlert = () => {
    this.setState({ questionRenameAlert:true });
    setTimeout(() => this.setState({ questionRenameAlert:false }),2000);
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

  searchCategory = (value) => this.setState({visableCategory:value})

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
            returnToQuestion = { (id) => this.returnToQuestion(id) }
            id = { currentCategory }
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
                   asyncQuestionUpdate={ this.asyncQuestionUpdate }
                   onCategorySelect={ (id) => this.onCategorySelect(id) }
                   showEdit={ (id) => this.showEdit(id) }
                   getCategoryName={ () => console.log('getCategoryName') }
                   getTrueAnswer={ this.getTrueAnswer }
                   onBackToList={ this.onBackToList }
                   currentQuestion={ currentQuestion }
                   currentCategory={ currentCategory }/>
    }

    let left = (
      <React.Fragment>
        <CategoryForm
          searchCategory={ (value) => this.searchCategory(value) }
          getCategoryName={ this.getCategoryName }/>
        <Categories
           visableCategory={ this.state.visableCategory }
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
