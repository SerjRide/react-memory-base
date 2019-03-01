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
    questionArea: 0
  };

  onCategorySelect = (id) => {
    this.setState({
      questionArea: 1,
      question: id
    });
  };

  onQuestionSelect = () => {
    this.setState({
      questionArea: 2
    });
  };

  render() {

    const { questionArea, question } = this.state
    let content = <Empty />

    if (questionArea === 0) content = <Empty />
    else if (questionArea === 1) {
      content = <QuestionList id={question}
                  onQuestionSelect={ this.onQuestionSelect }/>
    }
    else if (questionArea === 2) content = <Question />

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
