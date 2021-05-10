import {getFileNames, deleteFile, createFile} from '../models/files.js'

const getFiles = async (req, res) => {
	res.json(getFileNames());
}

const fileAction = async (req, res) => {
	const data = req.body;

	let returnData = {};

	switch (data.action) {
		case 'delete':
			returnData = await deleteFile(data.name);
			if (!returnData) {
				returnData = {
					ok: false,
					errMsg: '',
					result: 'Was problem to delete file:' + data.name
				}
			} else {
				returnData = {
					ok: true,
					errMsg: '',
					result: data.name
				}
			}
			break;
		case 'create':
			returnData = await createFile(data.name);
			if (!returnData) {
				returnData = {
					ok: false,
					errMsg: '',
					result: 'Was problem to create new file:' + data.name
				}
			} else {
				returnData = {
					ok: true,
					errMsg: '',
					result: data.name
				}
			}

			break;
	}

	res.json(returnData);
}

export default {
	getFiles,
	fileAction
};