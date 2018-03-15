function load()
{
	for (i = 0; i < 4; i++)
	{	
		document.getElementById(i).innerHTML = "First Name: " + data.members[i].FirstName + "<br>";
		document.getElementById(i).innerHTML += "Last Name: " + data.members[i].LastName + "<br>";
		document.getElementById(i).innerHTML += "Preferred Name: " + data.members[i].PreferredName + "<br>";
		document.getElementById(i).innerHTML += "Team Name: " + data.members[i].TeamName + "<br>";
		document.getElementById(i).innerHTML += "Seat Location: " + data.members[i].SeatLocation + "<br>";
		document.getElementById(i).innerHTML += "Roles: " + data.members[i].Roles + "<br>";
	}

	console.log(data.members);
}