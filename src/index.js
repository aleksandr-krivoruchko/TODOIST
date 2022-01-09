import {fetchTodos, loadData, saveData} from "./api";
import toastr from "toastr";
import { v4 as uuidv4 } from 'uuid';
import * as basicLightbox from 'basiclightbox';

import "toastr/build/toastr.min.css";
import "basiclightbox/dist/basicLightbox.min.css";
import './css/style.css';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const itemTemplate = ({ id, label, checked}) =>
  `<li data-id=${id} class="item ${checked ? "done" : "need"}">
    <label>
      <input type="checkbox" ${checked ? 'checked' : ''} />
      <span>${label}</span>
    </label>
    <button type="button" class="close-btn ">x</button>
  </li>`;

  const deleteTodo = basicLightbox.create(`
 <div class="delete-modal">
 	<h1>Do you really want to delete this TODO ???</h1>
 	<p id='text'>my todo</p>
 	<button class="button-modal-del">DELETE</button>
 	<button class="button-modal-cancel">CANCEL</button>
 	</div>
 	`);

const refs = { 
form: document.querySelector('form'),
list: document.querySelector('.list'),
printBtn: document.querySelector(".print-btn"),
modalText: deleteTodo.element().querySelector("#text"),
modalBtnDelete: deleteTodo.element().querySelector(".button-modal-del"),
modalBtnCancel: deleteTodo.element().querySelector(".button-modal-cancel")
}

let todos = [
// {id:1, label:"buy milk", checked:true},
// {id:2, label:"buy milk", checked:false},
// {id:3, label:"buy milk", checked:false},
// {id:4, label:"buy milk", checked:false},
];

let currentId;

function addEventListeners() {
	refs.list.addEventListener("click", handleClick);
refs.printBtn.addEventListener("click", onPrintBtn);
refs.form.addEventListener("submit", onSubmitBtn);
refs.modalBtnDelete.addEventListener("click", onModalBtnDelete);
refs.modalBtnCancel.addEventListener("click", onModalBtnCancel);

}
 
function start() {
todos = fetchTodos('todos');
addEventListeners();
	render();
}

function render() {
	const items = todos.map(todo => itemTemplate(todo));
refs.list.innerHTML = items.join('');
saveData('todos', todos);
}

function addTodo(value) {
	const newTodo = {id:uuidv4(), label:value, checked:false};
	
todos.push(newTodo);
toastr.success("Your TODO is created successfully)))");

return Promise.resolve();
}

function onSubmitBtn(e) {
	e.preventDefault();
	const value = e.currentTarget.elements.input.value;

	if(!value) return

// addTodo(value).then(() => {
// refs.form.reset();
// render();
// });
addTodo(value)
.then(refs.form.reset())
.then(render);
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
	      currentId = id;
			const {label} = todos.find(todo => todo.id == id);
		refs.modalText.textContent = label;
		deleteTodo.show();
}

function toggleItem(id) {
		todos = todos.map(todo => todo.id == id 
		? {
       ...todo,
		 checked: !todo.checked,
		} 
		: todo);
}

function onModalBtnCancel(e) {
	deleteTodo.close();
}

function onModalBtnDelete(e) {
	toastr.warning("Your TODO is deleted now!!!");
	todos = todos.filter(todo => todo.id != currentId);
		deleteTodo.close();
render();
}

start();

