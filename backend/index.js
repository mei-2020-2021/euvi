const express = require('express')
const sequelize = require('./sequelize/_index')
const models = require('./sequelize/models/_index')
const app = express()
const port = 3000
const User = require('./sequelize/models/user.model')

const database = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		await sequelize.sync({ force: true })
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

database();

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})