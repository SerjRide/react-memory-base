import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './categories.css';

import { QuestionData, createCategory,
  removeCategory, rename } from '../../service/question-data';

export default class Categories extends Component {

  state = {
    update: 0,
    badge: 0,
    term: '',
    visibleItems: QuestionData,
    newCategory: 0
  };

  componentDidMount(){
    this.renderList();
  }

  componentDidUpdate(prevProps,prevState) {
    const { newCategoryName, badge, visableCategory } = this.props;
    const { update } = this.state;
    if (update !== prevState.update || badge !== prevProps.badge) {
      this.renderList();
    }

    if (newCategoryName !== prevProps.newCategoryName) {
      this.addCategory(newCategoryName);
      this.setState({newCategory: this.state.newCategory + 1})
    }

    if (visableCategory !== prevProps.visableCategory) {
      const visibleItems = this.search(QuestionData, this.props.visableCategory)
      this.setState({ visibleItems:  visibleItems})
    }

    if (this.state.visibleItems !== prevState.visibleItems) {
      this.renderList();
    }

    if (this.state.newCategory !== prevState.newCategory){
      this.renderList();
    }
  };

  search = (items, term) => {
    if (term.langth === 0 ) {
      return items
    };
    return items.filter((item, i) => {
      return items[i][0].name
                        .toLowerCase()
                        .indexOf(term.toLowerCase()) > -1;
    });
  }

  addCategory = (name) => {
      createCategory(name);
      this.setState({update: this.state.update + 1 });
  };

  renameCategory = (id) => {
    this.props.getCategoryRename()
    const { value } = document.getElementById(`rename_${id}`)
    rename(id, value);
    this.hideForm(id);
    this.setState({update: this.state.update + 1 });
  }

  delCategory = (id) => {
    const text = `
    Are you sure?
    Все вопросы содержащиеся в этой категории будут удалены безвозвратно!`
    if (window.confirm(text)) {
      this.props.onDelCategory();
      removeCategory(id+1);
      this.setState({update: this.state.update + 1 });
    }
  }

  showForm = (id) => {
    document.getElementById(`form_${id}`).style.display = 'flex';
    document.getElementById(`category_${id}`).style.display = 'none';
    document.getElementById(`rename_${id}`).focus();
  }

  hideForm = (id) => {
    document.getElementById(`form_${id}`).style.display = 'none';
    document.getElementById(`category_${id}`).style.display = 'flex';
  }

  onKeyEnter = (e,func, id) => {
    if (e.which === 13) {
      e.preventDefault();
      func(id);
    }
  }

  renderList = () => {
    const { onCategorySelect } = this.props;
    const { visibleItems } = this.state;
    const items = visibleItems.map((item, i) => {
      const { name } = item[0], id = i;
      const { length } = visibleItems[i];
      return (
        <li className="over_li" key={id}>
          <ul className="under_ul">
            <li className="list-group-item" id={`category_${id}`}>
              <Link to="/"
                 onClick={ () => onCategorySelect(id) }>
                { name } <span className="badge badge-success">
                {length - 1}</span>
              </Link>
              <button
                 type="button" onClick={ () => this.showForm(id) }
                 data-title="Rename Category"
                 className="btn btn-secondary list">
                 <i className="far fa-edit"></i>
              </button>
              <button
                 type="button" onClick={ () => this.delCategory(id) }
                 data-title="Delete Category"
                 className="btn btn-secondary list">
                 <i className="far fa-trash-alt"></i>
              </button>
            </li>

            <li className="list-group-item rename-form" id={`form_${id}`}>
              <input type="text" id={`rename_${id}`}
                className="rename"
                onKeyDown={ (e) => this
                            .onKeyEnter(e, this.renameCategory, id) }
                defaultValue={ name } />
              <button
                 type="button" onClick={ () => this.renameCategory(id) }
                 data-title="Apply"
                 className="btn btn-secondary list">
                 <i className="fas fa-check"></i>
              </button>
              <button
                 type="button" onClick={ () => this.hideForm(id) }
                 data-title="Cancel"
                 className="btn btn-secondary list">
                 <i className="fas fa-times"></i>
              </button>
            </li>
          </ul>
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
