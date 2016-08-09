var SFserver = require("./conn.js");
var recordIO = require("./record.js");
var express = require("express");
var bodyParser = require('body-parser');
var conn = undefined;
var server = express();
var records = undefined;
var i = 0;
server.use(bodyParser());
server.use(express.static('./public'));

//BIND ALL THE RECORD IO METHODS TO EXPRESS URLS

server.get('/', function(req, res) {
	res.sendfile('./public/index.html');
	//console.log(records);
});

server.get('/total', function(req,res) {
	recordIO.recordCount(function(count) {
		res.json(count);
	});
});

server.get('/show', function(req, res) {
	recordIO.getRecords(function(ret) {
		res.json(ret);
	});
});

server.get('/delete', function(req, res) {
	recordIO.deleteRecord(req.body.text, function(ret) {
		res.json(ret);
	});
});

server.get('/update/:object/:id/:attribute/:changes', function(req, res) {
	recordIO.updateRecord(req.params.object, req.params.object.id, req.params.attribute, req.params.changes, function(ret) {
		res.json(ret);
	});
});

server.get('/del', function(req, res) {
	//execute delete records function, when it completes, call function(info) callback
	recordIO.deleteRecords(function(infoArray) { //callback trace finish (3)
		res.json(infoArray);
	});
});

server.post('/', function(req, res) {
	recordIO.newRecord(req.body.text,function(info) {
		console.log(req.body.text);
		res.json(info);
	});
});

server.listen(process.env.PORT, process.env.IP, function () {
  console.log('App started!');
});
