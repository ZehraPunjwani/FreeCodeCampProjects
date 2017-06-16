var apiURL = "https://wind-bow.glitch.me/twitch-api/streams/";
var twitchStreamers = [
	"ESL_SC2",
	"OgamingSC2",
	"cretetion",
	"freecodecamp",
	"storbeck",
	"habathcx",
	"RobotCaleb",
	"noobs2ninjas",
	"brunofin",
	"comster404"
];

$(document).ready(function() {
	for (var i = 0; i < twitchStreamers.length; i++) {
		queryAJAX("All", twitchStreamers[i]);
	}
	$(".searchButton").on("click", function() {
		search();
	});
	$(".navText").on("click", function() {
		$(".navText").removeClass("selected");
		$(this).addClass("selected");
		var btnText = $(this).text();
		empty("#OnlineUsers");
		empty("#OfflineUsers");
		for (var i = 0; i < twitchStreamers.length; i++) {
			queryAJAX(btnText, twitchStreamers[i]);
		}
		if(btnText === 'Online'){
			document.getElementById('OfflineUsers').style.display = "none";
			document.getElementById('OnlineUsers').style.display = "block";
		}else if(btnText === 'Offline'){
			document.getElementById('OnlineUsers').style.display = "none";
			document.getElementById('OfflineUsers').style.display = "block";
		}else{
			document.getElementById('OnlineUsers').style.display = "block";
			document.getElementById('OfflineUsers').style.display = "block";
		}
	});
});

function queryAJAX(btnText, indexVal) {
	$.ajax({
		url: apiURL + indexVal,
		dataType: "jsonp",
		data: {
			format: "json"
		},
		success: function(data) {
			fetchOnlineData(data);
		},
		error: function() {
			$("#OnlineUsers").append("Unable to access json");
		}
	});
}

var fetchOnlineData = function(data) {
	if (data.stream === null) {
		url = data._links.channel.substr(38);
		fetchOfflineData();
	} else if (data.status == 422 || data.status == 404) {
		status = data.message;
		$("#OnlineUsers").append(status);
	} else {
		var elem;
		if (data.stream.channel.logo !== null) {
			elem = data.stream.channel.logo;
		} else {
			elem = 'http://dhiglobal.com/wp-content/uploads/2016/07/placeholder.jpg';
		}
		url = data._links.channel.substr(38);
		status =
			"<p id='onlineResult'>" + "<img src='" + elem + "'id='imgHolder' class='leftFloatImg' width='50'></img>" +
			"<a href='https://twitch.tv/" +
			url +
			"' target='_blank'" +
			">" +
			data.stream.channel.display_name +
			"<BR></a> " +
			data.stream.game +
			"</p>";
		document.getElementById("#imgHolder");
		$("#OnlineUsers").append(status);
	}
};

var fetchOfflineData = function() {
	$.ajax({
		url: "https://wind-bow.glitch.me/twitch-api/channels/" + url,
		dataType: "jsonp",
		data: {
			format: "json"
		},
		success: function(json) {
			var elem;
			var outputName;
			if (json.logo !== null) {
				elem = json.logo;
			} else {
				elem = 'http://dhiglobal.com/wp-content/uploads/2016/07/placeholder.jpg';
			}
			status =
				"<p id='offlineResult'>" + "<img src='" + elem + "'id='imgHolder' class='leftFloatImg' width='50'></img>" +
				"<a href='" +
				json.url +
				"' target='_blank'" +
				"'>" +
				json.display_name +
				"<BR></a>" +
				" Offline </p>";
			$("#OfflineUsers").append(status);
		}
	});
};

var empty = function(strID) {
	// clear prior search results
	$(strID).empty();
};

var search = function(){
	empty("#OnlineUsers");
	empty("#OfflineUsers");
	var searchQuery = $(".searchTerm").val();
	$(".searchTerm").val('');
	var user = searchQuery.replace(/[^A-Z0-9_]/ig, "");
	$.ajax({
			url: apiURL + user,
			dataType: "jsonp",
			data: {
					format: "json"
			},
			success: function (data) {
					fetchOnlineData(data);                    
			}, 
			error: function(data) {
				$("#OnlineUsers").append("Unable to access json");
			}
	});
}

// trigger submit on use of enter key
  $(".searchTerm").keyup(function(event) {
    if (event.keyCode == 13) {
      $(".searchButton").click();
    }
  });