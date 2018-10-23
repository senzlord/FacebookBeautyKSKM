if(document.getElementById("pagelet_timeline_main_column")!=null){
	var Div = document.getElementById("pagelet_timeline_main_column");
	var JSONData = Div.getAttribute("data-gt");
	JSONData = JSON.parse(JSONData);
	if (JSONData!=null) {
		console.log(JSONData);
		localStorage["ProfileID"] = JSONData["profile_owner"]; //Get Profile ID
		if(document.getElementById("fb-timeline-cover-name")!=null){
			localStorage["FBName"] = document.getElementById("fb-timeline-cover-name").innerText;
		}
		var line = document.createElement("span");
		line.setAttribute('class','alternate_name profileID');
		line.innerHTML = " "+localStorage["ProfileID"];
		document.getElementById("fb-timeline-cover-name").firstChild.appendChild(line);
	}
}

if(document.getElementById("fbTimelineHeadline")!=null){
	var Div = document.getElementById("fbTimelineHeadline").childNodes[1].firstChild;
	// var getClass = Div.firstChild.getElementsByTagName("a")[0].getAttribute("class");
	// var classes = getClass.split(" ");
	var Listing = document.createElement("li");
	var element = document.createElement("a");
	element.setAttribute('class', "_6-6");
	element.setAttribute('id', "FBCopyLink");
	element.innerHTML = "Copy";
	element.addEventListener("click", function() {
    	var link = "www.facebook.com/profile.php?id="+localStorage["ProfileID"];
    	var dummy = document.createElement("input");
		document.body.appendChild(dummy);
		dummy.setAttribute("id", "dummy_id");
		document.getElementById("dummy_id").value=link;
		dummy.select();
		document.execCommand("copy");
		alert("Permanent Link Copied");
	});
	Listing.appendChild(element);
	if(document.getElementById("FBCopyLink")==null){
		Div.appendChild(Listing);
	}
}