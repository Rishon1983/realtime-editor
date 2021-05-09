<template>
	<div class="file-editor-menu-component">
		<div class="files-list">
			<div class="one-file-container" v-for="(name, index) in files" :key="index">
				<div @click="openTabAction(name)" class="name" :title="name">{{ name }}</div>
				<img class="delete" alt="delete-icon" src="@/assets/close-icon.svg">
			</div>
		</div>
		<div class="add-new-file">
			<img class="plus-icon" alt="plus-icon" src="@/assets/plus-icon.svg">
			<div class="text">Add new file</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
	name: "FileEditorMenuComponent",
	props: {},
	data() {
		return {}
	},
	computed: {
		...mapState({
			files: state => state.files.fileNames
		})
	},
	methods: {
		...mapActions('files', [
			'openTabAction'
		]),
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
$border: #c9c9c9;
$gray_light: #ebebeb;
$menu_active: #848484;
.file-editor-menu-component {
	position: relative;
	width: 25%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	border: 1px solid $border;

	.files-list {
		width: 100%;


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
				background-color: $gray_light;
			}
		}

	}

	.add-new-file {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 15px;
		cursor: pointer;
		box-sizing: border-box;
		box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
		-webkit-box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);
		-moz-box-shadow: 0 0 13px -2px rgba(0, 0, 0, 0.4);

		.plus-icon {
			height: 16px;
			width: 16px;
		}

		.text {
			margin-inline-start: 5px;
			font-weight: bold;
		}

		&:hover {
			.plus-icon {
				transform: scale(1.1);
			}

			.text {
				text-decoration: underline;
			}
		}
	}
}
</style>