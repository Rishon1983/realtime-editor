<template>
	<div class="file-editor-body-component">
		<textarea id="realtime-textarea" v-model="editFileBody"></textarea>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
	name: "FileEditorBodyComponent",
	props: {},
	data() {
		return {
		}
	},
	computed: {
		...mapState({
			selectedTab: state => state.files.selectedTab
		}),
		editFileBody: {
			get () {
				return this.$store.state.files.editFileBody
			},
			set (value) {
				const data = {
					value,
					fileName: this.selectedTab
				}

				this.updateEditFileBodyAction(data);

				/*
				* socket
				* */
				this.$parent.socket.emit('edit file', data);
			}
		}
	},
	methods: {
		...mapActions('files', [
			'updateEditFileBodyAction'
		]),
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
@import './src/scss/const';

.file-editor-body-component {
	height: 100%;
	width: 100%;

	#realtime-textarea {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 5px;
		box-sizing: border-box;
		border: 1px solid $border;
		-webkit-appearance: none;
		outline: none;
		resize: none;
		font-size: 16px;
	}
}
</style>