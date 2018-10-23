if(document.getElementById("pagelet_timeline_main_column")!=null){
	var Div = document.getElementById("pagelet_timeline_main_column")
	var JSONData = Div.getAttribute("data-gt");
	JSONData = JSON.parse(JSONData);
	if (JSONData!=null) {
		console.log(JSONData);
		localStorage["ProfileID"] = JSONData["profile_owner"]; //Get Profile ID
		if(document.getElementById("fb-timeline-cover-name")!=null){
			localStorage["FBName"] = document.getElementById("fb-timeline-cover-name").innerText;
		}
		var line = document.createElement("span");
		line.innerHTML = localStorage["ProfileID"];
		document.getElementById("fb-timeline-cover-name").firstChild.appendChild(line);
	}
}