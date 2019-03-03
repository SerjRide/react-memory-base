import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './app.css';

import Header from '../header';
import Categories from '../categories';
import QuestionList from '../question-list';
import Question from '../question';
import Empty from '../empty';
import { CategoryForm, QuestionForm } from '../form';
import { CategoryAlert } from '../alert';

import Row from '../row';

export default class App extends Component {

  state = {
    rightContent: 'empty',
    alert: false
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.alert !== prevState.alert){
  //
  //   }
  // }

  onCategorySelect = (id) => {
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

  onAddQuestion = () => {
    console.log('add question');
  };

  onDelCategory = () => {
    console.log(`APP del category`)
    this.setState({rightContent: 'empty'})
  };

  getCategoryName = () => {
    const text = document.getElementById('categoryName').value
    console.log(`getCategoryName ${text}`)
    this.setState({
      newCategoryName: text
    })
  };

  getNewQuestion = () => {
    const question = document.getElementById('question-form').value
    const answer = document.getElementById('answer-form').value
    console.log(`Create question ${question}`);
    console.log(`Create answer ${answer}`);
    this.setState({
      newQuestion: question,
      newAnswer: answer
    })
  }

  getAlert = () => {
    console.log('getAlert')
    this.setState({ alert:true });
    setTimeout(() => this.setState({ alert:false }), 2000);
  }

  onBackToList = () => this.onCategorySelect(this.state.currentCategory);

  render() {

    const { rightContent, currentCategory,
            currentQuestion, newQuestion, newAnswer } = this.state

    let right = <Empty />

    if (rightContent === 'question list') {
      right = (
        <React.Fragment>
          <QuestionForm getNewQuestion={ this.getNewQuestion }/>
          <QuestionList id = { currentCategory }
             onQuestionSelect = { this.onQuestionSelect }
             onAddQuestion = { this.onAddQuestion }
             newQuestion = { newQuestion }
             newAnswer = { newAnswer }/>
        </React.Fragment>
      )
    }

    if (rightContent === 'show question') {
      right = <Question
                   onBackToList={ this.onBackToList }
                   currentQuestion={ currentQuestion }
                   currentCategory={ currentCategory }/>
    }

    let left = (
      <React.Fragment>
        <CategoryForm getCategoryName={ this.getCategoryName }/>
        <Categories
           getAlert={ this.getAlert }
           onCategorySelect={ this.onCategorySelect }
           onDelCategory={ this.onDelCategory }
           newCategoryName={ this.state.newCategoryName }/>
      </React.Fragment>
    )

    const alert = this.state.alert ? <CategoryAlert /> : null

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
