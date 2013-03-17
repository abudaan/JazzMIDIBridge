chrome.app.runtime.onLaunched.addListener(function() {

	var w = 500,//screen.width,
		h = 450;//screen.height;

	chrome.app.window.create('example2-input-output.html', {
		//'frame': "none",
		'width': w,
		'height': h
	});

});
