<template>
	<div class="file-editor-tabs-component">
		<div class="one-tab-container" v-for="(name, index) in tabs" :key="index"
			:class="{selected: name === selectedTab}">
			<div @click="selectTab(name)" class="name" :title="name">{{ name }}</div>
			<img @click.stop="closeTab(name)" class="delete" alt="delete-icon" src="@/assets/close-icon.svg">
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
	name: "FileEditorTabsComponent",
	props: {},
	data() {
		return {}
	},
	computed: {
		...mapState({
			tabs: state => state.files.fileTabs,
			selectedTab: state => state.files.selectedTab
		})
	},
	methods: {
		...mapActions('files', [
			'selectTabAction',
			'closeTabAction'
		]),
		selectTab(name) {
			this.selectTabAction(name);
			/*
			* socket
			* */
			this.$parent.socket.emit('read file', name);
		},
		closeTab(name){
			this.$parent.socket.emit('remove from room', name);
			this.closeTabAction(name);
		}
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
@import './src/scss/const';

.file-editor-tabs-component {
	width: 100%;
	height: 50px;
	display: flex;
	border: 1px solid $border;
	box-sizing: border-box;

	.one-tab-container {
		position: relative;
		height: 50px;
		display: flex;
		align-items: center;
		cursor: pointer;
		border-inline-end: 1px solid $border;
		background-color: $zebra;

		.name {
			padding: 16px 25px 16px 16px;
		}

		.delete {
			position: absolute;
			top: 0;
			right: 0;
			padding: 4px;

			&:hover {
				transform: scale(1.1);
			}
		}

		&.selected {
			border-bottom: 1px solid #ffffff;
			background-color: #ffffff;

			.name {
				text-shadow: 2px 2px $border;
			}
		}
	}
}
</style>