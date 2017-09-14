export default {
	localFetch (key) {
		var data = typeof(window.localStorage.getItem(key)) != "undefined" && window.localStorage.getItem(key) != null ? JSON.parse(window.localStorage.getItem(key)) : "";
		return data; 
	},
	localSave (items) {
		window.localStorage.setItem(items.key, JSON.stringify(items.value));   
	},
	localDelete (key) {
		window.localStorage.removeItem(key);
	},
	sessionFetch (key) {
		var data = typeof(window.sessionStorage.getItem(key)) != "undefined" && window.sessionStorage.getItem(key) != null ? JSON.parse(window.sessionStorage.getItem(key)) : "";
		return data; 
	},
	sessionSave (items) {
		window.sessionStorage.setItem(items.key, JSON.stringify(items.value));   
	},
	sessionDelete (key) {
		window.sessionStorage.removeItem(key);
	},
}