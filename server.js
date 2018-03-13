var http = require('http');

var request = require('request'); // Imports libraries
var fs = require('fs');

// Define URLs here
var allURLS = ["https://csoftware.azurewebsites.net/groupinfo.json", "https://johnlaschobersoftwareengineering.azurewebsites.net/info.json", "https://cpsc440.azurewebsites.net/myInfo.json", "http://alisp18.azurewebsites.net/myinfo.json"];
// Where JSON objects will be stored
var allJSON = [];

var concattedJSON;
var finalJSON = "no";
var done = false;

var indexStack = [];

for (i = 0; i < allURLS.length; i++)
{
	indexStack.push(i);
	request(allURLS[i], function (error, response, body) 
	{
		console.log(response.statusCode);
		if (!error && response.statusCode == 200) 
		{
			var iterator = indexStack[indexStack.length - 1];
			indexStack.pop();
			var importedJSON = JSON.parse(body);
			allJSON.push(importedJSON);
			var outputString = JSON.stringify(importedJSON, null, 4);
			fs.writeFile("member" + iterator + ".json", outputString, 'utf-8', function (err)  // File writer for saving a json file, not done
			{
				if (err) 
				{
					return console.log(err);
				}
				else
				{
					if (indexStack.length == 0)
					{
						var concattedJSON = "";
						concattedJSON = '{"members":[';
						for (j = 0; j < allJSON.length; j++)
						{
							concattedJSON += JSON.stringify(allJSON[j]);
							if (j != allURLS.length - 1) 
							{
								concattedJSON += ',';
							}
						}
						concattedJSON += ']}';
						fs.writeFile("groupJSON.json", concattedJSON, 'utf-8', function (err)  // File writer for saving a json file, not done
						{
							if (err) 
							{
								return console.log(err);
							}
						});
					}
				}
			});

		}
	});
}

var server = http.createServer(function (request, response)  // On user connect
{
    response.writeHead(200, { "Content-Type": "text/plain" });
    try
    {
        var importedJSON = JSON.parse(fs.readFileSync('groupJSON.json', 'utf8'));    // Reading from input
        response.write(JSON.stringify(importedJSON, null, 4));
    }
    catch (err)
    {
        response.write("Something went wrong... " + err);
    }
	response.end("");
});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);