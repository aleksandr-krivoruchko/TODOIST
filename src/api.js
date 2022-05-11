import axios from "axios";
axios.defaults.baseURL = "https://61e433a4fbee6800175eb245.mockapi.io/api/v1";

// !==========используем localStorage===============
export function saveData(key, payload) {
  const delay = ~~(Math.random() * 3000);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(payload));
      resolve();
    }, delay);
  });
}

export function fetchTodos(key) {
  const delay = ~~(Math.random() * 3000);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(localStorage.getItem(key)));
      } catch (error) {
        reject("ERROR loading TODOS (((");
      }
    }, delay);
  });
}

// !============используем сервер он-лайн MOCK API + fetch + axios=======

export function getTodos() {
  // return fetch("https://61e433a4fbee6800175eb245.mockapi.io/api/v1/TODOIST").then(res => res.json())
  return axios.get("/TODOIST").then((res) => res.data);
}

export function createTodo(newTodo) {
  // 	const options = {
  // method: "POST",
  // body: JSON.stringify(newTodo),
  // headers:{
  // 	"Content-Type": "application/json"
  // }
  // 	}
  // 		return fetch("https://61e433a4fbee6800175eb245.mockapi.io/api/v1/TODOIST", options)
  // 		.then(res => res.json())

  return axios.post("/TODOIST", newTodo).then((res) => res.data);
}

export function updateTodo(id, payload) {
  // const options = {
  //   method: "PUT",
  //   body: JSON.stringify(payload),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // return fetch(`https://61e433a4fbee6800175eb245.mockapi.io/api/v1/TODOIST/${id}`, options)
  //   .then(response => response.json())
  return axios.put(`/TODOIST/${id}`, payload).then((response) => response.data);
}

export function removeTodo(id) {
  // 	return fetch(`https://61e433a4fbee6800175eb245.mockapi.io/api/v1/TODOIST/${id}`, {
  //   method: "DELETE",
  // }).then(response => response.json());
  return axios.delete(`/TODOIST/${id}`).then((response) => response.data);
}
