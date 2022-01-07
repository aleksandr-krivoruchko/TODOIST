import './css/style.css';
import { v4 as uuidv4 } from 'uuid';

const itemTemplate = ({ id, label, checked }) =>
  `<li data-id=${id} class="item">
    <label>
      <input type="checkbox" ${checked ? 'checked' : ''} />
      <span>${label}</span>
    </label>
    <button type="button" class="close-btn ">x</button>
  </li>`;

const refs = { 
form: document.querySelector('form'),
list: document.querySelector('.list'),
printBtn: document.querySelector(".print-btn")
}

let todos = [
{id:1, label:"buy milk", checked:true},
{id:2, label:"buy milk", checked:false},
{id:3, label:"buy milk", checked:false},
{id:4, label:"buy milk", checked:false},
];

refs.list.addEventListener("click", handleClick);
refs.printBtn.addEventListener("click", onPrintBtn);
refs.form.addEventListener("submit", onSubmitBtn);


function onSubmitBtn(e) {
	e.preventDefault();
	const value = e.currentTarget.elements.input.value;

	if(!value){
		return
	}

const newTodo = {id:uuidv4(), label:value, checked:true};
todos.push(newTodo);
refs.form.reset();
render();
}

function onPrintBtn(e) {
	console.table(todos);
}

function handleClick(e){
	const id = e.target.closest('li').dataset.id; 

	switch (e.target.nodeName) {
		case 'BUTTON':
			deleteItem(id);
			break;

		case 'INPUT':
		case 'LABEL':
		case 'SPAN':
			toggleItem(id);
			break;

		default:
			break;
	}
	render();
}

function deleteItem(id) {
	todos = todos.filter(todo => todo.id != id);
}

function toggleItem(id) {
		todos = todos.map(todo => todo.id == id 
		? {
       ...todo,
		 checked: !todo.checked,
		} 
		: todo);

}

function render() {
	const items = todos.map(todo => itemTemplate(todo));
refs.list.innerHTML = items;
}


	render();
