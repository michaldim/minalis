$(document).ready(function(){

	//There is more than one "scroll" event on window, so we have to use addEventListener, because it's preventing same events to override one another
	window.addEventListener("scroll", headerDisappearsFunction);
	window.addEventListener("scroll", buttonScrollFunction);

	/* When the user scrolls down, hide the header. When the user scrolls to the top of the page, show the header */
	var startingScrollPos = 0; 
	function headerDisappearsFunction() {
	  var currentScrollPos = window.pageYOffset; //pageYOffset tells us how much the screen was scrolled on the Y axis (0 means it wasn't scrolled)
	  if (screen.width < 601 && (startingScrollPos < currentScrollPos)) {
	    document.getElementsByTagName("header")[0].style.top = "-60px";
	  } else {
	    document.getElementsByTagName("header")[0].style.top = "0";
	  }
	}


	//Get the button
	var mybutton = document.getElementById("myBtn");

	//The screen needs to be bigger than 600px and when someone scrolls down more than 600px from the top of the document, than the button will appear
	function buttonScrollFunction() {
		 if (screen.width > 600 && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)) {   
		    mybutton.style.display = "block";
		 } else {
		    mybutton.style.display = "none";
		 }
	}

	





	//The next code uses jQuery plug-in:"scripts/smooth-scroll.polyfills.js". 
	//It makes the in-page anchors to have a smoothScroll in the speed that I choose. 
	//Adittional info about this code in https://github.com/cferdinandi/smooth-scroll

	var scroll = new SmoothScroll('a[href="#movie"]', {         //I chose a link to have the smoothScroll
		speed: 1100												//I added a speed to the scroll
	});

	var scroll = new SmoothScroll('a[href="#time-line"]', {
		speed: 450
	});

	var scroll = new SmoothScroll('a[href="#family-tree"], a[href="#gallery"]', {      //I chose a few links to have the smoothScroll (a comma separates them)   
		speed: 550													
	});

	var scroll = new SmoothScroll('a[href="#recipes"], a[href="#music"]', {		
		speed: 350
	});

	var scroll = new SmoothScroll('a[href="#header"]', {       //this is the pink top button
		speed: 500
	});

	


	

	//make the mobile screen portrait at all times
	//ScreenOrientation.lock("portrait");
	
//
	window.addEventListener("load", lock);
	//window.addEventListener("orientationchange", lock);

	function lock () {
	 	if (screen.width < 601) {
	 		window.screen.orientation.lock("portrait");
	 	// } else if ((screen.width < 825) && (screen.width > 601) && (navigator.userAgent.indexOf( "Mobile" ) !== -1)){
	 	// 	window.screen.orientation.lock("portrait");
	 	}
	}
	 	// } else if((screen.width < 825) && (window.innerHeight < window.innerWidth) && (navigator.userAgent.indexOf( "Mobile" ) !== -1) ) {
	 	// 	window.screen.orientation.lock("portrait");
	 	
	
//&& (window.innerHeight > window.innerWidth)
	// function makeTheScreenPortrait() {
	// 	if (screen.width < 825 && (window.innerHeight < window.innerWidth)){
	// 		document.body.style.height = "100vw";
	// 		document.body.style.transform = "rotate(+90deg)";
	// 		document.body.style.msTransform = "rotate(+90deg)";
	// 	} 
	// }


	///////////////&& (navigator.userAgent.indexOf( "Mobile" ) !== -1) 
	// body {
	// 		    height: 100vw;
	// 		    -webkit-transform: rotate(-90deg);
	// 		    -moz-transform: rotate(-90deg);
	// 		    -o-transform: rotate(-90deg);
	// 		    -ms-transform: rotate(-90deg);
	// 		    transform: rotate(-90deg);
	// 		  }


});

