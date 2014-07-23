/*
Copyright (c) 2014  Daniel D. Bruce

This file is part of serialledcontrol.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

The developer can be found at:
  daniel@danieldbruce.com

If that doesn't work, contact the Rensselaer Union
Administration office and ask. Chances are they'll have a
good idea as to where the developer went. Note that no
association with Rensselaer Polytechnic Institute shall
construe any copyright obligations to Rensselaer.
*/

var update_enabled = true;
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
	$.getJSON('/data/state.js', function(state) {
		if (state.state == 'off')
			return;
		else {
			$.getJSON('data/settings.js', function(settings) {
				var color = $(id).chromoselector('getColor').getHexString().substring(1);
				settings.setting[0].channels[channel].hex = color;
				settingsjson = JSON.stringify(settings);
				//console.log(ch0 + "," + ch1 + "," + ch2 + "," + ch3 + "," + ch4);
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
	});
}
function profchange(value) {
	$.getJSON('data/settings.js', function(settings) {
		for (x = 0; x < settings.setting.length; x++) {
			if (settings.setting[x].title == value) {
				update_enabled = false;
				$('#ch0').chromoselector("setColor","#" + settings.setting[x].channels[0].hex).chromoselector('load');
				$('#ch1').chromoselector("setColor","#" + settings.setting[x].channels[1].hex).chromoselector('load');
				$('#ch2').chromoselector("setColor","#" + settings.setting[x].channels[2].hex).chromoselector('load');
				$('#ch3').chromoselector("setColor","#" + settings.setting[x].channels[3].hex).chromoselector('load');
				$('#ch4').chromoselector("setColor","#" + settings.setting[x].channels[4].hex).chromoselector('load');
				update_enabled = true;
				settings.setting[0].channels[0].hex = settings.setting[x].channels[0].hex;
				settings.setting[0].channels[1].hex = settings.setting[x].channels[1].hex;
				settings.setting[0].channels[2].hex = settings.setting[x].channels[2].hex;
				settings.setting[0].channels[3].hex = settings.setting[x].channels[3].hex;
				settings.setting[0].channels[4].hex = settings.setting[x].channels[4].hex;
				settingsjson = JSON.stringify(settings);
				var colors = "";
				colors += settings.setting[x].channels[0].hex + "0";
				colors += settings.setting[x].channels[1].hex + "1";
				colors += settings.setting[x].channels[2].hex + "2";
				colors += settings.setting[x].channels[3].hex + "3";
				colors += settings.setting[x].channels[4].hex + "4";
				$.getJSON('/data/state.js', function(state) {
					if (state.state == "on") {
						$.ajax({
							url : "settingsupdate.php",
							type: "POST",
							data: {
								colors: colors,
								settings: settingsjson,
							},
							success: function(data) {
								if (data)
									console.log("PHP error (settingsupdate.php): " + data);
							}
						});
					}
				});
			}
		}
	});
}
function toggle() {
	$.getJSON('/data/state.js', function(state) {
		if (state.state == "on") {
			$.ajax({
				url : "off.php",
				type: "POST",
				success: function(data) {
					if (data)
						console.log("PHP error (off.php): " + data);
				}
			});
		} 
		else {
			$.getJSON('/data/settings.js', function(settings) {
				update_enabled = false;
				$('#ch0').chromoselector("setColor","#" + settings.setting[0].channels[0].hex).chromoselector('load');
				$('#ch1').chromoselector("setColor","#" + settings.setting[0].channels[1].hex).chromoselector('load');
				$('#ch2').chromoselector("setColor","#" + settings.setting[0].channels[2].hex).chromoselector('load');
				$('#ch3').chromoselector("setColor","#" + settings.setting[0].channels[3].hex).chromoselector('load');
				$('#ch4').chromoselector("setColor","#" + settings.setting[0].channels[4].hex).chromoselector('load');
				update_enabled = true;
				var colors = "";
				colors += settings.setting[0].channels[0].hex + "0";
				colors += settings.setting[0].channels[1].hex + "1";
				colors += settings.setting[0].channels[2].hex + "2";
				colors += settings.setting[0].channels[3].hex + "3";
				colors += settings.setting[0].channels[4].hex + "4";
				$.ajax({
					url : "on.php",
					type: "POST",
					data: {
						colors: colors,
					},
					success: function(data) {
						if (data)
							console.log("PHP error (settingsupdate.php): " + data);
					}
				});
			});
}
});
}

$(document).ready(function() {
	$.getJSON('data/settings.js', function(settings) {
		var current = settings.setting[0].channels;

		for (x = 0; x < settings.setting.length; x++) {
			if (settings.setting[x].title != "current") {
				$( "#profile" ).append( "<option value=" + settings.setting[x].title + ">" + settings.setting[x].nicename + "</option>" );
			}
		}

		$.fn.chromoselector
		.defaults("width", 180)
		.defaults("ringwidth", 50)
		.defaults("resizable", false)
		.defaults("speed", 250)

		$("#ch0").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[0].hex);
			},
			update: function() {
				colorbg(this);
				if (update_enabled)
					postphp(this,0);
			},
			str2color: function (str) {
				return '#' + str;
			},
			color2str: function (color) {
				return color.getHexString().substring(1);
			}
		});
		$("#ch1").chromoselector({
			create: function() {
				colorbg(this);
				$(this).chromoselector('setColor',"#" + current[1].hex);
			},
			update: function() {
				colorbg(this);
				if (update_enabled)
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
				$(this).chromoselector('setColor',"#" + current[2].hex);
			},
			update: function() {
				colorbg(this);
				if (update_enabled)
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
				$(this).chromoselector('setColor',"#" + current[3].hex);
			},
			update: function() {
				colorbg(this);
				if (update_enabled)
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
				$(this).chromoselector('setColor',"#" + current[4].hex);
			},
			update: function() {
				colorbg(this);
				if (update_enabled)
					postphp(this,4);
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
