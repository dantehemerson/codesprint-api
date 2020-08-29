import express from 'express';

import './database';

const app = express();

app.use(express.json());

const portNumber = 3333;

app.listen(portNumber, () => {
	console.log('✅ - Server is listening to http://localhost:3333');
});
