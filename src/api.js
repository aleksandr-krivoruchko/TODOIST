export function saveData(key, payload) {
	const delay = ~~ (Math.random() * 3000);

return new Promise((resolve, reject) => {
setTimeout(() => {
	localStorage.setItem(key, JSON.stringify(payload));
resolve();
	}, delay)
})
}

export function fetchTodos(key) {
const delay = ~~ (Math.random() * 3000);

return new Promise((resolve, reject) => {
setTimeout(() => {
try {
		resolve(JSON.parse(localStorage.getItem(key)));
	} catch (error) {
reject("ERROR loading TODOS (((");
	}
	}, delay)
})
}