varUrl="";
numTabs=0;

function setNumTabs(inp)
{
	numz = inp;
	
}
function createTab()
{
	var urls =document.getElementById("urls").value;
	var urlstr = urls.split(',');
	alert(urlstr[1]);
	chrome.windows.create({url: urlstr});
}
function getNum() 
{
	chrome.tabs.getAllInWindow(null, function (tabs) {
			numTabs=tabs.length;
			document.getElementById("numt").innerHTML=tabs.length;
			});
						
}

function getUrl()
{
		this.getNum();
		
		
		chrome.tabs.query({'currentWindow': true}, function (tabs) {
		var tempurl="";
		var len=document.getElementById("numt").innerHTML;
		for(var i=0;i<len;i++)
		{
		tempurl = tabs[i].url+","+tempurl;
		}
		tempurl = tempurl.substring(0,tempurl.length - 1);
		document.getElementById("urls").value=tempurl;
		});
}

 document.addEventListener('DOMContentLoaded', function () {
	getUrl();
	var openv = document.getElementById('open');
	openv.addEventListener('click', createTab);
});