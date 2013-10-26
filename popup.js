varUrl="";
numTabs=0;
var sessions = new Array();
var _urls = new Object();


/* SEARCH MODULE STARTS */

$.widget( "custom.catcomplete", $.ui.autocomplete, {
  _renderMenu: function( ul, items ) {
  var that = this,
  currentCategory = "";
  $.each( items, function( index, item ) {
  if ( item.category != currentCategory ) {
  ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
  currentCategory = item.category;
 }
 that._renderItemData( ul, item );
 });
}

});

$(document).ready(function(){
  $("#search").catcomplete({
    delay: 0,
    source: sessions,
    select: function(event, ui){
      openTabs(_urls[ui.item.label]);
    }
  });

});

/* SEARCH MODULE ENDS */


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
function openTabs(data)
{
	var urlstr = data.split(',');
	chrome.windows.create({url: urlstr});
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

function getType(bool_type)
{
  if(bool_type == false)
  { return "Private";}
  else{return "Public";}
}

function getHostname(href) {
  var l = document.createElement("a");
  l.href = href;
  return l.hostname;
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
      var urls_arr = data[i]['urls'].split(',');
      formi = formi + "<h3>" + data[i]['name']+" ("+ urls_arr.length  +") <span style='float:right; font-size:10px;'>"+ prettyDate(data[i]['created_on']) +"</span></h3> <div><p><input type='hidden' id='tab"+i+"' value='"+data[i]['urls']+"' /><br /><p> <input type='button' name='Openserv' value='Open' id='openserv' /><input type='button' name='Openincoserv' value='Open Incognito' id='openincoserv' /><br>";
      for(j=0;j<urls_arr.length;j++)
      {
       	 formi = formi + "<div class='tab'><a class='favicons' href='"+urls_arr[j]+"'>"+ getHostname(urls_arr[j])  +"</a></div><br>";
      }
      formi = formi + "</p></div>";

      var tmp = new Object();
      tmp['label'] = data[i]['name'];
      tmp['category'] = getType(data[i]['type']);
      sessions.push(tmp);  /* GLOBAL ARRAY - FEEDING DATA TO FUEL SESSION SEARCH */
      _urls[data[i]['name']] = data[i]['urls'];
		}
			var svtb = document.getElementById("accordion");
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

  var icons = {   // Need to repair this linking with jquery-ui icons.
    header: "ui-icon-circle-arrow-e",
    activeHeader: "ui-icon-circle-arrow-s"
  };

  $("#accordion").accordion({ // Should be here after those 2 functions.
    heightStyle: "content",
    collapsible: true,
    active: false,
    icons: icons
  }); 

  $(".favicons").each(function(){
    var href = $(this).attr('href');
    $(this).css({
      background: "url(http://www.google.com/s2/u/0/favicons?domain=" + getHostname(href) + 
              ") left center no-repeat",
              "padding-left": "20px"
    });
  });

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


