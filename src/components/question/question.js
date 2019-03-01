import React, { Component } from 'react'

import QuestionBar from '../question-bar';
import QuestionArea from '../question-area';

import QuestionData from '../../service/question-data';

export default class Question extends Component {

  state = {
    currentQuestion: this.props.currentQuestion,
    help: 0
  };

  onAddClick = () => {
    console.log('onAddClick');
  };

  onBookmarksClick = () => {
    console.log('onBookmarksClick');
  };

  onFirstClick = () => {
    this.setState({currentQuestion: 1});
    document.getElementById('answer').value = '';
  };

  onPrevClick = () => {
    const { currentQuestion } = this.state
    const length = QuestionData[this.props.currentCategory].length
    document.getElementById('answer').value = '';
    if (currentQuestion > 1) {
      this.setState({currentQuestion: currentQuestion - 1});
    }else this.setState({currentQuestion: length - 1});
  };

  onNextClick = () => {
    const { currentQuestion } = this.state
    const length = QuestionData[this.props.currentCategory].length
    if (currentQuestion < length - 1) {
      this.setState({currentQuestion: currentQuestion + 1});
    }else this.setState({currentQuestion: 1});
    document.getElementById('answer').value = '';
  };

  onLastClick = () => {
    const length = QuestionData[this.props.currentCategory].length
    this.setState({currentQuestion: length - 1});
    document.getElementById('answer').value = '';
  };

  onHelpClick = () => {
    this.setState({help: this.state.help + 1});
  };

  onDelClick = () => {
    console.log('onDelClick');
  };

  render(){
    const { currentCategory } = this.props;
    const { currentQuestion, help } = this.state;
    const { question, answer } = QuestionData[currentCategory][currentQuestion];

    return(
      <React.Fragment>
        <QuestionBar
          currentQuestion={ currentQuestion }
          onAddClick = {this.onAddClick}
          onBookmarksClick = {this.onBookmarksClick}
          onFirstClick = {this.onFirstClick}
          onPrevClick = {this.onPrevClick}
          onNextClick = {this.onNextClick}
          onLastClick = {this.onLastClick}
          onHelpClick = {this.onHelpClick}
          onDelClick = {this.onDelClick}/>
        <QuestionArea
          currentCategory={ currentCategory }
          currentQuestion={ currentQuestion }
          question={ question }
          answer={ answer }
          help={ help }/>
      </React.Fragment>
    )
  };
};
