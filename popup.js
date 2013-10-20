varUrl="";
numTabs=0;

function createTab()
{
	var urls = document.getElementById("urls").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr});
}
function createTabinco()
{
	var urls = document.getElementById("urls").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr, incognito: true});
}
function createTabserv()
{
	var urls = document.getElementById("tab1").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr});
}
function createTabincoserv()
{
	var urls = document.getElementById("tab1").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr, incognito: true});
}
function importOpen()
{
	var urls = document.getElementById("impurls").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr});
}
function importOpeninco()
{
	var urls = document.getElementById("impurls").value;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr, incognito: true});
}
function getNum() 
{
	chrome.tabs.getAllInWindow(null, function (tabs) {
			numTabs=tabs.length;
			document.getElementById("numt").innerHTML=tabs.length;
			});
						
}

function fetchData()
{
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","http://tabzhub.appspot.com/fetch",false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4)
    {
		var formi="";
		var data = JSON.parse(xmlhttp.responseText);
		for(var i=1;i<=Object.keys(data).length;i++)
		{
			formi = formi + "<p>Tab name:</p>"+ data[i]['name']+"<input type='hidden' id='tab"+i+"' value='"+data[i]['urls']+"' /><br /> <input type='button' name='Openserv' value='Open' id='openserv' /><input type='button' name='Openincoserv' value='Open Incognito' id='openincoserv' /><br />";
		}
			var svtb = document.getElementById("savedTab");
			svtb.innerHTML = formi;
	}
  }

	xmlhttp.send();
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
	fetchData();
	/*var openv = document.getElementById('open');
	openv.addEventListener('click', createTab);
	var openvinco = document.getElementById('openinco');
	openvinco.addEventListener('click', createTabinco);*/
	var openvserv = document.getElementById('openserv');
	openvserv.addEventListener('click', createTabserv);
	var openvincoserv = document.getElementById('openincoserv');
	openvincoserv.addEventListener('click', createTabincoserv);
	var exportv = document.getElementById('exp');
	exportv.addEventListener('click', exportTab);
	var importv = document.getElementById('impt');
	importv.addEventListener('click', importTab);
	var importo = document.getElementById('openimp');
	importo.addEventListener('click', importOpen);
	var importoinco = document.getElementById('openimpinco');
	importoinco.addEventListener('click', importOpeninco);
});