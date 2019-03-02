import React, { Component } from 'react';

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

  componentDidUpdate(p,prevState) {
    if (this.state.update !== prevState.update){
      this.renderList();
    }
  };

  addCategory = () => {
    console.log('add category');
    createCategory('TEST');
    this.setState({update: this.state.update + 1 });
  };

  delCategory = (id) => {
    console.log(`Delete: ${id}`)
    removeCategory(id+1);
    this.setState({update: this.state.update + 1 });
  }

  renderList = () => {
    const { onCategorySelect } = this.props;
    const items = QuestionData.map((item, i) => {
      console.log(item);
      const { name } = item[0], id = i;
      return (
        <li className="list-group-item"
          key = { id }
          onClick={ () => onCategorySelect(id) }>
          <i className='item'>{ name }</i>
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

    // removeCategory(4);

    return(
      <ul className="list-group">
        <li className="list-group-item no-active">
          <i className="item">Category Selection:</i>
          <button onClick={ this.addCategory }
             type="button"
             className="btn btn-secondary">
             <i className="fas fa-plus"></i>
          </button>
        </li>
        {items}
      </ul>
    );
  }

};
