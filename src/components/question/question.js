import React, { Component } from 'react'

import QuestionBar from '../question-bar';
import QuestionArea from '../question-area';

import { QuestionData } from '../../service/question-data';

export default class Question extends Component {

  state = {
    currentQuestion: this.props.currentQuestion,
    help: 0
  };

  showEdit = (id) =>  this.props.showEdit(id);

  onBookmarksClick = () => console.log('onBookmarksClick');

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

  onHelpClick = () => this.setState({help: this.state.help + 1});

  onDelClick = () => console.log('onDelClick');

  onApplyClick = () => {
    const currenAnswer = document.getElementById('answer').value;
    const { currentCategory } = this.props;
    const { currentQuestion } = this.state;
    const { answer } = QuestionData[currentCategory][currentQuestion]
    if (currenAnswer === answer) {
      this.props.getTrueAnswer();
      document.getElementById('answer').value = '';
      this.onNextClick();
    } else alert('Ответ не верный');
  }

  onQuestionClick = (e) => e.target.select();

  onEnterSelect = () => {
    const { currentQuestion } = this.props
    const selectQuestion = document.getElementById('questionNumber').value;
    document.getElementById('answer').value = '';
    const length = QuestionData[this.props.currentCategory].length
    if (selectQuestion > length - 1 || selectQuestion < 1) {
      alert('Вопрос не найден');
      document.getElementById('questionNumber').value = currentQuestion;
      document.getElementById('questionNumber').select();
    }else this.setState({ currentQuestion: Number(selectQuestion) });
  };

  onEnter = (e,func) => {
    if (e.which === 13) {
      e.preventDefault();
      func();
    }
  };

  render(){
    const { currentCategory, onBackToList } = this.props;
    const { currentQuestion, help } = this.state;
    const { question, answer } = QuestionData[currentCategory][currentQuestion];
    const categoryName = QuestionData[currentCategory][0].name;

    return(
      <React.Fragment>
        <QuestionBar
          length={ QuestionData[this.props.currentCategory].length }
          categoryName={ categoryName }
          onBackToList={ onBackToList }
          onQuestionClick={ this.onQuestionClick }
          currentQuestion={ currentQuestion }
          showEdit = { this.showEdit }
          onBookmarksClick = { this.onBookmarksClick }
          onFirstClick = { this.onFirstClick }
          onPrevClick = { this.onPrevClick }
          onNextClick = { this.onNextClick }
          onLastClick = { this.onLastClick }
          onHelpClick = { this.onHelpClick }
          onDelClick = { this.onDelClick }
          onEnterSelect = { (e) => this.onEnter(e,this.onEnterSelect) }/>
        <QuestionArea
          onEnterApply = { (e) => this.onEnter(e,this.onApplyClick) }
          onApplyClick = { this.onApplyClick }
          currentCategory = { currentCategory }
          currentQuestion = { currentQuestion }
          question = { question }
          answer = { answer }
          help = { help }/>
      </React.Fragment>
    )
  };
};
