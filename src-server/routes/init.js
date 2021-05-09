import express from 'express';
// import mongoose from 'mongoose';
// import fs from 'fs';
import path from "path";
import FilesRouter from './filesRouter.js';

const __dirname = path.resolve();
const publicDir = path.join(__dirname, '../dist');

const initRoutes = (app) => {
	app.use(express.static(publicDir));
	app.use(express.urlencoded({extended: true}));

	app.use(FilesRouter);

	app.get('/api/*', (req, res) => {
		res.write(`404`);
		res.end();
	});

};

export default initRoutes;