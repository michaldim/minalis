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

	
	



});

