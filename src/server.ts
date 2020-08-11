import express from 'express';

const app = express();

const portNumber = 3333;

app.listen(portNumber, () => {
	console.log('✅ - Server is listening to http://localhost:3333');
});
