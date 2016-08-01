// Shared libs

/*
	  $(document).ready(function(){

		<!--img id="myTestInfo" class="infoTap" src="images/info.png" width="25" height="25"-->		
		$(".infoTap").on("tap",function(){
		  //$(this).hide();
		  alert("tap4");
		});			
		$(document).on('click', '.infoTap', function(){ 
			alert('Info Buton selected again 1!');       
		});		
		$(document).on('tap', '.infoTap', function(){ 
			alert('Info Buton selected again 2!');       
		});			
		$(document).on('change', '.ui-radio', function(){ 
			alert('Info Buton selected again 3!');       
		});	
		$(document).on('tap', '.ui-radio', function(){ 
			alert('Info Buton selected again 4!');       
		});	
		$(document).on('tap', '#infoTapId', function(){ 
			alert('Info Buton selected again 5!');       
		});		

	  });
*/	  

  
	/*
	//Nice way to add a listner on a button, without having to chase the onclick...
								   
		$(document).ready(function() {

		  $("#button").click(function(){
			 $(".target").effect( "highlight", 
			  {color:"#669966"}, 3000 );
		  });

	   });
	  */

	// Adding generic click/push effect:
	$(document).ready(function(){
	
		var ua = navigator.userAgent.toLowerCase();
		var checker = {
		  iphone: ua.match(/(iphone|ipod|ipad)/),
		  blackberry: ua.match(/blackberry/),
		  android: ua.match(/android/)
		};
		if (checker.android || checker.iphone || checker.blackberry){
			
			//alert("Mobile devie...");
		
			$(".imgclick").touchstart(function(){


				var mrgtb = parseInt($(this).css("margin-top"));

				var mrglf = parseInt($(this).css("margin-left"));

				mrgtb=mrgtb+3;

				mrglf=mrglf+3;

					$(this).css("margin-top",mrgtb+"px").css("margin-left",mrglf+"px");


			}).touchend(function(){

				var mrgtb = parseInt($(this).css("margin-top"));

				var mrglf = parseInt($(this).css("margin-left"));

				mrgtb=mrgtb-3;

				mrglf=mrglf-3;

					$(this).css("margin-top",mrgtb+"px").css("margin-left",mrglf+"px");

			}); 			
		
		} else {
		
			//alert("Not a mobile devie...");

			$(".imgclick").mousedown(function(){


				var mrgtb = parseInt($(this).css("margin-top"));

				var mrglf = parseInt($(this).css("margin-left"));

				mrgtb=mrgtb+3;

				mrglf=mrglf+3;

					$(this).css("margin-top",mrgtb+"px").css("margin-left",mrglf+"px");


			}).mouseup(function(){

				var mrgtb = parseInt($(this).css("margin-top"));

				var mrglf = parseInt($(this).css("margin-left"));

				mrgtb=mrgtb-3;

				mrglf=mrglf-3;

					$(this).css("margin-top",mrgtb+"px").css("margin-left",mrglf+"px");

			}); 
		
		}
		
  });

  function requesttickets(userid, status, ph, myForm, mode, gState, autoShowPanel){

	//alert("Within requesttickets userid is [" + userid + "], status is [" + status + "], ph is [" + ph + "], myForm is [" + myForm + "], mode is [" + mode + "], gState is [" + gState + "], autoShowPanel is [" + autoShowPanel + "]");
  
	var uri = '';
	
	if(mode == 'manager'){
	
		uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/tickets/status/" + status + "/manager/" + userid;// OSB REST Adapter
		
	}else if(mode == 'sc'){
	
		uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/tickets/status/" + status + "/type/sc/" + userid;// OSB REST Adapter
				
	}else if(mode == 'rep'){
	
		uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/tickets/status/" + status + "/type/salesrep/" + userid;// OSB REST Adapter
				
	}else{	
		return;
	}
	
	//alert("URI is [" + uri + "], mode is [" + mode + "]");
	
	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();  
	
	http_request.onreadystatechange  = function(){		
	
		if (http_request.readyState == 4){
		
			//alert("http_request.responseText is [" + http_request.responseText + "]");
		
	   
			// Javascript function JSON.parse to parse JSON data
			var jsonObj = JSON.parse(http_request.responseText);
			var newTickets = "";
			
			for(var i in jsonObj.Requests){
				
				//alert("within appendText index is [" + i + "]");
				
				var reqid = jsonObj.Requests[i].reqid;
				var customername = jsonObj.Requests[i].customername;
				var state = jsonObj.Requests[i].state;
				var scid = jsonObj.Requests[i].scid;
				var manid = jsonObj.Requests[i].manid;
				

				newTickets += '<input type="radio" id="' + mode + reqid + '" name="reqidBK" value="' + reqid + '" onclick="javascript:requeststicketRefresh(' + reqid + ', \'' + myForm + '\', ' + scid + ', \'' + gState + '\', \'' + mode + '\', ' + autoShowPanel + ', ' + manid + ')"/><label for="' + mode + reqid + '">Ticket ' + reqid + ': ' + customername + '</label>';
				
				//alert("within function");
				/*var arr = ["list", "items", "here"];
				$("dynamicRequestsTickets").append("<ul></ul>");
				for(var i in arr) {
					var li = "<li>";
					$("ul").append(li.concat(arr[i]))
				}*/						
				//var txt1 = "<p>Text.</p>";               // Create element with HTML  
				//var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
				//var txt3 = document.createElement("p");  // Create with DOM
				//txt3.innerHTML = "Text.";
			}
				//alert("newTickets is [" + newTickets + "]");
				//$('#tickets').append(newTickets).trigger('create');  // Append the new elements
				
					//alert("Set Content dynamically");				
					$(ph).append(newTickets).trigger('create');  // Append the new elements
					
       }
    }	
	
	sendRequest(http_request, "GET", uri, true);	
  }
  
  function requeststicketRefresh(reqid, myForm, scid, gState, mode, autoShowPanel, manid){
  
	//alert("Inside requeststicketRefresh, reqid is [" + reqid + "], myForm is [" + myForm + "]");
			    
	var uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/request/id/" + reqid;// OSB REST Adapter
		
	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();  
	
	http_request.onreadystatechange  = function(){		
	
		if (http_request.readyState == 4){
		
			//alert("http_request.responseText is [" + http_request.responseText + "]");
		
	   
			// Javascript function JSON.parse to parse JSON data
			var jsonObj = JSON.parse(http_request.responseText);

			// jsonObj variable now contains the data structure and can be accessed as jsonObj.name and jsonObj.country.
			// document.getElementById("Name").innerHTML =  jsonObj.name;
			// document.getElementById("Country").innerHTML = jsonObj.country;
			//document.requeststicket.customername.value = "New1";
			//document.getElementById('customername').value='New11' ; 
			//$('#customername').val('some value');			
						
			// Refreshing Disabled Property values:			
			document.getElementById(myForm).reqid.value = reqid;
			
			//alert("manid is [" + manid + "]");
			
			if(manid != null && manid != "undefined"){
			
				//alert("manid is [" + manid + "], myForm is [" + myForm + "]");
				document.getElementById(myForm).manid.value = manid;
			}
			
			//alert("While Refreshing: manid is [" + manid + "] myForm is [" + myForm + "] - Reqid is [" + document.requeststicketDetails.reqid.value + "], manid is [" + document.requeststicketDetails.manid.value + "]");
			
			
			document.getElementById(myForm).customername.value = (jsonObj.Requests[0].customername=='[object Object]'?'NA':jsonObj.Requests[0].customername);
			//document.getElementById(myForm).fusioncrmno.value = (jsonObj.Requests[0].fusioncrmno=='[object Object]'?'NA':jsonObj.Requests[0].fusioncrmno);
			//document.getElementById(myForm).contactnameandtitle.value = (jsonObj.Requests[0].contactnameandtitle=='[object Object]'?'NA':jsonObj.Requests[0].contactnameandtitle);
			document.getElementById(myForm).businessscenario.value = (jsonObj.Requests[0].businessscenario=='[object Object]'?'NA':jsonObj.Requests[0].businessscenario);
			//document.getElementById(myForm).applicationandversion.value = (jsonObj.Requests[0].applicationandversion=='[object Object]'?'NA':jsonObj.Requests[0].applicationandversion);
			document.getElementById(myForm).customerskillandinstprod.value = (jsonObj.Requests[0].customerskillandinstprod=='[object Object]'?'NA':jsonObj.Requests[0].customerskillandinstprod);
			document.getElementById(myForm).partnersengaged.value = (jsonObj.Requests[0].partnersengaged=='[object Object]'?'NA':jsonObj.Requests[0].partnersengaged);
			document.getElementById(myForm).potentialnextsteps.value = (jsonObj.Requests[0].potentialnextsteps=='[object Object]'?'NA':jsonObj.Requests[0].potentialnextsteps);
			
			var assigneddate = (jsonObj.Requests[0].dateresource=='[object Object]'?'NA':jsonObj.Requests[0].dateresource);
			assigneddate = assigneddate.substring(0, assigneddate.indexOf('T'));						
			document.getElementById(myForm).dateresource.value = assigneddate;

			// Ticket Assigned to SC if Ticket Assigned:
			//alert("Mode is [" + mode + "], scid is [" + scid + "]");
			if(scid != null && scid != 0){
				//alert("There is an SCID");
				setSCDetailsByPK(scid, myForm);
			}
			
			// Show Assigned SCs Capacity:
			if(mode == "manager"){
			
				requestSCsToBeAssignedCapacity(gState);			
				
			}else if(mode == "sc"){
			
				// Enable SC Ticket Select response
				enableSelectTicketResponse();
			
			}
       }
    }
	
	sendRequest(http_request, "GET", uri, true);

	// Opening "Details" Panel if autoShowPanel:
	//alert("autoShowPanelis [" + autoShowPanel + "]");	
	if(autoShowPanel){
	
		// Opening panel:
		$( "#" + myForm + "Panel" ).panel("open");	
	}
  }


	  function updateUserCapacity(scid, myForm, pageName){
	  
		//alert("Inside sendForm");
			
		var api_base = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/user/update";// OSB REST Adapter	
		
		// Variables:
		var name = document.getElementById(myForm).name.value;
		var area = document.getElementById(myForm).area.value;
		var state = document.getElementById(myForm).state.value;
		var mobile = document.getElementById(myForm).mobile.value;
		var email = document.getElementById(myForm).email.value;
		var type = document.getElementById(myForm).type.value;
		var bdcap = $('.' + pageName + 'BDDial').val();
		var oppcap = "0";//$('.' + pageName + 'OppDial').val();
		var pin = document.getElementById(myForm).pin.value;
		
		
		// Building URI
		var uri = api_base + "?userid=" + scid;
		uri += "&name=" + name;
		uri += "&area=" + area;
		uri += "&state=" + state;
		uri += "&mobile=" + mobile;
		uri += "&email=" + email;
		uri += "&type=" + type;
		uri += "&bdcap=" + bdcap;
		uri += "&oppcap=" + oppcap;
		uri += "&pin=" + pin;
		
		//alert("URI is [" + uri + "]");
		
		// Initiating XMLHttpRequest Object:
		var http_request = initiateXMLHttpObject();  
		
		// Send HTTP Request
		sendRequest(http_request, "POST", uri, true);
		
		alert("Your capcity was updated successfully!");		
		
	  }


	  function getUserCapacity(userId, myForm, pageName){

		if(userId == null || userId == '')
			return;
		
		var uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/user/id/" + userId;// OSB REST Adapter
			
		//alert("Within getSCDetailsByPK uri is [" + uri + "]");
			
		// Initiating XMLHttpRequest Object:
		var http_request = initiateXMLHttpObject();  
		
		http_request.onreadystatechange  = function(){		
		
			if (http_request.readyState == 4){
			
				//alert("http_request.responseText is [" + http_request.responseText + "]");
			
		   
				// Javascript function JSON.parse to parse JSON data
				var jsonObj = JSON.parse(http_request.responseText);

							
				// Refreshing Disabled Property values:			
				var name = jsonObj.Users[0].name;
				var area = jsonObj.Users[0].area;
				var state = jsonObj.Users[0].state;
				var mobile = jsonObj.Users[0].mobile;
				var email = jsonObj.Users[0].email;
				var type = jsonObj.Users[0].type;
				var bdcap = jsonObj.Users[0].bdcap;
				var oppcap = jsonObj.Users[0].oppcap;
				var pin = jsonObj.Users[0].pin;
				
				//Setting the form hidden values:
				document.getElementById(myForm).name.value = name;
				document.getElementById(myForm).area.value = area;
				document.getElementById(myForm).state.value = state;
				document.getElementById(myForm).mobile.value = mobile;
				document.getElementById(myForm).email.value = email;
				document.getElementById(myForm).type.value = type;
				document.getElementById(myForm).bdcap.value = bdcap;
				document.getElementById(myForm).oppcap.value = oppcap;
				document.getElementById(myForm).pin.value = pin;
				
				//Setting Team Capacity:
				$('.' + pageName + 'OppDial').val(oppcap).trigger('change');
				$('.' + pageName + 'BDDial').val(bdcap).trigger('change');
				$('#' + pageName + 'OppPerc').text(oppcap + "%");
				$('#' + pageName + 'BDPerc').text(bdcap + "%");
		   }
		}	
		
		sendRequest(http_request, "GET", uri, true);	
	  }  


  function setSCDetailsByPK(scid, myForm){
  
  	if(scid == null || scid == '')
		return;
			    
	var uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/user/id/" + scid;// OSB REST Adapter
		
	//alert("Within getSCDetailsByPK uri is [" + uri + "]");
		
	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();  
	
	http_request.onreadystatechange  = function(){		
	
		if (http_request.readyState == 4){
		
			//alert("http_request.responseText is [" + http_request.responseText + "]");
		
	   
			// Javascript function JSON.parse to parse JSON data
			var jsonObj = JSON.parse(http_request.responseText);

						
			// Refreshing Disabled Property values:			
			var name = jsonObj.Users[0].name;
			var area = jsonObj.Users[0].area;
			var state = jsonObj.Users[0].state;
			var mobile = jsonObj.Users[0].mobile;
			var email = jsonObj.Users[0].email;
			var type = jsonObj.Users[0].type;
			var bdcap = jsonObj.Users[0].bdcap;
			var oppcap = jsonObj.Users[0].oppcap;

			var t = '<b>' + name + '</b>' + ' <br><a href="tel:+' + mobile + '"><img src="images/call_icon.jpg" width="35" height="35"></a> <a href="sms:+' + mobile + '"><img src="images/sms_icon.jpg" width="35" height="35"></a> <a href="' + email + '"><img src="images/email_icon.jpg" width="35" height="35"></a>';					
			
			$('#' + myForm + 'ScResponsible').empty();
			$('#' + myForm + 'ScResponsible').append(t).trigger('create');  // Append the new elements		
			
			//alert("t is [" + t + "]");			
       }
    }	
	
	sendRequest(http_request, "GET", uri, true);	
  }	  

  function requestScManagers(gState){
			    
	var uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/users/state/" + gState + "/area/SC/type/MAN";// OSB REST Adapter	
		
	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();  
	
	http_request.onreadystatechange  = function(){		
	
		if (http_request.readyState == 4){
		
			//alert("http_request.responseText is [" + http_request.responseText + "]");
		
	   
			// Javascript function JSON.parse to parse JSON data
			var jsonObj = JSON.parse(http_request.responseText);
			var newContent = "";
			
			// Adding yourself:
			newContent += '<input type="radio" id="' + globalUserid + '" name="manidbk" onclick="javascript:setManIDForCreateRequest(' + globalUserid + ')"/><label for="' + globalUserid + '">' + '<img src="images/businessUser.gif" width="20" height="25"> ' + globalName + ' (' + globalState + ')' + '</label>';
			
			//alert("newContent for myself is [" + newContent + "]");
			
			for(var i in jsonObj.Users){
				
				//alert("within appendText index is [" + i + "]");
				
				var manid = jsonObj.Users[i].userid;
				var manname = jsonObj.Users[i].name;
				var manstate = jsonObj.Users[i].state;				
				
				// Skipping manid if it was the same as myself, covered already above.
				if(globalUserid == manid){
					continue;
				}
				
				newContent += '<input type="radio" id="' + manid + '" name="manidbk" onclick="javascript:setManIDForCreateRequest(' + manid + ')"/><label for="' + manid + '">' + manname + ' (' + manstate + ')' + '</label>';
				
			}
				//alert("newContent is [" + newContent + "]");
				$('#scManagersCreateRequest').append(newContent).trigger('create');  // Append the new elements
       }
    }
	
	sendRequest(http_request, "GET", uri, true);	
  }
  
  function sendFormCreateRequest(repid, state){
  
	//alert("Inside sendForm");
	    
	var api_base = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/request/creation";// OSB REST Adapter
	
	// Variables:
	
	var customername = document.requests.customername.value;
	var fusioncrmno = "";//document.requests.fusioncrmno.value;
	var contactnameandtitle = "";//document.requests.contactnameandtitle.value;
	var businessscenario = document.requests.businessscenario.value;
	var applicationandversion = "";//document.requests.applicationandversion.value;
	var customerskillandinstprod = document.requests.customerskillandinstprod.value;
	var partnersengaged = document.requests.partnersengaged.value;
	var potentialnextsteps = document.requests.potentialnextsteps.value;

	var dateresource = document.requests.dateresource.value;
	//dateresource = dateresource.substring(0, dateresource.indexOf('T'));	
	
	// This field was generated dynamically
	var manid = document.requests.manid.value;
	
	// Validating form for mandatory fields:
	if(customername == null || customername.length == 0){
		alert("Invalid Job Name");
		return;
	}
	if(businessscenario == null || businessscenario.length == 0){
		alert("Invalid Job Description");
		return;
	}
	if(dateresource == null || dateresource.length == 0){
		alert("Invalid Date Required");
		return;
	}
	if(manid == null || manid.length == 0){
		alert("No SC Manager selected.");
		return;
	}
	
	
	
	var uri = api_base + "?customername=" + customername;
	uri += "&fusioncrmno=" + fusioncrmno;
	uri += "&contactnameandtitle=" + contactnameandtitle;
	uri += "&businessscenario=" + businessscenario;
	uri += "&applicationandversion=" + applicationandversion;
	uri += "&customerskillandinstprod=" + customerskillandinstprod;
	uri += "&partnersengaged=" + partnersengaged;
	uri += "&potentialnextsteps=" + potentialnextsteps;
	uri += "&dateresource=" + dateresource;
	uri += "&repid=" + repid;
	uri += "&manid=" + manid;
	uri += "&state=" + state;
	
	// If this task was assigned to myself, then auto-approve:
	if(manid == globalUserid){
		uri += "&scid=" + globalUserid;
	}
	
	//alert("URI is [" + uri + "]");

	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();  
	
	// Send HTTP Request
	sendRequest(http_request, "POST", uri, true);
	
	
	alert("Your request was sent successfully!");	
	
	$('#newRequestExtraDetails').collapsible( "collapse" );
	document.requests.reset();
	
  }  
  
  function sendRequest(http_request, verb, uri, async){
	
	//alert("Debugging on: Sending [" + uri + "] under verb [" + verb + "]");
  
    http_request.open(verb, uri, async);
	http_request.setRequestHeader("Accept", "application/json");	
    http_request.send();  
	
	//alert("Your message was sent successfully.");
  }
  
  function initiateXMLHttpObject(){

	// Initiating XMLHttpRequest Object:
	var http_request = new XMLHttpRequest();	
	
    try{
       // Opera 8.0+, Firefox, Chrome, Safari
       http_request = new XMLHttpRequest();
    }catch (e){
       // Internet Explorer Browsers
       try{
          http_request = new ActiveXObject("Msxml2.XMLHTTP");
       }catch (e) {
          try{
             http_request = new ActiveXObject("Microsoft.XMLHTTP");
          }catch (e){
             // Something went wrong
             alert("Your browser broke!");
             return false;
          }
       }
    } 
  
	return http_request;
  }	  
  
  function getAPISynch(repid){
	
	/**
	*	This operation is Synchronous and as such, it should not be abused.
	**/
	
	var uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/request/id/" + reqid;// OSB REST Adapter
	
    var xmlHttp = null;

    xmlHttp = initiateXMLHttpObject();
    xmlHttp.open("GET", uri, false);
	xmlHttp.setRequestHeader("Accept", "application/json");	
    xmlHttp.send(null);
    //alert("response is [" + xmlHttp.responseText + "]");
	
	// Javascript function JSON.parse to parse JSON data
	var jsonObj = JSON.parse(xmlHttp.responseText);
	var customername = jsonObj.Requests[0].customername;
	
	//alert("customername is [" + customername + "]");
	return customername;
  }  