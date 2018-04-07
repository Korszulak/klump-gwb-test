var http = require('http');
var request = require('request'); // Imports libraries
var fs = require('fs');

var server = http.createServer(function (request, response)  // On user connect
{
	var liveHTML = '<head>\
        <meta charset="UTF-8">\
        <title>PROJECT: Klump</title>\
        <script>\
		function load()\
		{\
			var data = getJSON("https://gwb-class-info.azurewebsites.net/");\
			console.log(data);\
			data = JSON.parse(data);\
			var storedPosition = "";\
			for (i = 0; i < 6; i++)\
			{	\
				document.getElementById(i).innerHTML = "First Name: " + data.members[i].FirstName + "<br>";\
				document.getElementById(i).innerHTML += "Last Name: " + data.members[i].LastName + "<br>";\
				document.getElementById(i).innerHTML += "Preferred Name: " + data.members[i].PreferredName + "<br>";\
				document.getElementById(i).innerHTML += "Team Name: " + data.members[i].TeamName + "<br>";\
				document.getElementById(i).innerHTML += "Seat Location: " + data.members[i].SeatLocation + "<br>";\
				document.getElementById(i).innerHTML += "Roles: " + data.members[i].Roles + "<br>";\
				if (storedPosition > data.members[i].SeatLocation)\
				{\
					console.log(storedPosition + " greater than " + data.members[i].SeatLocation);\
				}\
				storedPosition = data.members[i].SeatLocation;\
			}\
			console.log(data.members);\
			function getJSON(url) \
			{\
				var resp ;\
				var xmlHttp ;\
				resp = "" ;\
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
	
	try
    {
        //var importedJSON = JSON.parse(fs.readFileSync('groupJSON.json', 'utf8'));    // Reading from input
		//console.log(JSON.parse(fs.readFileSync('groupJSON.json', 'utf8')));
        response.write(liveHTML);
		try
		{
			var lastUpdated = fs.readFileSync('lastUpdated.txt', 'utf8');
			response.write("\n");
			response.write("Last updated: " + lastUpdated);
		}
		catch (err){}
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
