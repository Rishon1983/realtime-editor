<template>
	<div class="file-editor-component">
		<FileEditorMenuComponent></FileEditorMenuComponent>
		<div class="file-editor-body-with-tabs">
			<FileEditorTabsComponent></FileEditorTabsComponent>
			<FileEditorBodyComponent></FileEditorBodyComponent>
		</div>

	</div>
</template>

<script>
import io from 'socket.io-client';
import {mapState} from 'vuex';
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
			socket: null
		}
	},
	created() {
		this.socketOn();
		this.$store.dispatch('files/getFileNamesAction');
	},
	computed: {
		...mapState({
			socket: state => state.files.socket,
		})
	},
	methods: {
		socketOn() {
			this.socket = io(document.location.protocol + '//' + document.location.hostname);
			this.socket.on('connect', () => {
			});
			this.socket.on('add file', (data) => {
				console.log(data);
			});


			this.socket.on('login', (data) => {
				this.logged = true;
				this.userName = data.userName;
				this.users = data.users;
			});
			this.socket.on('user-joined', (data) => {
				this.users = data.users;
				this.messages.push({
					userName: data.userName,
					type: data.type,
					message: 'joined to chat!!!'
				})
			});
			this.socket.on('new message', (data) => {
				this.messages.push(data);
			});
			this.socket.on('user-left', (data) => {
				this.users = data.users;
				this.messages.push({
					userName: data.userName,
					type: data.type,
					message: 'leave chat!!!'
				})
			});
			this.socket.on('typing', (data) => {
				this.users = data.users;
			});
			this.socket.on('stop-typing', (data) => {
				this.users = data.users;
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