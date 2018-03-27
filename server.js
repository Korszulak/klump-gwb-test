var http = require('http');

var request = require('request'); // Imports libraries
var fs = require('fs');

// Define URLs here
var allURLS = ["http://johnlaschobersoftwareengineering.azurewebsites.net/myInfo.json", "https://cpsc440.azurewebsites.net/myInfo.json"];
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

var liveHTML = '<head>\
        <meta charset="UTF-8">\
        <title>PROJECT: Klump</title>\
        <script>\
		function load()\
		{\
			try\
			{\
				var data = getJSON("https://jsonmergingtest.azurewebsites.net/groupJSON.json");\
				data = JSON.parse(data);\
				for (i = 0; i < 4; i++)\
				{	\
					document.getElementById(i).innerHTML = "First Name: " + data.members[i].FirstName + "<br>";\
					document.getElementById(i).innerHTML += "Last Name: " + data.members[i].LastName + "<br>";\
					document.getElementById(i).innerHTML += "Preferred Name: " + data.members[i].PreferredName + "<br>";\
					document.getElementById(i).innerHTML += "Team Name: " + data.members[i].TeamName + "<br>";\
					document.getElementById(i).innerHTML += "Seat Location: " + data.members[i].SeatLocation + "<br>";\
					document.getElementById(i).innerHTML += "Roles: " + data.members[i].Roles + "<br>";\
				}\
				console.log(data.members);\
			}\
			catch (err)\
			{\
				console.log("groupJSON.json could not be accessed. " + err);\
			}\
			 function getJSON(url) \
			 {\
				var resp ;\
				var xmlHttp ;\
				resp  = "" ;\
				xmlHttp = new XMLHttpRequest();\
				if(xmlHttp != null)\
				{\
					xmlHttp.open( "GET", url, false );\
					xmlHttp.send( null );\
					resp = xmlHttp.responseText;\
				}\
				return resp ;\
			}\
		}\
		</script>\
	</head>\
	<body onload="load()">\
		<p id="0"></p>\
		<p id="1"></p>\
		<p id="2"></p>\
		<p id="3"></p>\
		<p id="4"></p>\
		<p id="5"></p>\
	</body>';

var server = http.createServer(function (request, response)  // On user connect
{
    //response.writeHead(200, { "Content-Type": "text/plain" });
    try
    {
        var importedJSON = JSON.parse(fs.readFileSync('groupJSON.json', 'utf8'));    // Reading from input
        //response.write(JSON.stringify(importedJSON, null, 4));
		response.write(liveHTML);
		response.end();
    }
    catch (err)
    {
		response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Something went wrong... " + err);
		response.end();
    }

});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
