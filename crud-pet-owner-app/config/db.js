// Use mongoose to connect to my database
const mongoose = require("mongoose")
// To hide variables, I need a .env file

mongoose
	.connect(process.env.MONGODB_URI)
	.then((db) => {
		console.log(`Connected to ${db.connection.name}`)
	})
	.catch((e) => console.log(e))
