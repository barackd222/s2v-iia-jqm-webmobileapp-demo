// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /


// Export a function, so that we can pass 
// the app and io instances from the app.js file:

module.exports = function(app){

	app.get('/', function(req, res){

		// Render views/ui.html
		res.render('ui');
	});

};



