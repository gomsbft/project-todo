const todoInputEl = document.querySelector(".todo-input");
const todoListEl = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add-btn")
const changeText = document.querySelector(".change-text");
const changeTextOk = document.querySelector("change-text_ok");


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

const deleteTodo = (todoId) => {
  console.log(todoId);
  const newTodos = getAllTodos().filter(todo => todo.id !== todoId );
  setTodos(newTodos);
  paintTodos()
}




const paintTodos = () => {
    todoListEl.innerHTML = ''; //todoListElem 요소 안의 HTML 초기화
	  const allList = getAllTodos() // todos 배열 가져오기

    allList.forEach(todo => { 
        const todoItemEl = document.createElement("li");
        todoItemEl.classList.add("todo-item");

        todoItemEl.setAttribute('data-id', todo.id );

        const checkboxEl = document.createElement('button');
        checkboxEl.classList.add('checkbox');

        const todoEl = document.createElement('div');
        todoEl.classList.add('todo');
        todoEl.innerText = todo.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add('delBtn');
        deleteBtn.addEventListener('click', () =>  deleteTodo(todo.id))
        deleteBtn.innerHTML = `<span class="material-symbols-outlined">
          delete</span>`;

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("updateBtn");
        updateBtn.innerHTML = `<span class="material-symbols-outlined">
          edit</span>`;
        updateBtn.addEventListener("click", (e) => {
          changeText.classList.remove("off");
          changeTextOk.classList.remove("off");
        })

        const changeText = document.createElement("input");
        changeText.classList.add("change-text");
        changeText.classList.add("off");

        // 확인버튼 누르면 다시 off 
        const changeTextOk = document.createElement("button");
        changeTextOk.classList.add("change-text_ok");
        changeTextOk.classList.add("off");
        changeTextOk.innerHTML= "확인"
        changeTextOk.addEventListener("click", (e) => {
          if(todoEl.value === changeText.value || changeText.value === "") {
            changeText.classList.add("off");
            changeTextOk.classList.add("off");
          }else {
            todoEl.value = changeText.value;
            changeText.classList.add("off");
            changeTextOk.classList.add("off");
          }
        })

        checkboxEl.addEventListener('click', () => { // 체크박스 클릭시 완료 표시
          todoItemEl.classList.toggle('complete');
        });

        todoItemEl.appendChild(checkboxEl);
        todoItemEl.appendChild(todoEl);
        todoItemEl.appendChild(deleteBtn);
        todoItemEl.appendChild(updateBtn);
        todoItemEl.appendChild(changeText);
        todoListEl.appendChild(todoItemEl);
        todoItemEl.appendChild(changeTextOk);
        
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
