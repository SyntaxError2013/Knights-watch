varUrl="";
numTabs=0;

function setNumTabs(inp)
{
	numTabs = inp;
	
}
function createTab(varUrl)
{
	chrome.windows.create({url: varUrl});
}
function getNum() 
{
	numTabs = chrome.tabs.getAllInWindow(null, function (tabs) {
			return tabs.length;
			});
			alert(numTabs);
			return numTabs;
}

function getUrl()
{
	var len=this.getNum();
		var urls;
		alert(len);
		for(var i=0;i<len;i++)
		{
			if(i<=0)
			{
				urls="";
			}
		chrome.tabs.query({'currentWindow': true}, function (tabs) {
		urls = urls + "," + tabs[i].url;
		});
		}
}

 document.addEventListener('DOMContentLoaded', function () {
 getNum();
});
