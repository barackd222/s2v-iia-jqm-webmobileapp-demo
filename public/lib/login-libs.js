
$(document).ready(function () {

	var ua = navigator.userAgent.toLowerCase();
	var checker = {
		iphone: ua.match(/(iphone|ipod|ipad)/),
		blackberry: ua.match(/blackberry/),
		android: ua.match(/android/)
	};
	if (checker.android || checker.iphone || checker.blackberry) {

		//alert("Mobile device...");

		$(".imgclick").touchstart(function () {


			var mrgtb = parseInt($(this).css("margin-top"));

			var mrglf = parseInt($(this).css("margin-left"));

			mrgtb = mrgtb + 3;

			mrglf = mrglf + 3;

			$(this).css("margin-top", mrgtb + "px").css("margin-left", mrglf + "px");


		}).touchend(function () {

			var mrgtb = parseInt($(this).css("margin-top"));

			var mrglf = parseInt($(this).css("margin-left"));

			mrgtb = mrgtb - 3;

			mrglf = mrglf - 3;

			$(this).css("margin-top", mrgtb + "px").css("margin-left", mrglf + "px");

		});

	} else {

		//alert("Not a mobile device...");

		$(".imgclick").mousedown(function () {


			var mrgtb = parseInt($(this).css("margin-top"));

			var mrglf = parseInt($(this).css("margin-left"));

			mrgtb = mrgtb + 3;

			mrglf = mrglf + 3;

			$(this).css("margin-top", mrgtb + "px").css("margin-left", mrglf + "px");


		}).mouseup(function () {

			var mrgtb = parseInt($(this).css("margin-top"));

			var mrglf = parseInt($(this).css("margin-left"));

			mrgtb = mrgtb - 3;

			mrglf = mrglf - 3;

			$(this).css("margin-top", mrgtb + "px").css("margin-left", mrglf + "px");

		});

	}

});


function postEvent(event, when) {

	console.log("Event is [" + event + "], when [" + when + "]");

	if (!(event != null && event.length > 0) || !(when != null && when.length > 0))
		return;


	var uriOrchestration = "https://" + globalIPAddressICS + ":" + globalPortICS + "/integration/flowapi/rest/S2V_IIA_REST2OSBRE/v01/event";// ICS -> OSB -> SOA Orchestration REST API
	//var uriOrchestration = "http://" + globalIPAddressICS + ":" + globalPortICS + "/SocialMediaAPIOSBProject/SocialMediaAPI/event";// OSB -> SOA Orchestration REST API

	var payloadOrchestration = {"id":"70190000000Xf4w","name":"Speed 2 Value - Integration in Action Workshop","description": event, "when": when};

	console.log("uriOrchestration is [" + uriOrchestration + "]");

	console.log("payloadOrchestration is [" + JSON.stringify(payloadOrchestration) + "]");

	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();

	// Send HTTP Request to Facebook, LinkedIn, Salesforce amd Google Calendar:
	sendRequest(http_request, "POST", uriOrchestration, true, payloadOrchestration);


	setTimeout(alert("You send your message successfully!"), 2500);

	$("#postForm")[0].reset();
}

function setColour(colour) {

	console.log("Colour is [" + colour + "]");

	if (!(colour != null && colour.length > 0))
		return;

	var uri = "http://" + globalIPAddressNode + ":" + globalPortNode + "/sphero/color/" + colour;// Sphero API
			

	console.log("URI is [" + uri + "]");

	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();

	// Send HTTP Request
	sendRequest(http_request, "POST", uri, true, {});

	alert("You send your message successfully!");

	$("#setColourForm")[0].reset();
}


function makeShape(shape, colour) {

	console.log("Shape is [" + shape + "], Colour is [" + colour + "]");

	if (!(shape != null && shape.length > 0) || !(colour != null && colour.length > 0))
		return;


	var uri = "http://" + globalIPAddressNode + ":" + globalPortNode + "/sphero/shape/" + shape + "/color/" + colour;// Sphero API	

	console.log("URI is [" + uri + "]");

	// Initiating XMLHttpRequest Object:
	var http_request = initiateXMLHttpObject();

	// Send HTTP Request
	sendRequest(http_request, "POST", uri, true, {});

	alert("You send your message successfully!");

	$("#makeShapeForm")[0].reset();
}

function exampleOfASyncFunction(email) {

	/**
	*	This operation is Synchronous and thus it should not be over used.
	**/

	if (email == null || email.length == 0) {
		alert("You left the email empty");
		return;
	}

	var uri = "http://" + globalIPAddress + ":7001/SCRequestAPIProject/user/pin/" + email.toLowerCase();// OSB REST Adapter

	console.log("URI is [" + uri + "]");

	// Initiating XMLHttpRequest Object:
    var xmlHttp = initiateXMLHttpObject();
    xmlHttp.open("GET", uri, false);
	xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.send(null);

    console.log("response is [" + xmlHttp.responseText + "]");

	// Javascript function JSON.parse to parse JSON data
	var jsonObj = JSON.parse(xmlHttp.responseText);

	var message = jsonObj.message;


	if (message == null || message == "NA") {
		alert("No account associated with this email address was found! Verify and re-enter your email.");
	} else {
		alert("Your PIN has been sent to your Email and Mobile via SMS");
	}
}


function sendRequest(http_request, verb, uri, async, data) {

	console.log("Sending [" + uri + "] under verb [" + verb + "]");

    http_request.open(verb, uri, async);
	http_request.setRequestHeader("Accept", "application/json");
	http_request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');	
    http_request.send(JSON.stringify(data));

	console.log("Your message was sent successfully.");
}

function initiateXMLHttpObject() {

	// Initiating XMLHttpRequest Object:
	var http_request = new XMLHttpRequest();

    try {
		// Opera 8.0+, Firefox, Chrome, Safari
		http_request = new XMLHttpRequest();
    } catch (e) {
		// Internet Explorer Browsers
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
    }

	return http_request;
}