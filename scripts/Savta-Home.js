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


		


	//When the gallery is closed, the page jumps to the place where the https address were before (like: #movie, #family-tree,  etc.).
	//In order to prevent this jump I wrote this function 
	$("#gallery-container").click(function(){
			if(history.pushState) {       //If the browser supports "history.pushState" ( = the browser let us plant history in the browser)
	    		history.pushState(null, null, '#gallery'); //then the browser will remember the hash "#gallery" as the last location that I was on the website. This code prevents the jump!
			}
			else {
	  			window.location.hash = 'gallery'; //If the browser don't support "history.pushState" then this code will be executed (but it will make a jump) 
			}
	});





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



	$("#mobile #subjects #savta").on("click", function(){
		if( (window.innerWidth < 601 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 826 && (window.matchMedia("(orientation: landscape)").matches)) ){
			$(this).css({"animation": "twirl 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because savta's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile #movieForMobile").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"}); //
			$("#mobile #subjects h1").first().fadeOut(1000);
			$("#mobile #xThatBringsBackSavtaImgInMobile").delay(1200).fadeIn(1000);
		}
	});

	//I made a function, that changes the src of the video and then brings it back,
	//because otherwise the video continues playing even when someone leaves the video's screen. 
	//(It's a way to make the video stops).
	function delaySrcChange() {
 		 $("#movieForMobile").attr("src", "").attr("src", "https://www.youtube-nocookie.com/embed/tshhrdR5jSM");
	}

	//When someone clicks the "X" sign near savta's movie, while the movie is open, 
	//then the iframe will disappear and the user will see savta's image again.
	//I'm changing the src, because otherwise the video continues playing (It's a way to make the video stops).
	$("#xThatBringsBackSavtaImgInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile #movieForMobile").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #savta").css({"animation": "twirlBack 1.2s 0.6s ease-out forwards"});
		$("#mobile #subjects h1").first().delay(1200).fadeIn(1000);
		setTimeout(delaySrcChange, 600);
	});






	//When someone clicks the picture of time-line on mobile screens, it disappears
	//and then the transformed div appears and also the "X" that closes the time-line appears.
	$("#mobile #subjects #clockImg").on("click", function(){
		if((window.innerWidth < 601 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 826 && (window.matchMedia("(orientation: landscape)").matches))){
			$(this).css({"animation": "twirl 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because the clock's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile #time-line-container-for-mobile").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"}); //
			$("#mobile .pic-box-time #time-line-header-horizontal").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"});
			$("#mobile #subjects .pic-box-time h1").fadeOut(1000);
			$("#mobile #xThatBringsBackClockImgInMobile").delay(1200).fadeIn(1000);
		}
	});


	//When someone clicks the "X" sign near savta's time-line,  
	//then the time-line will disappear and the user will see the clock image again.
	$("#xThatBringsBackClockImgInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile #time-line-container-for-mobile").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile .pic-box-time #time-line-header-horizontal").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #clockImg").css({"animation": "twirlBack 1.2s 0.8s ease-out forwards"});
		$("#mobile #subjects .pic-box-time h1").delay(1200).fadeIn(1000);
	});





	//When someone clicks the tree picture on mobile screens, it disappears
	//and then the transformed div appears and also the "X" that closes the family-tree appears.
	$("#mobile #subjects #treeMobileImg").on("click", function(){
		if((window.innerWidth < 601 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 826 && (window.matchMedia("(orientation: landscape)").matches))){
			$(this).css({"animation": "twirl 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because the clock's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile #family-tree-mobile-container").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"}); //
			$("#mobile #subjects .pic-box-tree h1").fadeOut(1000);
			$("#mobile #xThatBringsBackTreeImgInMobile").delay(1200).fadeIn(1000);
		}
	});


	//When someone clicks the "X" sign near savta's time-line,  
	//then the time-line will disappear and the user will see the clock image again.
	$("#xThatBringsBackTreeImgInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile #family-tree-mobile-container").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #treeMobileImg").css({"animation": "twirlBack 1.2s 0.8s ease-out forwards"});
		$("#mobile #subjects .pic-box-tree h1").delay(1200).fadeIn(1000);
	});



	//The familyTreeMobileImg wasn't centered inside its scrolled container
	//so I took the img's width and devided it to 3.6 (I tried different numbers from 2 and above)
	//until I reached its center
	var familyTreeContainerInsideContainer = $("#containerInsideContainer");
	var familyTreeMobileImg = $("#familyTreeMobileImg");
	var scrollto = familyTreeMobileImg.width() / 3.6;
	familyTreeContainerInsideContainer.animate({ scrollLeft:  scrollto});





	//When someone clicks the picture with the camera on mobile screens, it disappears
	//and then the transformed div appears and also the "X" that closes the family-tree appears.
	$("#mobile #subjects #galleryFrontImg").on("click", function(){
		if((window.innerWidth < 601 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 826 && (window.matchMedia("(orientation: landscape)").matches))){
			$(this).css({"animation": "twirl 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because the clock's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile #mobile-gallery-regular-container").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"}); //
			$("#mobile #subjects .pic-box-pictures h1").fadeOut(1000);
			$("#mobile #xThatBringsBackGalleryInMobile").delay(1200).fadeIn(1000);
		}
	});


	//When someone clicks the "X" sign near the gallery,  
	//then the time-line will disappear and the user will see the clock image again.
	$("#xThatBringsBackGalleryInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile #mobile-gallery-regular-container").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #galleryFrontImg").css({"animation": "twirlBack 1.2s 0.8s ease-out forwards"});
		$("#mobile #subjects .pic-box-pictures h1").delay(1200).fadeIn(1000);
	});




	//I devided the gallery to 4 different sections on the x-axis. When someone scrolls the gallery around the second section and
	//releases his finger, then the gallery will move exactly to the beginning of the second section. 
	$("#mobile-gallery-regular-container").on("touchmove", function(){ 

	 	console.log($(this).scrollLeft()); //shows us how many pixels we scrolled on x axis
	 	var containerSize = document.getElementById("mobile-gallery-wider-container").offsetWidth; //offsetWidth shows the width of an element (it doesn't work with jquery)
		if( ($(this).scrollLeft() > containerSize/8) && ($(this).scrollLeft() < containerSize/2.6666)  ){
			var quarter = containerSize / 4;
			$("#mobile-gallery-regular-container").animate({ scrollLeft: quarter}, 500);
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("secondCircle").style.background = "rgba(255, 255, 255, 1)";
			document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)";

		} else if ( ($(this).scrollLeft() > containerSize/2.6666) && ($(this).scrollLeft() < containerSize/1.6)  ){
			var half = containerSize / 2;
			$("#mobile-gallery-regular-container").animate({ scrollLeft: half}, 500);
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("thirdCircle").style.background = "rgba(255, 255, 255, 1)";
			document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)";

		} else if ( ($(this).scrollLeft() > containerSize/1.6) && ($(this).scrollLeft() < containerSize/1.144)  ){
			var threeQuarters = containerSize / 1.3333;
			$("#mobile-gallery-regular-container").animate({ scrollLeft: threeQuarters}, 500);
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("fourthCircle").style.background = "rgba(255, 255, 255, 1)";

		} else if ($(this).scrollLeft() <= containerSize/1.6){
			var theBeginning = 0;
			$("#mobile-gallery-regular-container").animate({ scrollLeft: theBeginning}, 500);
			document.getElementById("firstCircle").style.background = "rgba(255, 255, 255, 1)";
			document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)";
			document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)";
		}

	});

	// var familyTreeContainerInsideContainer = $("#containerInsideContainer");
	// var familyTreeMobileImg = $("#familyTreeMobileImg");
	// var scrollto = familyTreeMobileImg.width() / 3.6;
	// familyTreeContainerInsideContainer.animate({ scrollLeft:  scrollto});



});

