$(document).ready(function(){
	$.getJSON('data/settings.js', function(data) {
		console.log(data.setting[0].channels);
	});
});