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
	created() {
		this.$store.dispatch('files/getFileNamesAction');
	}
}
</script>

<style lang="scss" scoped>
$border: #c9c9c9;
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