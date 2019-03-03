import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './categories.css';

import { QuestionData, createCategory,
  removeCategory } from '../../service/question-data';

export default class Categories extends Component {

  state = {
    update: 0
  };

  componentDidMount(){
    this.renderList();
  }

  componentDidUpdate(prevProps,prevState) {
    const { newCategoryName } = this.props;
    if (this.state.update !== prevState.update){
      this.renderList();
    }

    if (newCategoryName !== prevProps.newCategoryName) {
      this.addCategory(newCategoryName);
      this.renderList();
    }
  };

  addCategory = (name) => {
    console.log('add category');
    console.log(name);
    createCategory(name);
    this.setState({update: this.state.update + 1 });
    this.props.getAlert();
  };

  delCategory = (id) => {
    const text = `
    Are you sure?
    Все вопросы содержащиеся в этой категории будут удалены безвозвратно!`
    if (window.confirm(text)) {
      this.props.onDelCategory();
      console.log(`Delete: ${id}`)
      removeCategory(id+1);
      this.setState({update: this.state.update + 1 });
    }
  }

  renderList = () => {
    const { onCategorySelect } = this.props;
    const items = QuestionData.map((item, i) => {
      const { name } = item[0], id = i;
      return (
        <li className="list-group-item" key = { id }>
          <Link to="/"
             onClick={ () => onCategorySelect(id) }>
            { name }
          </Link>
          <button
             type="button" onClick={ () => this.delCategory(id) }
             className="btn btn-secondary list">
             <i className="far fa-trash-alt"></i>
          </button>
        </li>

      );
    });
    this.setState({items: items});
  }

  render(){

    const { items } = this.state;

    return(
      <ul className="list-group">
        {items}
      </ul>
    );
  }

};
