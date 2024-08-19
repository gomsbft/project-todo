const todoInputEl = document.querySelector(".todo-input");
const todoListEl = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add-btn")

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text })
  setTodos(newTodos)
  paintTodos();
}

const completeTodo = (todoId) => {
  const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo,  isCompleted: !todo.isCompleted} : todo )
  setTodos(newTodos);
  paintTodos();
}

const deleteTodo = (todoId) => {
  console.log(todoId);
  const newTodos = getAllTodos().filter(todo => todo.id !== todoId );
  setTodos(newTodos);
  paintTodos()
}

const updateTodo = (text, todoId) => {
  const currentTodos = getAllTodos();
  const newTodos = currentTodos.map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
  setTodos(newTodos);
  paintTodos();
}

const onclickTodo = (e, todoId) => {
  const todoEl = e.target;
  const inputText = e.target.innerText;
  const todoItemEl = todoEl.parentNode;
  const inputEl = document.createElement('input');
  inputEl.value = inputText;
  inputEl.classList.add('edit-input');
  inputEl.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
      updateTodo(e.target.value, todoId);
      document.body.removeEventListener('click', onClickBody );
    }
  })

  const onClickBody = (e) => {
    if(e.target !== inputEl)  {
      todoItemEl.removeChild(inputEl);
      document.body.removeEventListener('click', onClickBody );
    }
  }

  document.body.addEventListener('click', onClickBody)
  todoItemEl.appendChild(inputEl);
}

const paintTodos = () => {
    todoListEl.innerHTML = ''; //todoListElem 요소 안의 HTML 초기화
	const allTodos = getAllTodos() // todos 배열 가져오기

    allTodos.forEach(todo => { 
        const todoItemEl = document.createElement("li");
        todoItemEl.classList.add("todo-item");

        todoItemEl.setAttribute('data-id', todo.id );

        const checkboxEl = document.createElement('button');
        checkboxEl.classList.add('checkbox');
        checkboxEl.addEventListener('click', () => completeTodo(todo.id))

        const todoEl = document.createElement('div');
        todoEl.classList.add('todo');
        todoEl.addEventListener('dblclick', (e) => onclickTodo(e, todo.id))
        todoEl.innerText = todo.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add('delBtn');
        deleteBtn.addEventListener('click', () =>  deleteTodo(todo.id))
        deleteBtn.innerHTML = `<span class="material-symbols-outlined">
          close</span>`;

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("updateBtn");
        updateBtn.addEventListener('click', () =>  onclickTodo())
        updateBtn.innerHTML = `<span class="material-symbols-outlined">
          edit</span>`;

        checkboxEl.addEventListener('click', () => { // 체크박스 클릭시 완료 표시
          todoItemEl.classList.toggle('complete');
        });

        todoItemEl.appendChild(checkboxEl);
        todoItemEl.appendChild(todoEl);
        todoItemEl.appendChild(deleteBtn);
        todoItemEl.appendChild(updateBtn);
        todoListEl.appendChild(todoItemEl);
        
    })
}

const init = () => {
    todoInputEl.addEventListener('keypress', (e) =>{ // Enter 키로 추가
        if( e.key === 'Enter' && todoInputEl.value !== ''){ // 빈 값 입력 방지
            appendTodos(e.target.value); 
            todoInputEl.value ='';
        }
    })

    addBtn.addEventListener('click', () => { // 추가하기 버튼으로 추가
      if(todoInputEl.value !== '') { // 빈 값 입력 방지
        appendTodos(todoInputEl.value); 
        todoInputEl.value ='';
      }
  })

}

init()
