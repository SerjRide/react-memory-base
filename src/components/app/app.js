import React, { Component } from 'react';
import './app.css';

import Header from '../header';
import Categories from '../categories';
import QuestionList from '../question-list';
import Question from '../question';
import Empty from '../empty';

import Row from '../row';

export default class App extends Component {

  state = {
    questionArea: 'empty'
  };

  onCategorySelect = (id) => {
    this.setState({
      questionArea: 'question list',
      currentCategory: id
    });
  };

  onQuestionSelect = (id) => {
    this.setState({
      questionArea: 'show question',
      currentQuestion: id
    });
  };

  onAddQuestion = () => {
    console.log('add question');
  };

  render() {

    const { questionArea, currentCategory, currentQuestion } = this.state
    let content = <Empty />

    if (questionArea === 'empty') content = <Empty />
    else if (questionArea === 'question list') {
      content = <QuestionList id = { currentCategory }
                  onQuestionSelect = { this.onQuestionSelect }
                  onAddQuestion = { this.onAddQuestion }/>
    }
    else if (questionArea === 'show question') {
      content = <Question
                  currentQuestion={ currentQuestion }
                  currentCategory={ currentCategory }/>
    }

    return (
      <div className="app">
        <Header />
        <Row
          left={<Categories onCategorySelect={ this.onCategorySelect }/>}
          right={content}/>
      </div>
    );
  };
};
