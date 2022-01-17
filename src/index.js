import {createTodo, getTodos, updateTodo, removeTodo, removeAllTodos} from "./api";
import toastr, { error } from "toastr";
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

	   const loadingModal = basicLightbox.create(`
 <div class="loading-modal">
 	<p id='text'>Please wait a bit ...</p>
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
refs.printBtn.addEventListener("click", onClearBtn);
refs.form.addEventListener("submit", onSubmitBtn);
refs.modalBtnDelete.addEventListener("click", onModalBtnDelete);
refs.modalBtnCancel.addEventListener("click", onModalBtnCancel);

}
 
function start() {
loadingModal.show();
getTodos('todos')
.then((data) => {
	todos = data;
	render();
})
.catch((errorMessage) => {
	toastr.error(errorMessage);
})
.finally(() => {
	addEventListeners();
	loadingModal.close();
})
}

function render() {
	const items = todos.map(todo => itemTemplate(todo));
refs.list.innerHTML = items.join('');
}

function addTodo(value) {
	// const newTodo = {id:uuidv4(), label:value, checked:false};
		const newTodo = {label:value, checked:false};

toastr.success("Your TODO is created successfully)))");

	return createTodo(newTodo).then(data => {
		todos.push(data);
	})

// saveData('todos', todos);
// return Promise.resolve();
}

function onSubmitBtn(e) {
	e.preventDefault();
	const value = e.currentTarget.elements.input.value;

	if(!value) return toastr.success("Enter details about your plans");


addTodo(value)
.then(refs.form.reset())
.then(render);
}

function onClearBtn(e) {
	todos = todos.map((todo)=> {removeTodo(todo.id)})
	todos = [];
	refs.list.innerHTML = "";
	toastr.success("Your todos are deleted!")

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
	
		// todos = todos.map(todo => todo.id == id 
		// ? {
      //  ...todo,
		//  checked: !todo.checked,
		// } 
		// : todo);
		// loadingModal.show();
		// saveData('todos', todos)
		// .finally(() => {
		// render();
		// loadingModal.close()
		// })
		const todo = todos.find((todo) => todo.id === id);
		const payload = {
			...todo,
			checked: !todo.checked,
		}
		updateTodo(id, payload)
		.then((data)=> {
			todos = todos.map((todo)=> todo.id === id ? data : todo)
		}).finally(()=> {
			render();
		})

}

function onModalBtnCancel(e) {
	deleteTodo.close();
}

function onModalBtnDelete(e) {
	// todos = todos.filter(todo => todo.id != currentId);
	// 	deleteTodo.close();

	// 	loadingModal.show();
	// 	saveData('todos', todos)
	// 	.then(() => {
	// 	render();
	// toastr.warning("Your TODO is deleted now!!!");
	// 	})
	// 	.finally(loadingModal.close());
	removeTodo(currentId)
	.then(() => {toastr.warning("Your TODO is deleted now!!!")})
	.then(()=>{todos = todos.filter(todo => todo.id != currentId)})
	.finally(()=>{	
		render();
		deleteTodo.close();
})
}

start();

