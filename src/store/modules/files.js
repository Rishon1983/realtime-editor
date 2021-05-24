import Vue from 'vue';

const state = {
	fileNames: [],
	fileTabs: [],
	fileTabsMap: {},
	selectedTab: '',
	editFileBody: ''
};

// getters are functions.
const getters = {};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {

	getFileNamesAction({commit}, data) {
		commit('getFileNames', data);
	},

	addFileAction({commit}, data) {
		commit('addFile', data);
	},

	deleteFileAction({commit}, data) {
		commit('deleteFile', data);
	},

	editFileAction({commit}, data) {
		commit('editFile', data);
	},

	openTabAction({commit}, name) {
		commit('openTab', name);
	},

	selectTabAction({commit}, name) {
		commit('selectTab', name);
	},

	closeTabAction({commit}, name) {
		commit('closeTab', name);
	},

	updateEditFileBodyAction({commit}, data) {
		commit('updateEditFileBody', data);
	},

	stateByDefault({commit}) {
		commit('stateByDefault');
	},

};

//function for use in mutations
const deleteFileNameFromFileTabs = (state, name) => {
	const fileTabsIndex = state.fileTabs.indexOf(name);
	if (fileTabsIndex > -1) {
		state.fileTabs.splice(fileTabsIndex, 1);
		Vue.delete(state.fileTabsMap, name);
	}
	state.selectedTab = '';
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	getFileNames(state, res) {
		state.fileNames = res;
	},

	addFile(state, res) {
		state.fileNames.push(res);
	},

	deleteFile(state, res) {
		const name = res;
		const fileNameIndex = state.fileNames.indexOf(name);
		if (fileNameIndex > -1) {
			state.fileNames.splice(fileNameIndex, 1);
		}

		deleteFileNameFromFileTabs(state, name);
	},

	editFile(state, res) {
		if (res.fileName === state.selectedTab) {
			state.editFileBody = res.data;
		}

	},

	openTab(state, name) {
		if (!state.fileTabsMap[name]) {
			state.fileTabsMap[name] = true;
			state.fileTabs.push(name);
		}
	},

	selectTab(state, name) {
		state.selectedTab = name;
	},

	closeTab(state, name) {
		deleteFileNameFromFileTabs(state, name);
	},

	updateEditFileBody(state, data) {
		if (data.fileName === state.selectedTab) {
			state.editFileBody = data.value;
		}
	},

	stateByDefault(state) {
		state.fileNames = [];
		state.fileTabs = [];
		state.fileTabsMap = {};
		state.selectedTab = '';
		state.editFileBody = '';
	},
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