const express = require('express')
const mysql = require('mysql')
const morgan = require('morgan')
require('dotenv').config();


// initialization express
const app = express()

// port
const port = process.env.port || 3000

// Mysql connection
var connection = mysql.createConnection({
	host     : process.env.DB_HOST,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_DATABASE
})
// check connection
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack)
		return
	}
})
// Middleware
app.use(morgan('dev'));
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  	res.send('Hello world')

})

app.get('/customers', (req, res) => {
  	const sql = 'SELECT * FROM customers'
	connection.query(sql, (err, results) => {
		if(err) throw err
		if(results.length > 0){
			res.json(results)
		}else{
			res.send('no result')
		}

	})
}) 

app.get('/customers/:id', (req, res) => {
	const { id } = req.params
	const sql = `SELECT * FROM customers WHERE id = ${id}`
	connection.query(sql, (err, result) => {
		if(err) throw err
		if(result.length > 0){
			res.json(result)
		}else{
			res.send('no result')
		}

	})
}) 

app.post('/add', (req, res) => {
	const sql = 'INSERT INTO customers SET ? '

	const customerObj = {
		firstName: req.body.firstName,
    	lastName: req.body.lastName,
    	city: req.body.city
	}
	connection.query(sql, customerObj, error =>{
		if (error) throw error
		res.send('Costumer created')
	})
})

app.put('/update/:id', (req, res) => {
	const {id} = req.params
	const {firstName, lastName, city} = req.body
	const sql = `UPDATE customers SET firstName = '${firstName}', lastName = '${lastName}', city = '${city}' WHERE id = ${id}`
	connection.query(sql, error =>{
		if (error) throw error
		res.send('Costumer delete')
	})
})

app.delete('/delete/:id', (req, res) => {
	const {id} = req.params
	const sql = `DELETE FROM customers WHERE id = ${id}`
	connection.query(sql, error =>{
		if (error) throw error
		res.send('Customer update')
	})
})
// Listen server
app.listen(port, () => console.log(`Server running on port ${port}`))

// check connection database
