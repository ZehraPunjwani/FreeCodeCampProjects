var currentQuote = "";

$(document).ready(function() {
	$.ajaxSetup({
		cache: false
	});
	random();
	$('#btnTwitter').click(function() {
		window.open("https://twitter.com/intent/tweet?text=" + currentQuote);
	});
	$('#getNewQuote').click(random);
});

var random = function() {
	var urlStr = "https://cors-everywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
	$('#quote').empty();
	$('#author').empty();
	$.getJSON(urlStr, function(a) {
		$("#quote").append(a[0].content);
		$("#author").append("~" + a[0].title);
		currentQuote = $("#quote").text() + $("#author").text();
	});
};