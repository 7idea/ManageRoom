const express = require('express');
const app = express();
const fetch = require("node-fetch")
const db = require('./user.json');
const fs = require('fs');
const { response, json } = require('express');
const moment = require('moment')

const mainIP = 'http://209.97.169.9/ruayusers'

let setHeader = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET'); 
	res.setHeader('Access-Control-Allow-Methods', 'PUT'); 
	next()
}

app.use(setHeader)

app.get('/', (req, res) =>{
    res.send('go go go')
});	


app.get('/all', (req, res) =>{
    let url = 'http://209.97.169.9/ruayusers'

    fetch(url)
        .then(response => response.json())
			.then(commits => {
				//console.log(commits[0]);
				var mostdepCount = commits.filter( user => user.deposit_count >= 0)
				console.log('Get all user length : ' + mostdepCount.length);

				res.send(commits);				
			})    
})

app.get('/alluser', (req, res) => {
	let url = mainIP
	res.setHeader('Access-Control-Allow-Origin', '*');
	fetch(url)
		.then(user => user.json())
		.then(user => {		
			res.send(user)

		})
})

app.get('/user/:id', (req, res) => {
	let url = mainIP + '/' + req.params.id
	fetch(url).then(user => 
		user.text()
	)
		.then(user =>{
			// console.log(user);
			if(user != 'Not Found'){
				user = JSON.parse(user)
			}
			
			res.send(user)
		})

	
})

app.put('/editroom/:id/:roomname', (req, res) => {
	
	var url = mainIP + '/' + req.params.id
	console.log(url);
	fetch(url, {
		method : 'PUT',
		headers : {	'Content-Type' : 'application/json'	},		
		body : JSON.stringify({room: req.params.roomname})
	})
		.then(response => response.json())
		.then(user =>{ 
			console.log(user);
			if(user.hasOwnProperty("error")){
				user = { 'status' : 'Not Found'}

			}
			res.json(user)
		})
})

const port = 8080;
app.listen(port, ()=>{
	
	
    console.log("Start service at port: " + port);
})