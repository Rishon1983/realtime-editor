import {getFileNames} from '../models/files.js'

const getFiles = async (req, res) => {
	const data = req.body;

	res.json(getFileNames(data));
}

export default {
	getFiles
};