$(document).ready(function(){


	//There is more than one "scroll" event on window, so we have to use addEventListener, because it's preventing same events to override one another
	window.addEventListener("scroll", headerDisappears);
	window.addEventListener("scroll", scrollButtonAppears);

	/* When the user scrolls down in mobile, hide the header. When the user scrolls to the top of the page, show the header */
	var startingScrollPos = 0; 
	function headerDisappears() {
	  var currentScrollPos = window.pageYOffset; //pageYOffset tells us how much the screen was scrolled on the Y axis (0 means it wasn't scrolled)
	  if (screen.width < 601 && (startingScrollPos < currentScrollPos)) {
	    document.getElementsByTagName("header")[0].style.top = "-60px";
	  } else {
	    document.getElementsByTagName("header")[0].style.top = "0";
	  }
	}

	//This function also hides the header in cases that the mobile screen is rotated to landscape view:
	// function headerDisappearsFunction() {
	//   var currentScrollPos = window.pageYOffset; //pageYOffset tells us how much the screen was scrolled on the Y axis (0 means it wasn't scrolled)
	//   if(screen.width >= 601 && screen.width < 825 && (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") && (startingScrollPos < currentScrollPos)){ //this rule is good for rotated mobile screens
	//   	document.getElementsByTagName("header")[0].style.top = "-60px";
	//   } else if (screen.width < 601 && (startingScrollPos < currentScrollPos)) {
	//     document.getElementsByTagName("header")[0].style.top = "-60px";
	//   } else {
	//     document.getElementsByTagName("header")[0].style.top = "0";
	//   }
	// }





	//Get the button
	var mybutton = document.getElementById("myBtn");

	//When someone scrolls down more than 600px from the top of the document, than the top-button will appear, but it won't appear in mobile screens (that are 600px wide or less) and it also won't work in mobile screens that were rotated to landscape view (their max-size in landscape view is 825px)
	function scrollButtonAppears() {
		 if (screen.width > 600 && screen.width < 825 && (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)) {   
		    mybutton.style.display = "block"; //this rule is good for tablets
		 } else if (screen.width > 600 && screen.width < 825 && (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)){
		 	mybutton.style.display = "none"; //this rule is good for mobile screen that was rotated
		 } else if(screen.width >= 825 && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)){
		 	mybutton.style.display = "block"; //this rule is good for tablets and computers
		 } else {
		 	mybutton.style.display = "none"; //this rule is good for mobile
		 }
	}

	// document.body.scrollTop = 0; // For Safari
 //  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


	// function buttonScrollFunction() {
	// 	 if (screen.width > 600 && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)) {   
	// 	    mybutton.style.display = "block";
	// 	 } else {
	// 	 	mybutton.style.display = "none";
	// 	 }
	// }






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



	// $("#div-that-help-put-pic-box-savta-in-ie-grid a picture").click(function(){
	// 	("#background-of-movie iframe").css({
	// 		"display": "block",
	// 		"position": "fixed",
	// 		"top": "0"

	// 	});
	// });




	const mainLinks = $("#subjects").find("a");

	//Cancelling the internal links in mobile:
	mainLinks.click(function(e){
		if((screen.width < 601 && (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary")) || (screen.width < 826 && (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary"))){
			e.preventDefault();
		}
	});



	 

	const movieImg = $("#subjects picture").first();

	//When someone clicks on the picture of savta on mobile screens, then the iframe of her movie and the "X" that closes the movie will appear
	// movieImg.on("click", function(){
	// 	if((screen.width < 601 && (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary")) || (screen.width < 826 && (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary"))){
	// 		$("#background-of-movie").css("display", "block"); //it was "display: none" in the mobile media query (inside the css)
	// 		$("#background-of-movie img").css("display", "block"); //it was "display: none" in the main css section
	// 	}
	// });


	movieImg.on("click", function(){
		if((screen.width < 601 && (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary")) || (screen.width < 826 && (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary"))){
			$("#background-of-movie").css("visibility", "visible"); //it was "visibility: hidden" in the mobile media query (inside the css)
			$("#background-of-movie img").css("visibility", "visible"); //it was "display: none" in the main css section and "visibility: hidden" in the mobile media query
		}
	});

	//When someone clicks the "X" sign near savta's movie, while the movie is open, than the iframe will disappear and the user will see the home screen again
	// $("#background-of-movie>img").on("click", function(){
	// 	$("#background-of-movie").css("display", "none");
	// 	$("#background-of-movie img").css("display", "none");
	// });


	$("#background-of-movie>img").on("click", function(){
		$("#background-of-movie").css("visibility", "hidden");
		$("#background-of-movie img").css("visibility", "hidden");
	});









});

