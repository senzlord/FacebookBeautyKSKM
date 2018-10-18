chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
			  pageUrl: {hostContains: 'facebook.com'},
			})
			],
		    actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});

var BgSet = '';
var FbSet = '';
var transparent = 'if(document.getElementById("content")!=null)document.getElementById("content").firstChild.firstChild.style.backgroundColor = "transparent";if(document.getElementById("contentCol")!=null)document.getElementById("contentCol").style.backgroundColor = "transparent"; if(document.getElementById("pagelet_timeline_recent")!=null)document.getElementById("pagelet_timeline_recent").style.backgroundColor = "transparent";'
var setting = 'document.body.style.backgroundSize = "100% auto"; document.body.style.backgroundPosition = "center top"; document.body.style.backgroundRepeat = "repeat-y";'; //default

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	if(changeInfo["status"] == "complete" && (tab["url"]!="" || tab["url"]!=null)){
		// console.log("Update");
		// console.log(tabID);
		// console.log(changeInfo);
		// console.log(tab);
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
	    if(BgSet !="" || FbSet !=""){
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