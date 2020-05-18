const express = require('express')
const bodyParser = required('body-parser')
const mongoose = require('mongoose');

const app = express();

const adminRoutes = require('./routes/admin');

mongoose
	.connect(
	'mongodb+srv://jingyu:JwhyReus1212@cluster0-1l2z3.mongodb.net/todo?retryWrites=true&w=majority'
	)
	.then(result => {
		console.log("Mongoose Atlas connected succesfully!")
	})
	.catch(err => {
		console.log("Mongoose Connected Fail ");
		console.log(err)
	})

	