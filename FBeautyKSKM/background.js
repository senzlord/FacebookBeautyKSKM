chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
			  pageUrl: {hostContains: 'www.facebook.com'},
			})
			],
		    actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});


chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	console.log("Update");
	console.log(tabID);
	console.log(changeInfo);
	console.log(tab);
	var BgSet = '';
	var FbSet = '';
	var aSet = '';
	var transparent = 'if(document.getElementById("content")!=null){document.getElementById("content").firstChild.firstChild.style.backgroundColor = "transparent";} if(document.getElementById("contentCol")!=null){document.getElementById("contentCol").style.backgroundColor = "transparent";} if(document.getElementById("pagelet_timeline_recent")!=null){document.getElementById("pagelet_timeline_recent").style.backgroundColor = "transparent";}'
	var setting = 'document.body.style.backgroundSize = "100% auto"; document.body.style.backgroundPosition = "center top"; document.body.style.backgroundRepeat = "repeat-y";'; //default
	var copyFB = 
		'if(document.getElementById("fbTimelineHeadline")!=null){'+
			'var Div = document.getElementById("fbTimelineHeadline").childNodes[1].firstChild;'+
			// 'var getClass = Div.firstChild.getElementsByTagName("a")[0].getAttribute("class");'+
			// 'var classes = getClass.split(" ");'+
			'var Listing = document.createElement("li");'+
			'var element = document.createElement("a");'+
			'element.setAttribute("class", "_6-6");'+
			'element.setAttribute("id", "FBCopyLink");'+
			'element.innerHTML = "Copy";'+
			'element.addEventListener("click", function() {'+
		    	'var link = "www.facebook.com/profile.php?id="+localStorage["ProfileID"];'+
		    	'var dummy = document.createElement("input");'+
				'document.body.appendChild(dummy);'+
				'dummy.setAttribute("id", "dummy_id");'+
				'document.getElementById("dummy_id").value=link;'+
				'dummy.select();'+
				'document.execCommand("copy");'+
				'alert("Permanent Link Copied");'+
			'});'+
			'Listing.appendChild(element);'+
			'if(document.getElementById("FBCopyLink")==null){'+
				'Div.appendChild(Listing);'+
			'}'+
		'}';
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id,
			{code:  
				copyFB
			},
			function(){
				if (chrome.runtime.lastError){
			        var errorMsg = chrome.runtime.lastError.message;
			        if (errorMsg == "Cannot access a chrome:// URL"){
			            /*Error Handling Here*/
			        }
			    }
			})
		});
	if((tab["url"]!="" || tab["url"]!=null)){
	//if(changeInfo["status"] == "complete" && (tab["url"]!="" || tab["url"]!=null)){
	 	if(localStorage["BackgroundColor"] != null || localStorage["BackgroundColor"] != ''){
	    	BgSet += 'document.body.style.backgroundColor = "' + localStorage["BackgroundColor"] + '"; ';
	    }
	 	if(localStorage["BackgroundImage"] != null || localStorage["BackgroundImage"] != ''){
	    	BgSet += 'document.body.style.backgroundImage = "url(' + localStorage["BackgroundImage"] + ')"; ';
	    }
	    if(localStorage["BarColor"] != null || localStorage["BarColor"] != ''){
	    	FbSet +=	'if(document.getElementById("bluebarRoot") != null){'+
	    				'document.getElementById("bluebarRoot").firstChild.style.backgroundColor = "' + localStorage["BarColor"] + '";'+
						'document.getElementById("bluebarRoot").firstChild.style.border = "1px solid ' + localStorage["BarColor"] + '";}';
	    }
	    if(BgSet !="" || FbSet !="" || aSet != ""){
	    	if (localStorage["Setting"] == 'CenterNo') {
		        var setting = 'document.body.style.backgroundSize = "100% auto"; document.body.style.backgroundPosition = "center"; document.body.style.backgroundRepeat = "no-repeat"; document.body.style.backgroundAttachment = "fixed";';
		    }
		    else if (localStorage["Setting"] == 'CenterWith') {
		        var setting = 'document.body.style.backgroundSize = "100% auto"; document.body.style.backgroundPosition = "center top"; document.body.style.backgroundRepeat = "repeat-y"; document.body.style.backgroundAttachment = "";';
		    }
	    	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
				chrome.tabs.executeScript(
					tabs[0].id,
					{code:  
						BgSet+
						FbSet+
						aSet+
						transparent+
						setting
					},
					function(){
						if (chrome.runtime.lastError){
					        var errorMsg = chrome.runtime.lastError.message;
					        if (errorMsg == "Cannot access a chrome:// URL"){
					            /*Error Handling Here*/
					        }
					    }
					})
				});
	    }
	}
});


