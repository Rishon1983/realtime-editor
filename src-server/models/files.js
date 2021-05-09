import fs from 'fs';

const filesFolder = './edit-files/';
const getFileNames = () => {
	return fs.readdirSync(filesFolder) || [];
}

export {
	getFileNames
}