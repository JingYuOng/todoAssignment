const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json())
const adminRoutes = require('./routes/admin');

// app.use(bodyParser.urlencoded());
// app.use(function (req, res, next) {
// 	res.setHeader("Content-Type", "application/json");
// 	next();
// });


// Please replce the mongo altas url with your username and password !!
mongoose
	.connect(
		'mongodb+srv://jingyu:JwhyReus1212@cluster0-1l2z3.mongodb.net/todo?retryWrites=true&w=majority'
	)
	.then(result => {
		console.log("Mongoose Atlas connected succesfully!")
		app.listen(5000);
	})
	.catch(err => {
		console.log("Mongoose Connected Fail ");
		console.log(err)
	})

app.use('/', adminRoutes);