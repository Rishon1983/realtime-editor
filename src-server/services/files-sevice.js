import fs from 'fs';

const filesFolder = './files-data/';
const getFileNames = () => {
	return fs.readdirSync(filesFolder) || [];
}

const readFile = (name) => {

	try {
		return fs.readFileSync(filesFolder + name, 'utf8');

	} catch (err) {
		// handle the error
		console.error(err.message);
		return null;
	}
}

const deleteFile = (name) => {

	try {
		fs.unlinkSync(filesFolder + name);
		return name;
	} catch (err) {
		// handle the error
		console.error(err.message);
		return null;
	}
}

const createFile = (name, data = '') => {

	try {
		fs.writeFileSync(filesFolder + name, data);
		return name;
	} catch (err) {
		// handle the error
		console.error(err.message);
		return null;
	}
}

export {
	getFileNames,
	deleteFile,
	createFile,
	readFile
}