var http = require('http');
var mergeJSON = require("merge-json");
var request = require('request'); // Imports libraries
var fs = require('fs');

// Define URLs here
var allURLS = ["https://johnlaschobersoftwareengineering.azurewebsites.net/myInfo.json", "https://softwareengineeringapp.azurewebsites.net/my-information.json", "https://korszulak-static.azurewebsites.net/myInfo.json", "http://csoftware.azurewebsites.net/groupinfo.json", "https://cpsc440.azurewebsites.net/myInfo.json", "https://alisp18.azurewebsites.net/myinfo.json"];
// Where JSON objects will be stored
var allJSON = [];
var groupJSONs = [];

var concattedJSON;
var finalJSON = "no";
var done = false;

var indexStack = [];

function concatOtherGroupsJson(url)
{
	request(url, function (error, response, body) 
	{
		if (!error && response.statusCode == 200) 
		{
			var importedJSON = JSON.parse(body);
			groupJSONs.push(importedJSON);
		}
	});
}


concatOtherGroupsJson("http://gwb-json-info.azurewebsites.net/");
concatOtherGroupsJson("https://flamingos.azurewebsites.net/json");


var liveHTML = '<head>\
-        <meta charset="UTF-8">\
-        <title>PROJECT: Klump</title>\
-        <script>\
-		function load()\
-		{\
-			try\
-			{\
-				var data = getJSON("https://jsonmergingtest.azurewebsites.net/groupJSON.json");\
-				data = JSON.parse(data);\
-				for (i = 0; i < 4; i++)\
-				{	\
-					document.getElementById(i).innerHTML = "First Name: " + data.members[i].FirstName + "<br>";\
-					document.getElementById(i).innerHTML += "Last Name: " + data.members[i].LastName + "<br>";\
-					document.getElementById(i).innerHTML += "Preferred Name: " + data.members[i].PreferredName + "<br>";\
-					document.getElementById(i).innerHTML += "Team Name: " + data.members[i].TeamName + "<br>";\
-					document.getElementById(i).innerHTML += "Seat Location: " + data.members[i].SeatLocation + "<br>";\
-					document.getElementById(i).innerHTML += "Roles: " + data.members[i].Roles + "<br>";\
-				}\
-				console.log(data.members);\
-			}\
-			catch (err)\
-			{\
-				console.log("groupJSON.json could not be accessed. " + err);\
-			}\
-			 function getJSON(url) \
-			 {\
-				var resp ;\
-				var xmlHttp ;\
-				resp  = "" ;\
-				xmlHttp = new XMLHttpRequest();\
-				if(xmlHttp != null)\
-				{\
-					xmlHttp.open( "GET", url, false );\
-					xmlHttp.send( null );\
-					resp = xmlHttp.responseText;\
-				}\
-				return resp ;\
-			}\
-		}\
-		</script>\
-	</head>\
-	<body onload="load()">\
-		<p id="0"></p>\
-		<p id="1"></p>\
-		<p id="2"></p>\
-		<p id="3"></p>\
-		<p id="4"></p>\
-		<p id="5"></p>\
-	</body>';

var server = http.createServer(function (request, response)  // On user connect
{
    //response.writeHead(200, { "Content-Type": "text/plain" });
	
	//var combined = Object.assign(groupJSONs[0], groupJSONs[1]);
	var combined = mergeJSON.merge(groupJSONs[0], groupJSONs[1]);
	
    try
    {
        //var importedJSON = JSON.parse(fs.readFileSync('groupJSON.json', 'utf8'));    // Reading from input
		//console.log(JSON.parse(fs.readFileSync('groupJSON.json', 'utf8')));
        response.write(JSON.stringify(combined));
		try
		{
			var lastUpdated = fs.readFileSync('lastUpdated.txt', 'utf8');
			response.write("\n");
			response.write("Last updated: " + lastUpdated);
		}
		catch (err){}
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
