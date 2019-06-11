const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json('alive');
});

server.get('/api/posts/', (req, res) => {
	db
		.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => err.status(500).json({ message: "Can't get post data." }));
});

server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db
		.findById(id)
		.then((post) => {
			post.length <= 0
				? res.status(404).json({ message: 'Post was not found' })
				: res.status(200).json(post);
		})
		.catch((err) => err.status(500).json({ message: "Can't get post data." }));
});

server.post('/api/posts/', async (req, res) => {
	console.log('body', req.body);
	try {
		const postData = req.body;
		const post = await db.insert(postData);
		res.status(201).json(postData);
	} catch (err) {
		res.status(500).json({ message: 'Error when creating post.', error });
	}
});

 server.delete('/api/posts/:id', (req, res) => {
	db
		.remove(req.params.id)
		.then((count) => {
			count
				? res.status(200).json({ message: 'Post successfully deleted.' })
				: res.status(404).json({ message: 'Post was not found or already deleted.' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error deleting post.' });
    });
server.put('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db
		.update(id, changes)
		.then((count) => {
			count
				? res.status(200).json({ message: 'Post successfuly updated.' })
				: res.status(404).json({ message: 'That post was not found or already updated.' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating post.', err });
		});
});
});
 server.get('/posts/', (req, res) => {
	const { id } = req.query;
 	id ? db.findById(id).then((posts) => res.send(posts)) : db.find().then((posts) => res.send(posts));
});

 const port = 9000;
 server.listen(port);