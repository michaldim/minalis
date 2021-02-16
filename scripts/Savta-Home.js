$(document).ready(function(){


	//Get the button
	var mybutton = document.getElementById("myBtn");

	// When the user scrolls down 600px from the top of the document, show the button
	window.onscroll = scrollFunction;

	function scrollFunction() {
		 if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
		    mybutton.style.display = "block";
		 } else {
		    mybutton.style.display = "none";
		 }
	}

	// When the user clicks the button, the page will be scrolled up to the top of the document
	mybutton.onclick = topFunction;

	function topFunction() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
		
	//$('[data-fancybox="gallery"]').fancybox({
	// Options will go here
	//});


});

