import {getFilesData} from '../models/files.js'

const getFiles = async (req, res) => {
	const data = req.body;

	const filesData = await getFilesData(data);

	await res.json({
		ok: true,
		result: {
			filesData
		},
		errMsg: ''
	});
}

export default {
	getFiles
};