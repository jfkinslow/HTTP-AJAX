const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
let baseDir = __dirname;
const friendsFilePath = path.resolve(baseDir, './friends.json').toString();
const configFilePath = path.resolve(baseDir, './config.json');

const app = express();
let nextId = 7;

function getNewId() {
	return nextId++;
}
let newFriends = [
	{
		id: 1,
		name: 'Ben',
		age: 30,
		email: 'ben@lambdaschool.com',
	},
	{
		id: 2,
		name: 'Austen',
		age: 32,
		email: 'austen@lambdaschool.com',
	},
	{
		id: 3,
		name: 'Ryan',
		age: 35,
		email: 'ryan@lambdaschool.com',
	},
	{
		id: 4,
		name: 'Sean',
		age: 35,
		email: 'sean@lambdaschool.com',
	},
	{
		id: 5,
		name: 'Michelle',
		age: 67,
		email: 'michelle@gmail.com',
	},
	{
		id: 6,
		name: 'Luis',
		age: 47,
		email: 'luis@lambdaschool.com',
	},
];

let configFile = fs.readFileSync(configFilePath);
let config = JSON.parse(configFile);
let friends = [];
console.log(config);

if (config.first_run === true) {
	let jsonOut = JSON.stringify(newFriends);
	fs.writeFileSync(friendsFilePath, jsonOut);
	config.first_run = false;
	friends = newFriends;
	jsonOut = JSON.stringify(config);
	fs.writeFileSync(configFilePath, jsonOut);
} else {
	let jsonIn = fs.readFileSync(friendsFilePath);
	friends = JSON.parse(jsonIn);
}
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'friends/build/static')));
app.use('/', express.static(path.join(__dirname, 'friends/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/friends/build/index.html'));
});

app.get('/friends', (req, res) => {
	res.status(200).json(friends);
});

app.post('/friends', (req, res) => {
	const friend = { id: getNewId(), ...req.body };
	friends = [...friends, friend];
	let jsonOut = JSON.stringify(friends);
	fs.writeFileSync(friendsFilePath, jsonOut);
	res.status(201).json(friends);
});

app.put('/friends/:id', (req, res) => {
	const { id } = req.params;
	let friendIndex = friends.findIndex(friend => friend.id == id);

	if (friendIndex >= 0) {
		friends[friendIndex] = { ...friends[friendIndex], ...req.body };
		let jsonOut = JSON.stringify(friends);
		fs.writeFileSync(friendsFilePath, jsonOut);
		res.status(200).json(friends);
	} else {
		res.status(404).json({ message: `The friend with id ${id} does not exist.` });
	}
});

app.delete('/friends/:id', (req, res) => {
	friends = friends.filter(friend => friend.id != req.params.id);
	let jsonOut = JSON.stringify(friends);
	fs.writeFileSync(friendsFilePath, jsonOut);

	res.status(200).json(friends);
});

app.listen(config.port, () => {
	console.log(`server listening on port ${config.port}`);
});
