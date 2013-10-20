varUrl="";
numTabs=0;

function createTab()
{
	var urls = document.getElementById("urls").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr});
}
function importOpen()
{
	var urls = document.getElementById("impurls").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr});
}
function getNum() 
{
	chrome.tabs.getAllInWindow(null, function (tabs) {
			numTabs=tabs.length;
			document.getElementById("numt").innerHTML=tabs.length;
			});
						
}

function parse_data()
{
	
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

function exportTab()
{
	var formdiv = document.getElementById('saveForm');
		formdiv.style.display = "none";
	var urld = document.getElementById("urls");
	var textar = document.getElementById('dispurls');
	textar.value = urld.value;
	var expdiv = document.getElementById('exportv');
		expdiv.style.display = "block";
}

function importTab()
{
	var formdiv = document.getElementById('saveForm');
		formdiv.style.display = "none";
	var impdiv = document.getElementById('importv');
		impdiv.style.display = "block";
}

 document.addEventListener('DOMContentLoaded', function () {
	getUrl();
	var defaultloc = "urls";
	var importloc  = "impurls";
	var openv = document.getElementById('open');
	openv.addEventListener('click', createTab);
	var exportv = document.getElementById('exp');
	exportv.addEventListener('click', exportTab);
	var importv = document.getElementById('impt');
	importv.addEventListener('click', importTab);
	var importo = document.getElementById('openimp');
	importo.addEventListener('click', importOpen);
});