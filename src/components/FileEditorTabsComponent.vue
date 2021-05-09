<template>
	<div class="file-editor-tabs-component">
		<div class="one-tab-container" v-for="(name, index) in tabs" :key="index" :class="{selected: name === selectedTab}">
			<div @click="selectTabAction(name)" class="name" :title="name">{{ name }}</div>
			<img @click.stop="closeTabAction(name)" class="delete" alt="delete-icon" src="@/assets/close-icon.svg">
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
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
$border: #c9c9c9;
.file-editor-tabs-component {
	width: 100%;
	height: 50px;
	display: flex;
	border: 1px solid $border;

	.one-tab-container {
		position: relative;
		height: 50px;
		display: flex;
		align-items: center;
		cursor: pointer;
		border-inline-end: 1px solid $border;

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

		&.selected{
			border-bottom: 1px solid #ffffff;
		}
	}
}
</style>