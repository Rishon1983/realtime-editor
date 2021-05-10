import fs from 'fs';

const filesFolder = './edit-files/';
const getFileNames = () => {
	return fs.readdirSync(filesFolder) || [];
}

const deleteFile = (name) => {

	try {
		fs.unlinkSync(filesFolder + name);
		return 'successfully deleted file: ' + name;
	} catch (err) {
		// handle the error
		console.error(err.message);
		return null;
	}
}

const createFile = (name) => {

	try {
		fs.writeFileSync(filesFolder + name, '');
		return 'successfully created new file: ' + name;
	} catch (err) {
		// handle the error
		console.error(err.message);
		return null;
	}
}

export {
	getFileNames,
	deleteFile,
	createFile
}