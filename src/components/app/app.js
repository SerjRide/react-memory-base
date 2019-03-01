import React, { Component } from 'react';
import './app.css';

import Header from '../header';
import Categories from '../categories';
import QuestionList from '../question-list';
import Question from '../question'

import Row from '../row';

export default class App extends Component {

  state = {
    question: true
  };



  render() {

    const content = this.state.question ? <Question /> : <QuestionList />


    return (
      <div className="app">
        <Header />
        <Row
          left={<Categories />}
          right={content}/>
      </div>
    );
  };
};
