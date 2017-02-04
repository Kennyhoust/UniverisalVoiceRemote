/**
 * myapi.js
 * 
 * @version 1.1 - updated for Express 4.x : April 2015
 *
 * 
 * DESCRIPTION:
 * a "HELLO WORLD" server-side application to demonstrate running a node 
 * API Appserver on a Raspberry Pi to access IOs
 * Uses the Express node packages. 
 * 
 * 
 * @throws none
 * @see nodejs.org
 * @see express.org
 * 
 * @author Robert Drummond
 * (C) 2013 PINK PELICAN NZ LTD
 */

var http      = require('http');
var express   = require('express');
var exec = require('child_process').exec;
var app       = express();



// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/dev/:id/:key', function (req, res) {	
	console.log(new Date()+':' + 'irsend SEND_ONCE '+req.params.id.toUpperCase()+' '+'KEY_'+req.params.key.toUpperCase());
	exec('irsend SEND_ONCE '+req.params.id.toUpperCase()+' '+'KEY_'+req.params.key.toUpperCase() ,function(err,stdout,stderr){
		if(err!=null){
      			console.log(err,stdout,stderr);
		}
 	})
	// send an object as a JSON string
 	console.log(new Date()+':' + req.params.id+'/'+req.params.key);
	res.send('done');
}); // apt.get()


// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');
