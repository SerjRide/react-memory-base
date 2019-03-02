const Base = [

  // Категория 1
  [
    {name:'Категория 1'},

    // Вопрос 1
    {
      question: 'Категория 1 - Вопрос 1',
      answer: 'Категория 1 - Ответ 1'
    },

    // Вопрос 2
    {
      question: 'Категория 1 - Вопрос 2',
      answer: 'Категория 1 - Ответ 2'
    },

    // Вопрос 3
    {
      question: 'Категория 1 - Вопрос 3',
      answer: 'Категория 1 - Ответ 3'
    },

  ],

  // Категория 2
  [
    {name:'Категория 2'},

    // Вопрос 1
    {
      question: 'Категория 2 - Вопрос 1',
      answer: 'Категория 2 - Ответ 1'
    },

    // Вопрос 2
    {
      question: 'Категория 2 - Вопрос 2',
      answer: 'Категория 2 - Ответ 2'
    },

    // Вопрос 3
    {
      question: 'Категория 2 - Вопрос 3',
      answer: 'Категория 2 - Ответ 3'
    },

  ],

  // Категория 3
  [
    {name:'Категория 3'},


    // Вопрос 1
    {
      question: 'Категория 3 - Вопрос 1',
      answer: 'Категория 3 - Ответ 1'
    },

    // Вопрос 2
    {
      question: 'Категория 3 - Вопрос 2',
      answer: 'Категория 3 - Ответ 2'
    },

    // Вопрос 3
    {
      question: 'Категория 3 - Вопрос 3',
      answer: 'Категория 3 - Ответ 3'
    },

  ]

];

if (!localStorage.Base) {
  const serialObj = JSON.stringify(Base)
  localStorage.setItem('Base', serialObj)
}

const QuestionData = JSON.parse(localStorage.getItem("Base"))

const setBase = (data) => {
  const serialObj = JSON.stringify(data)
  localStorage.removeItem(Base)
  localStorage.setItem('Base', serialObj)
};

const createCategory = (name) => {
  QuestionData.push([{name: name}])
  setBase(QuestionData)
};

const removeCategory = (i) => {
  QuestionData.splice(i-1,1);
  setBase(QuestionData);
};

export {
  QuestionData,
  createCategory,
  removeCategory
}
