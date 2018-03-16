$(document).ready(function()
{
	$.ajax({
        url: 'https://jsonmergingtest.azurewebsites.net/groupJSON.json',
        dataType: 'html',
        success: function(data) 
		{
            var json = JSON.parse(data);
			console.log(json);
			
			for (i = 0; i < 4; i++)
			{	
				document.getElementById(i).innerHTML = "First Name: " + json.members[i].FirstName + "<br>";
				document.getElementById(i).innerHTML += "Last Name: " + json.members[i].LastName + "<br>";
				document.getElementById(i).innerHTML += "Preferred Name: " + json.members[i].PreferredName + "<br>";
				document.getElementById(i).innerHTML += "Team Name: " + json.members[i].TeamName + "<br>";
				document.getElementById(i).innerHTML += "Seat Location: " + json.members[i].SeatLocation + "<br>";
				document.getElementById(i).innerHTML += "Roles: " + json.members[i].Roles + "<br>";
			}
        }
    });
	
});
