import axios from "axios";

const state = {
	fileNames: [],
	fileTabs: []
};

// getters are functions.
const getters = {};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {

	getFileNamesAction({commit}) {
		axios.post('http://localhost:80/api/v1/getFiles').then(res => {
			commit('getFileNames', res.data);
		})
	},

	settingsAction({commit}, data) {

		data.userId = localStorage.getItem('userId');
		axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem('token');
		axios.post('http://localhost:80/api/v1/cymulateSettings', data).then(res => {
			commit(data.action + 'Settings', res.data.result);
		})
	},
	loginClient({commit}, data) {
		axios.post('http://localhost:80/api/v1/cymulateLogin', data).then(res => {
			commit('login', res.data.result);
		})
	}
};
// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	getFileNames(state, res) {
		state.fileNames = res;
	},

	getSettings(state, res) {
		state.cymulateSettings = res.settingsArray;
		state.cymulateSettingsHeaderAction = 'All Settings';
	},
	createSettings(state, res) {
		state.cymulateSettings = res.settingsArray;
		state.cymulateSettingsHeaderAction = 'Created Settings';
	},
	updateSettings(state, res) {
		state.cymulateSettings = res.settingsArray;
		state.cymulateSettingsHeaderAction = 'Updated Settings';
		//if we want all updated list
		// state.cymulateSettings.forEach(settings => {
		//     if (settings._id === res.settingsArray._id) {
		//         settings.key = res.settingsArray.key;
		//     }
		// })
	},
	deleteSettings(state, res) {
		state.cymulateSettings = res.settingsArray;
		state.cymulateSettingsHeaderAction = 'Deleted Settings';
	},
	login(state, res) {
		if (res.login) {
			state.userName = res.login.username;
			state.login = true;
			localStorage.setItem('token', res.token)
			localStorage.setItem('userId', res.login._id)
		}
	}
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}