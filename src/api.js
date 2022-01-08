export function saveData(key, payload) {
	localStorage.setItem(key, JSON.stringify(payload));
}

export function loadData(key) {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (error) {
toastr.error("ERROR loading TODOS (((");
return [];
	}
}