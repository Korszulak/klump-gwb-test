
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        document.getElementById("demo").innerHTML = myObj.FirstName;
		console.log(myObj[3]);
		console.log(myObj.members[0]);
		console.log(myObj.members[1]);

    }
};
xmlhttp.open("GET", "groupJSON.json", true);
xmlhttp.send();
console.log(myObj[3]);
console.log(myObj.members[0]);
console.log(myObj.members[1]);
