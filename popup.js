let colorBoxBackground = document.getElementById('colorBoxBackground');
let imageBoxBackground = document.getElementById('imageBoxBackground');
let blueBarBoxBackground = document.getElementById('blueBarBoxBackground');

var colour;
var setting;

function truncate(n, len) {
    var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
    var filename = n.replace('.' + ext,'');
    if(filename.length <= len) {
        return n;
    }
    filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
    return filename + '.' + ext;
};

colorBoxBackground.onchange = function(){
	console.log("MasukColor");
	localStorage["BackgroundColor"] = colorBoxBackground.value;
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 	'document.body.style.backgroundColor = "' + localStorage["BackgroundColor"] + '";'+
					'if(document.getElementById("content")!=null)document.getElementById("content").firstChild.firstChild.style.backgroundColor = "transparent";'+
					'if(document.getElementById("contentCol")!=null)document.getElementById("contentCol").style.backgroundColor = "transparent";'+
					'if(document.getElementById("pagelet_timeline_recent")!=null)document.getElementById("pagelet_timeline_recent").style.backgroundColor = "transparent";'});
	});
}

function resetColorBox(){
	var reset;
	if(localStorage["BackgroundImage"] == null || localStorage["BackgroundImage"] == ''){
		reset = 'if(document.getElementById("content")!=null)document.getElementById("content").firstChild.firstChild.style.backgroundColor = "";'+
				'if(document.getElementById("contentCol")!=null)document.getElementById("contentCol").style.backgroundColor = "";'+
				'if(document.getElementById("pagelet_timeline_recent")!=null)document.getElementById("pagelet_timeline_recent").style.backgroundColor = "";';
	} else {
		reset = '';
	}
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 	'document.body.style.backgroundColor = "";'+
					reset});
	});
	colorBoxBackground.value = '';
	localStorage["BackgroundColor"] = '';
}

imageBoxBackground.onchange = function(){
	console.log("MasukImage");
	var fileName = $(this).val();
	$(this).next('.custom-file-label').html(truncate(fileName.replace(/^.*[\\\/]/, ''), 15));
	var tgt = this.target || window.event.srcElement, 
	files = tgt.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            localStorage["BackgroundImage"] = fr.result;
            //document.body.style.backgroundImage = 'url(' + fr.result + ')'; //Change Body background become image
            chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			chrome.tabs.executeScript(
				tabs[0].id,
				{code:  'document.body.style.backgroundImage = "url(' + fr.result + ')";'+ 
						'if(document.getElementById("content")!=null)document.getElementById("content").firstChild.firstChild.style.backgroundColor = "transparent";'+
						'if(document.getElementById("contentCol")!=null)document.getElementById("contentCol").style.backgroundColor = "transparent";'+
						'if(document.getElementById("pagelet_timeline_recent")!=null)document.getElementById("pagelet_timeline_recent").style.backgroundColor = "transparent";'+
						setting});
			});
        }
        fr.readAsDataURL(files[0]);
    }
}

function resetImageBox(){
	var reset = 'if(document.getElementById("content")!=null)document.getElementById("content").firstChild.firstChild.style.backgroundColor = "";'+
				'if(document.getElementById("contentCol")!=null)document.getElementById("contentCol").style.backgroundColor = "";'+
				'if(document.getElementById("pagelet_timeline_recent")!=null)document.getElementById("pagelet_timeline_recent").style.backgroundColor = "";';
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 	'document.body.style.backgroundImage = "";'+
					reset});
	});
	localStorage["BackgroundImage"] = '';
}

$('input[type=radio][name=optradio]').change(function () {
	if (this.value == 'CenterNo') {
        localStorage["Setting"] = 'CenterNo';
        var setting = 'document.body.style.backgroundSize = "100% auto"; document.body.style.backgroundPosition = "center"; document.body.style.backgroundRepeat = "no-repeat"; document.body.style.backgroundAttachment = "fixed";';
    }
    else if (this.value == 'CenterWith') {
        localStorage["Setting"] = 'CenterWith';
        var setting = 'document.body.style.backgroundSize = "100% auto"; document.body.style.backgroundPosition = "center top"; document.body.style.backgroundRepeat = "repeat-y"; document.body.style.backgroundAttachment = "";';
    }
    if(localStorage["BackgroundImage"] != null || localStorage["BackgroundImage"] != ''){
    	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			chrome.tabs.executeScript(
				tabs[0].id,
				{code: setting});
		});
    }
});

blueBarBoxBackground.onchange = function(){
	console.log("MasukBlueBar");
	localStorage["BarColor"] = blueBarBoxBackground.value;
	
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 	'document.getElementById("bluebarRoot").firstChild.style.backgroundColor = "' + localStorage["BarColor"] + '";'+
					'document.getElementById("bluebarRoot").firstChild.style.border = "1px solid ' + localStorage["BarColor"] + '";'
					});
	});
}

function resetBlueBarBox(){
	var reset = 'document.getElementById("bluebarRoot").firstChild.style.backgroundColor = "";'+
				'document.getElementById("bluebarRoot").firstChild.style.border = "";';
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 	reset});
	});
	blueBarBoxBackground.value = '';
	localStorage["BarColor"] = '';
}

function resetClearAll(){
	resetColorBox();
	resetImageBox();
	resetBlueBarBox();
	localStorage.clear();
}

$( document ).ready(function() {
	$('#colorBoxBackground').val(localStorage["BackgroundColor"]);
	$('#colorBoxBackground').colorpicker();
	$('#blueBarBoxBackground').val(localStorage["BarColor"]);
	$('#blueBarBoxBackground').colorpicker();
	$("#ResetColor").click(resetColorBox);
	$("#ResetImage").click(resetImageBox);
	$("#ResetFbBar").click(resetBlueBarBox);
	$("#ResetAll").click(resetClearAll);
	$("input[name=optradio][value=" + localStorage["Setting"] + "]").prop('checked', true);
});