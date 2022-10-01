const express = require('express');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv');

const app = express();
app.use(express.static('public'));
const port = 3000;

const getCSVData = (path) => {
	const data = [];
	return new Promise((resolve, reject) => {
		fs.createReadStream(path)
			.pipe(parse({ delimiter: ';' }))
			.on('data', (row) => {
				data.push(row);
			})
			.on('end', function () {
				resolve(data);
			})
			.on('error', function (error) {
				reject(error);
			});
	});
};

app.get('/', (req, res) => {
	res.redirect('/assignment-1');
});

app.get('/assignment-1', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/assignment-2', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index2.html'));
});

app.get('/get-data', async (req, res) => {
	const authorData = await getCSVData('./data/authors.csv');
	const booksData = await getCSVData('./data/books.csv');
	const magazineData = await getCSVData('./data/magazines.csv');

	res.json({
		success: true,
		authorData,
		booksData,
		magazineData,
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
