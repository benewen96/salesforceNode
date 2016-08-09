var SFserver = require("./conn.js");

module.exports = {
    //params: conn: connection instance, callback: return object
    newRecord : function(name, callback) {
    SFserver.Connect(function(err, connection) { //connect to sf
    	if(err) {
    		return(err);
    	}
    	else {
    		console.log('Connect success');

    		connection.sobject("Record__c").create({ Name : name }, function(err, ret) {
	            if (err || !ret.success) { return callback(err); } //if internal error or sf error return the error
	            return callback('RECORD CREATED: ' + ret.id);
	        });

    	}
    });
},

recordCount : function(callback) {
	var total = undefined;
		SFserver.Connect(function(err, connection) { //connect to sf
			if(err) {
				return(err);
			}
			else {

				connection.query("SELECT Id, Name FROM Record__c", function(err, result) {
					if (err) { return console.error(err); }
					return callback(result.totalSize);
				});
			}
		});
	},

	getRecords : function(callback) { //return all records
		var queryRes = [];
	SFserver.Connect(function(err, connection) { //connect to sf
		if(err) {
			return(err);
		}
		else {

			connection.query("select Name, Id from Record__c")
				.on("record", function(record) { //on emit of a record
					queryRes.push(record);
				})
				.on("end", function(record) {	 //when query finished
					return callback(queryRes);
				})
				.on("error", function(error) {   //on emit of an error
					console.error(err); 
				}).run();

				
			}
		});
},
//deletes a record from salesforce
deleteRecord : function(name, callback) {
	SFserver.Connect(function(err, connection) {
		if(err) {
			return(err);
		}
		else {
			connection.sobject("Record__c")
			.select("*")
			.where({Name : name})
			.destroy(function(err, records) {
				if(err) { return console.error(err)};
				return callback('deleted' + records.id);
			})

		}
	})
},

	deleteRecords : function(callback) { //delete records will return to a user defined callback when appropriate
	//callback trace (2) -------|________|
	var queryRes = [];
	SFserver.Connect(function(err, connection) { //connect to sf
		if(err) {
			return(err);
		}
		else {
			var deleteResults = function() {
				connection.sobject("Record__c")
				.destroy(function(err, rets) {
					if(err) {return console.log(err); }
							//something useful to return to our callback
							return callback(queryRes); //trace start (1)
						});
			}

			connection.query("select Name, Id from Record__c")
				.on("record", function(record) { //on emit of a record
					queryRes.push(record);
				})
				.on("end", function(record) {	 //when query finished
					deleteResults();
				})
				.on("error", function(error) {   //on emit of an error
					console.error(err); 
				}).run();

				
			}
		});
},

//deletes the specified record
deleteRecord : function(name, callback) {
	SFserver.Connect(function(err, connection) {
		if(err) {
			return(err);
		}
		else {
			connection.sobject("Record__c")
			.select("*")
			.where({Name : name})
			.destroy(function(err, records) {
				if(err) { return console.error(err)};
				return callback('deleted' + records.id);
			})

		}
	})
},

//updated the specified record //NOT WORKING HARDCODED ID
updateRecord : function(object, id, attribute, changes, callback) {
	SFserver.Connect(function(err,connection) {
		if(err) {
			return(err);
		}
		else {
			connection.sobject(object).update({ 
				Id : 'a0058000005b5tD',
				attribute : changes
			}, function(err, ret) {
				if (err || !ret.success) { return console.error(err, ret); }
				return callback('success');
			});
		}
	})
}

}


