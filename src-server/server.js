import express from 'express';
import path from 'path';
import axios from 'axios';
import {initSocket} from './socketIO.js';

const app = express();
const __dirname = path.resolve();
const publicDir = path.join(__dirname, '../dist');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

app.use(express.static(publicDir));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/*', function (req, res) {
	res.sendFile('index.html', {root: publicDir});
});

const server = app.listen(80, () => {
	console.log('Main Server started ');

	//socket
	initSocket(server);
});