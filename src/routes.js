import HomeComponent from './components/HomeComponent';
import FileEditorComponent from './components/FileEditorComponent';
import PageNotFoundComponent from "@/components/PageNotFoundComponent";

/*Create the router with route components*/
export default [
	{
		path: '/',
		component: HomeComponent
	},
	{
		path: '/files',
		component: FileEditorComponent
	},
	{
		path: "*",
		name: '404',
		component: PageNotFoundComponent,
	}
];