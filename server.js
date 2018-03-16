var request = require('request'); // Imports libraries
var http = require('http');
var fs = require('fs');

// Define URLs here
var allURLS = ["https://csoftware.azurewebsites.net/groupinfo.json", "https://johnlaschobersoftwareengineering.azurewebsites.net/info.json", "https://cpsc440.azurewebsites.net/myInfo.json", "http://alisp18.azurewebsites.net/myinfo.json"];
// Where JSON objects will be stored
var allJSON = [];

var concattedJSON;
var finalJSON = "no";

function UpdateJSON(createdResponse)
{
	for (i = 0; i < allURLS.length; i++) // Initiates on server launch
	{
		request(allURLS[i], function (error, response, body)
		{
			if (!error && response.statusCode == 200) 
			{
				var importedJSON = JSON.parse(body);
				allJSON.push(importedJSON);
				//console.log(allJSON.length);
				if (allJSON.length == allURLS.length)
				{
					var concattedJSON = "";
					concattedJSON = '{"members":[';
					for (j = 0; j < allURLS.length; j++)
					{
						concattedJSON += JSON.stringify(allJSON[j]);
						if (j != allURLS.length - 1)
						{
							concattedJSON += ',';
						}
					}
					concattedJSON += ']}';
					//console.log(concattedJSON);
					finalJSON = JSON.parse(concattedJSON);
					//console.log(finalJSON);
					createdResponse.write(JSON.stringify(finalJSON, null, 4));
					createdResponse.end(); // End of http stream, can no longer update website
					
					/*
					var stringFinal = JSON.stringify(finalJSON, null, 4);
					fs.writeFile("groupJSON.json", stringFinal,'utf-8', function(err)  // File writer for saving a json file, not done
					{
						if(err) 
						{
							return console.log(err);
						}
					});
					*/
					
				}
			}
		});
	} 
}

var server = http.createServer(function(request, response)  // On user connect
{
	UpdateJSON(response); // Send respond to function because it's asynchronous
    response.writeHead(200, {"Content-Type": "text/plain"}); 

	//var importedJSON = JSON.parse(fs.readFileSync('groupJSON.json', 'utf8'));    // Reading from input
});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
