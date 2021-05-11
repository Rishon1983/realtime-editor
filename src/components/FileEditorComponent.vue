<template>
	<div class="file-editor-component">
		<FileEditorMenuComponent></FileEditorMenuComponent>
		<div class="file-editor-body-with-tabs">
			<FileEditorTabsComponent></FileEditorTabsComponent>
			<FileEditorBodyComponent v-if="selectedTab !== ''"></FileEditorBodyComponent>
		</div>

	</div>
</template>

<script>
import io from 'socket.io-client';
import {mapActions, mapState} from 'vuex';
import FileEditorMenuComponent from "@/components/FileEditorMenuComponent";
import FileEditorTabsComponent from "@/components/FileEditorTabsComponent";
import FileEditorBodyComponent from "@/components/FileEditorBodyComponent";

export default {
	name: "FileEditorComponent",
	components: {
		FileEditorMenuComponent,
		FileEditorTabsComponent,
		FileEditorBodyComponent
	},
	data() {
		return {
			socket: null,
		}
	},
	created() {
		this.socketOn();
		if (!this.socket.connected) {
			this.socket.connect();
		}
		this.socket.emit('get files');
	},
	beforeDestroy() {
		this.socket.disconnect();
		this.stateByDefault();
	},
	computed: {
		...mapState({
			selectedTab: state => state.files.selectedTab
		})
	},
	methods: {
		...mapActions('files', [
			'getFileNamesAction',
			'addFileAction',
			'deleteFileAction',
			'editFileAction',
			'updateEditFileBodyAction',
			'stateByDefault'
		]),
		socketOn() {
			this.socket = io(document.location.protocol + '//' + document.location.hostname);

			this.socket.on('connect', () => {
				console.log('connected');
			});

			this.socket.on('get files', (res) => {
				this.getFileNamesAction(res.data);
			});

			this.socket.on('edit file', (res) => {
				this.editFileAction(res);
			});

			this.socket.on('read file', (res) => {
				this.updateEditFileBodyAction(res);
			});

			this.socket.on('add file', (res) => {
				this.addFileAction(res.data);
			});

			this.socket.on('delete file', (res) => {
				this.deleteFileAction(res.data);
			});
		},
	}
}
</script>

<style lang="scss" scoped>
@import './src/scss/const';

.file-editor-component {
	display: flex;
	height: calc(100vh - 185px);
	margin: 25px;
	box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
	-webkit-box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
	-moz-box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
	box-sizing: border-box;
	border: 1px solid $border;

	.file-editor-body-with-tabs {
		display: flex;
		flex-direction: column;
		width: 75%;
	}
}
</style>