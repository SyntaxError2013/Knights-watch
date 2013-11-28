varUrl="";
numTabs=0;
var sessions = new Array();
var sessionNames = new Array();
var _urls = new Object();
var _datetime = new Object();
var _sess_ids = new Object();

/* SEARCH MODULE STARTS */
/*
$.widget( "custom.catcomplete", $.ui.autocomplete, {
  _renderMenu: function( ul, items ) {
  var that = this;
  currentCategory = "";
  
  $.each( items, function( index, item ) {
    if ( item.category == "public" || item.category == "private") {
      var arr = ul.children('li.ui-autocomplete-category');
      var sess_types = new Array();
      $.each(arr, function(_index, _item){
        sess_types.push( $(_item).text() );
      });
      if(jQuery.inArray())

      if((ul.children('li.ui-autocomplete-category').innerText != item.category ))
      {
        ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
        currentCategory = item.category;
      }
    }
    that._renderItemData( ul, item );
  });
}

});
*/

$(document).ready(function(){
  $("#search").autocomplete({
    delay: 0,
    source: sessions,
    select: function(event, ui){
      openTabs(_urls[ui.item.label]);
    }
  });

  $("#message_box").hide();
  
  $("#save_session_form").submit(function(e){
    e.preventDefault();
    var data = $("#save_session_form").serialize();
    var url = "http://tabzhub.appspot.com/save";
    $.post(url, data, function(res){
      console.log(res);
      if(res == "ok") {
        $("#save_session_form")[0].reset();
        var msg_data = "<p> Successfully stored to cloud </p>"; 
        $("#message_box").html(msg_data);
        $("#message_box").slideDown("slow").delay(2500).slideUp("slow");
      }
      else {
        var msg_data = "<p> Error occured while storing to cloud!! Try again... </p>"; 
        $("#message_box").html(msg_data);
        $("#message_box").slideDown("slow");
      }
    });
    return false;
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
function createTabserv(i)
{
	var j = i.charAt(i.length-1);
	var urls = document.getElementById("tab"+j).value;
	var urlstr = urls.split(',');
	 chrome.windows.create({url: urlstr});
}
function createTabincoserv(i)
{
	var j = i.charAt(i.length-1);
	var urls = document.getElementById("tab"+j).value;
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
	var impid = document.getElementById("namebox").value;
	//code to fetch url by id needed here
	var urls;
	var urlstr = urls.split(',');
	chrome.windows.create({url: urlstr});
}
function importOpeninco()
{
	var impid = document.getElementById("namebox").value;
	//code to fetch url by id needed here
	var urls;
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

function getHostname(href) {
  var l = document.createElement("a");
  l.href = href;
  return l.hostname;
}

function getType(n)
{
  if(n == 1)
    return "public";
  else
    return "private";
}

function putEllipsis(str, size)
{
  if(str.length > 22)
  {
    var s = str.substr(0, size);
    s = s + "...";
    return s;
  }
  else
  return str;
}

function getTimeAgo(s)
{
 var corrected_time = moment(s, "YYYY-MM-DD HH:mm:ssZ");
 var timeAgo = corrected_time.fromNow();
 return timeAgo;
}

function fetchData()
{
	var xmlhttp;
	var numSaves;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","http://tabzhub.appspot.com/fetch", true);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4)
    {
      var formi="";
      var data = JSON.parse(xmlhttp.responseText);
      numSaves = Object.keys(data).length;
      console.log(numSaves); 
      for(var i=1;i<=numSaves;i++)
      {

        console.log(getType(data[i]['type']));
        var urls_arr = data[i]['urls'].split(',');
    
    var shareKey = "";
		if(data[i]['share']==true || data[i]['public']==true)
			shareKey = "<br/>Share Key : "+data[i]['id'];

        formi = formi + "<h3><span id='session_namebox_"+ i +"' title='"+ data[i]['name'] +"'>" + putEllipsis(data[i]['name'], 15) +"</span><span>("+ urls_arr.length  +") </span> <span class='sess_timeAgo' id='sess_timeAgo_"+ i +"' style='float:right; font-size:10px;margin-top:5px;'>"+ getTimeAgo(data[i]['created_on']) +"</span></h3> <div id='accordian_item_"+ i +"'><p><input type='hidden' id='tab"+ i +"' value='"+ data[i]['urls'] +"' /><br /><div class='session_menu' id='session_menu_"+ i +"'><button name='Openserv' class='open_btn' id='openserv"+i+"'>Open</button> <button class='open_ic_btn' name='Openincoserv' id='openincoserv"+ i +"'>Open Incognito</button> <button class='"+ getType(data[i]['public']) +"_type_btn sess_type_btn'>Type</button> <button class='settings_icon_btn'>Settings_icon</button><button class='settings_menu_btn'>Settings_menu</button> </div><ul id='settings_list_"+ i +"'> <li><a href='#'><span class='ui-icon ui-icon-pencil'></span>Edit</a></li> <li><a href='#'><span class='ui-icon ui-icon-trash'></span>Delete</a></li> <li><a href='#'><span class='ui-icon ui-icon-tag'></span>Rename</a></li> <li><a href='#'><span class='ui-icon ui-icon-mail-closed'></span>Hide Session</a></li> <li><a href='#'><span class='ui-icon ui-icon-suitcase'></span>Hide Tabs</a></li> </ul> <br><br/>"+shareKey+"<br/>";
        
        for(j=0;j<urls_arr.length;j++)
        {
           formi = formi + "<div class='tab'><div class='indicator'></div><div class='link_box'><a class='favicons' href='"+urls_arr[j]+"' target='_blank' style='float:left;'>"+ getHostname(urls_arr[j]) +"</a></div><div class='edit_box'><span class='ui-icon ui-icon-pencil'></span></div><div class='delete_box'><span class='ui-icon ui-icon-close'></span></div></div>";
        }
        formi = formi + "</p></div>";

        //var tmp = new Object();
        //tmp['label'] = data[i]['name'];
        //tmp['category'] = getType(data[i]['type']);
        sessions.push( putEllipsis(data[i]['name'], 20) );
        sessionNames.push(data[i]['name']);
        _urls[data[i]['name']] = data[i]['urls'];
        _datetime[i] = data[i]['created_on'];
        _sess_ids[i] = data[i]['id'];
      }
        var svtb = document.getElementById("accordion");
        svtb.innerHTML = formi;

       /* ACCORDION INITIALIZATION */
         
        var icons = {  
          header: "ui-icon-circle-arrow-e",
          activeHeader: "ui-icon-circle-arrow-s"
        };

       $("#accordion").accordion({ // Should be here after those 2 functions.
        heightStyle: "content",
        collapsible: true,
        active: false,
        icons: icons,
        activate: function(event, ui){
         console.log("Session header clicked in accordion.");
        }
       });

       $(".favicons").each(function(){
        var href = $(this).attr('href');
        $(this).css({
          background: "url(http://www.google.com/s2/u/0/favicons?domain=" + getHostname(href) + 
                  ") left center no-repeat",
                  "padding-left": "20px"
        });
       });

       $(this).children(".link_box").css({'background-color':'white'});
       $(".indicator").each(function(){
         $(this).css({'background-color':'white'});
       });
       $(".edit_box").hide();
       $(".delete_box").hide();
       $("div.tab")
        .mouseover(function(){
          $(this).children(".indicator").css({'background-color':'orange'});
          $(this).children(".link_box").css({'background-color':'#f7f7f7'});
          $(this).children(".edit_box").css({'background-color':'#f7f7f7'});
          $(this).children(".delete_box").css({'background-color':'#f7f7f7'});
          $(this).children(".edit_box").show();
          $(this).children(".delete_box").show();
        })
        .mouseout(function(){
          $(".indicator").each(function(){
            $(this).css({'background-color':'white'});
          });
          $(this).children(".link_box").css({'background-color':'white'}); 
          $(this).children(".edit_box").css({'background-color':'white'});
          $(this).children(".delete_box").css({'background-color':'white'});
          $(".edit_box").hide();
          $(".delete_box").hide();
        });

      $("div.edit_box").on("click", function(){
       alert("Tab edit called...");  
      });

      $("div.delete_box").on("click", function(){
       alert("Tab delete called...");  
      });

      $("#bottom_container").css({
        background: "url('../images/bgrnd/mbpanel.jpg')"
      });

      $("button.open_btn").button({
        icons: {
          primary: "ui-icon-folder-open"
        },
        label: "Open"
      });

      $("button.open_ic_btn").button({
        icons: {
          primary: "ui-icon-person"
        },
        label: "Open Incognito"
      });

      $("button.private_type_btn").button({
        icons: {
          primary: "ui-icon-locked"
        },
        label: "Private"
      });
        
      $("button.public_type_btn").button({
        icons: {
          primary: "ui-icon-unlocked"
        },
        label: "Public"
      });
      
      $("button.sess_type_btn").bind("click", function(){
        if($(this).hasClass("private_type_btn"))
        {
          console.log("Inside private");
          var that = $(this);
          $(this).button("disable");
          var url = "http://tabzhub.appspot.com/session/alter/type";
          var _sess_id = $(this).parent().attr("id");
          _sess_id = _sess_id.replace("session_menu_", "");
          var data = {id: _sess_ids[_sess_id]} ;
          $.post(url, data, function(res){
            if(res == "ok")
            {
             that.button("enable");
             var msg_data = "<p> Changes updated </p>"; 
             $("#message_box").html(msg_data);
             $("#message_box").slideDown("slow").delay(2500).slideUp("slow");
             that.toggleClass("private_type_btn public_type_btn");
             that.button( "option", "icons", { primary: "ui-icon-unlocked"} );
             that.button( "option", "label", "Public" );
            }
            else
            {
             that.button("enable");
             var msg_data = "<p> Error occured while updating! Try again... </p>"; 
             $("#message_box").html(msg_data);
             $("#message_box").slideDown("slow");
            }
          });
        }
        else if($(this).hasClass("public_type_btn"))
        {
          console.log("Inside public!!!");
          var that = $(this);
          $(this).button("disable");
          var url = "http://tabzhub.appspot.com/session/alter/type";
          var _sess_id = $(this).parent().attr("id");
          _sess_id = _sess_id.replace("session_menu_", "");
          var data = {id: _sess_ids[_sess_id]} ;
          $.post(url, data, function(res){
            if(res == "ok")
            {
             that.button("enable");
             var msg_data = "<p> Changes updated </p>"; 
             $("#message_box").html(msg_data);
             $("#message_box").slideDown("slow").delay(2500).slideUp("slow");
             that.toggleClass("public_type_btn private_type_btn");
             that.button( "option", "icons", { primary: "ui-icon-locked"} );
             that.button( "option", "label", "Private" );
            }
            else
            {
             that.button("enable");
             var msg_data = "<p> Error occured while updating! Try again... </p>"; 
             $("#message_box").html(msg_data);
             $("#message_box").slideDown("slow");
            }          
          });
        }
        /*
        var class_list = $(this).attr('class').split(/\s+/);
        var _class = class_list[0];
        console.log(_class);
        var tmp = _class;
        tmp = tmp.replace("_type_btn", "");
        if(tmp == "public") 
          tmp = "private";
        else 
          tmp = "public";
        tmp = tmp + "_type_btn";
        console.log(_class +", "+tmp);

        var _new = $(this).toggleClass(_class+' '+tmp);
        $(_new).button( "option", "icons", { primary: "ui-icon-locked"} );
        $(_new).button( "option", "label", "Private" );
        */
      });
     
      var setting = function(setting) {
        console.log(setting);
        switch(setting.text()) {
          case "Rename":
             var _sess_id = $(setting).parent().attr("id");
             _sess_id = _sess_id.replace("settings_list_", "");
             var _sess_name = sessionNames[_sess_id];
             $("#sess_timeAgo_"+_sess_id).hide();
             console.log(_sess_name);
             var html_data = "<input type='text' class='new_session_name' id='new_sess_name_"+ _sess_id +"' value='"+ _sess_name +"'/>";
             $("#session_namebox_"+_sess_id).html(html_data);
             break;
          case "Delete": 
             var _con = confirm("Are you sure to delete this session?");
             if(_con == true)
             {
                var url = "http://tabzhub.appspot.com/session/delete"
                var _sess_id =  $(setting).parent().attr("id");
                console.log(_sess_id);
                _sess_id = _sess_id.replace("settings_list_", "");
                console.log(_sess_id);
                var data = {id: _sess_ids[ _sess_id ]}
                /* Need to add delete functionality here. */
                //var data = tmp.serialize();
                console.log(data);
                $.post(url, data, function(res){
                  if(res == "ok")
                  {
                    console.log(res);
                    var msg_data = "<p> Session deleted from cloud </p>"; 
                    $("#message_box").html(msg_data);
                    $("#message_box").slideDown("slow").delay(2500).slideUp("slow");
                    var _accord_item_header = $("#accordian_item_"+_sess_id).prev('h3');
                    $("#accordian_item_"+_sess_id).remove();
                    $(_accord_item_header).remove();
                  }
                  else
                  {
                    console.log(res);
                    var msg_data = "<p> Error occured!! Try again.. </p>"; 
                    $("#message_box").html(msg_data);
                    $("#message_box").slideDown("slow");
                  }
                });
             }
             break;
          default:
            console.log("Invalid option!!");
        }
      }

      $(".settings_icon_btn").button({
        icons: {
          primary: "ui-icon-gear"
        },
        text: false
      })
        .next()
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })          
          .click(function() {
            var menu = $( this ).parent().next().show().position({
              my: "left top",
              at: "left bottom",
              of: this
            });
            $( document ).one( "click", function() {
              menu.hide();
            });
            return false;
          })
          .parent()
          	.buttonset()
          		.next().hide()
          			.menu({
          				select: function(event, ui){
          				  setting(ui.item);
          				}
          			});
        
      for(var i=1;i<=numSaves;i++)
      {
        var openvserv = new Array();
        var openvincoserv = new Array();
        openvserv[i] = document.getElementById('openserv'+i);
        openvserv[i].addEventListener('click', function(){ createTabserv(this.id);});
        openvincoserv[i] = document.getElementById('openincoserv'+i);
        openvincoserv[i].addEventListener('click', function(){createTabincoserv(this.id);});
	    }
	  var importbutn = document.getElementById('impt');
	  var importIncobutn = document.getElementById('imptInco');
	  importbutn = addEventListener('click', importOpen);
	  importIncobutn = addEventListener('click', importOpeninco);
    }
  }
	xmlhttp.send();
}

/* Function to update 'session.created_on.timeAgo' corresponding to every session header */
function updateTimeAgo()
{
    $("span.sess_timeAgo").each(function(){
      var tmp = $(this).attr('id');
      tmp = tmp.replace("sess_timeAgo_", "");
      var corrected_time = getTimeAgo(_datetime[tmp]);
      $(this).text(corrected_time);
    }); 
}

setInterval(updateTimeAgo, 1000);
/* Ends */

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
	fetchData();

  

/*****************************************************************************************/
  /*
  $("#accordion").accordion({ // Should be here after those 2 functions.
    heightStyle: "content",
    collapsible: true,
    active: false,
    icons: icons,
    activate: function(event, ui){
     console.log("Session header clicked in accordion.");
      //alert(ui.newHeader.find('a').attr('id'));
      //console.log(ui.newHeader);
    }
  });
  */


  /*
  $(".favicons").each(function(){
    var href = $(this).attr('href');
    $(this).css({
      background: "url(http://www.google.com/s2/u/0/favicons?domain=" + getHostname(href) + 
              ") left center no-repeat",
              "padding-left": "20px"
    });
  });
  */

/*******************************************************************************************/


	/*var openv = document.getElementById('open');
	openv.addEventListener('click', createTab);
	var openvinco = document.getElementById('openinco');
	openvinco.addEventListener('click', createTabinco);*/
	

/*
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
*/

});


