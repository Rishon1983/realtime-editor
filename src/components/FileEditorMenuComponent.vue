<template>
	<div class="file-editor-menu-component">
		<div class="files-list">
			<div class="one-file-container" v-for="(name, index) in files" :key="index">
				<div @click="openTabAction(name)" class="name" :title="name">{{ name }}</div>
				<img @click="removeFile(name)" class="delete" alt="delete-icon"
					src="@/assets/close-icon.svg">
			</div>
		</div>
		<div class="add-new-file">
			<img @click="addNewFile" class="plus-icon" alt="plus-icon" src="@/assets/plus-icon.svg">
			<input placeholder="add new file" v-model="newFileName">
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
	name: "FileEditorMenuComponent",
	props: {},
	data() {
		return {
			newFileName: ''
		}
	},
	computed: {
		...mapState({
			files: state => state.files.fileNames
		})
	},
	methods: {
		...mapActions('files', [
			'openTabAction',
			'addFileAction',
			'deleteFileAction'
		]),
		addNewFile() {
			if (this.newFileName === '') return;

			const name = this.newFileName + '.txt';

			let isFileExist = false;
			for (const fileName of this.files) {
				if (fileName === name) {
					isFileExist = true;
					break;
				}
			}

			if (!isFileExist) {
				this.addFileAction(name);

				/*
				* socket
				* */
				this.$parent.socket.emit('add file', name);
				this.newFileName = '';
			}
		},

		removeFile(name) {
			this.deleteFileAction(name);
			/*
			* socket
			* */
			this.$parent.socket.emit('delete file', name);
		}
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
@import './src/scss/const';

.file-editor-menu-component {
	position: relative;
	width: 25%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	border: 1px solid $border;

	.files-list {
		width: 100%;
		height: calc(100% - 60px);
		overflow-x: hidden;
		overflow-y: auto;


		.one-file-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 40px;

			.name {
				display: flex;
				justify-content: flex-start;
				padding: 10px;
				cursor: pointer;

				&:hover {
					text-decoration: underline;
				}
			}

			.delete {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 11px;
				cursor: pointer;

				&:hover {
					transform: scale(1.1);
				}
			}

			&:nth-child(even) {
				background-color: $zebra;
			}
		}

	}

	.add-new-file {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
		-webkit-box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
		-moz-box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);

		.plus-icon {
			height: 16px;
			width: 16px;
			border: 1px solid $border;
			padding: 5px 15px;
			cursor: pointer;

			&:hover {
				transform: scale(1.1);
			}
		}

		input {
			height: 24px;
			max-width: calc(100% - 106px);
			margin-inline-start: 10px;
			padding-inline-start: 10px;
			border: 1px solid $border;
			-webkit-appearance: none;
			outline: none;
		}
	}
}
</style>