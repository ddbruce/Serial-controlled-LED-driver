$(document).bind('touchmove', function(e) {
	e.preventDefault();
});
function colorbg(id){
	var color = $(id).chromoselector('getColor');
	$(id).css({
		'background-color': color.getHexString(),
		'color': color.getHexString()
	});
}	
function postphp(id,channel) {
	$.getJSON('data/settings.js', function(settings) {
		var color = $(id).chromoselector('getColor').getHexString().substring(1);
		settings.setting[0].channels[channel-1].hex = color;
		settingsjson = JSON.stringify(settings);
		//console.log(ch1 + "," + ch2 + "," + ch3 + "," + ch4 + "," + ch5);
		console.log(settingsjson);
		$.ajax({
			url : "change.php",
			type: "POST",
			data: {
				channel: channel,
				color: color,
				settings: settingsjson,
			},
			success: function(data) {
				if (data)
					console.log("PHP error (change.php): " + data);
			}
		});
	});
}
$(document).ready(function() {
	$.getJSON('data/settings.js', function(settings) {
		var current = settings.setting[0].channels
		$.fn.chromoselector
		.defaults("width", 180)
		.defaults("ringwidth", 50)
		.defaults("resizable", false)
		.defaults("speed", 250)

		$("#ch1").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[0].hex);
			},
			update: function() {
				colorbg(this);
				postphp(this,1);
			},
			str2color: function (str) {
				return '#' + str;
			},
			color2str: function (color) {
				return color.getHexString().substring(1);
			}
		});
		$("#ch2").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[1].hex);
			},
			update: function() {
				colorbg(this);
				postphp(this,2);
			},
			str2color: function (str) {
				return '#' + str;
			},
			color2str: function (color) {
				return color.getHexString().substring(1);
			}
		});
		$("#ch3").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[2].hex);
			},
			update: function() {
				colorbg(this);
				postphp(this,3);
			},
			str2color: function (str) {
				return '#' + str;
			},
			color2str: function (color) {
				return color.getHexString().substring(1);
			}
		});
		$("#ch4").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[3].hex);
			},
			update: function() {
				colorbg(this);
				postphp(this,4);
			},
			str2color: function (str) {
				return '#' + str;
			},
			color2str: function (color) {
				return color.getHexString().substring(1);
			}
		});
		$("#ch5").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[4].hex);
			},
			update: function() {
				colorbg(this);
				postphp(this,5);
			},
			str2color: function (str) {
				return '#' + str;
			},
			color2str: function (color) {
				return color.getHexString().substring(1);
			}
		});
	});
});