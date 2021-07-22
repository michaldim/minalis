$(document).ready(function(){


	//There is more than one "scroll" event on window, so we have to use addEventListener, because it's preventing same events to override one another
	window.addEventListener("scroll", headerDisappears);
	window.addEventListener("scroll", scrollButtonAppears);

	/* When the user scrolls down in mobile, hide the header. When the user scrolls to the top of the page, show the header */
	var startingScrollPos = 0; 
	function headerDisappears() {
	  var currentScrollPos = window.pageYOffset; //pageYOffset tells us how much the screen was scrolled on the Y axis (0 means it wasn't scrolled)
	  if ( (screen.width < 600 && (window.matchMedia("(orientation: portrait)").matches) && (startingScrollPos < currentScrollPos)) || 
	  	(screen.width < 900 && (window.matchMedia("(orientation: landscape)").matches) && (startingScrollPos < currentScrollPos)) ){
	    document.getElementsByTagName("header")[0].style.top = "-60px";
	  } else {
	    document.getElementsByTagName("header")[0].style.top = "0";
	  }
	}
	


	

	//Get the button
	var mybutton = document.getElementById("myBtn");

	//When someone scrolls down more than 600px from the top of the document, than the top-button will appear, 
	//but it won't appear in mobile screens (that are 600px wide or less) 
	//and it also won't work in mobile screens that were rotated to landscape view (their max-size in landscape view is less than 900px)
	function scrollButtonAppears() {
		 if (screen.width >= 600 && screen.width < 1281 && (window.matchMedia("(orientation: portrait)").matches) && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)) {   
		    mybutton.style.display = "block"; //this rule is good for tablets
		 } else if (screen.width < 900 && (window.matchMedia("(orientation: landscape)").matches) && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)){
		 	mybutton.style.display = "none"; //this rule is good for mobile screen that was rotated
		 } else if(screen.width >= 900 && (window.matchMedia("(orientation: landscape)").matches) && (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600)){
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



	//Clicking the first savta img in mobile, will make this img disappear 
	//and will make youtube movie and the X in the right corner appear
	$("#mobile #subjects #savta").on("click", function(){
		if( (window.innerWidth < 600 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 900 && (window.matchMedia("(orientation: landscape)").matches)) ){
			$(this).css({"animation": "twirlOtherDirection 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because savta's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile #movieForMobile").css({"animation": "twirlBackOtherDirection 1.2s 0.7s ease-out forwards"}); //
			$("#mobile #movieForMobileWithoutFullScreen").css({"animation": "twirlBackOtherDirection 1.2s 0.7s ease-out forwards"});
			$("#mobile #subjects h1").first().fadeOut(1000);
			$("#mobile #xThatBringsBackSavtaImgInMobile").delay(1200).fadeIn(1000);
		}
	});


	//I made a function, that changes the src of the video and then brings it back,
	//because otherwise the video continues playing even when someone leaves the video's screen. 
	//(It's a way to make the video stops).
	function delaySrcChange() {
		if( (window.innerWidth < 771 && (window.matchMedia("(orientation: landscape)").matches)) || (window.innerHeight < 671 && (window.matchMedia("(orientation: portrait)").matches)) ){
			$("#movieForMobile").attr("src", "").attr("src", "https://www.youtube-nocookie.com/embed/tshhrdR5jSM?fs=1");
		} else {
			$("#movieForMobileWithoutFullScreen").attr("src", "").attr("src", "https://www.youtube-nocookie.com/embed/tshhrdR5jSM?fs=0");
		}
	}
	

	//When someone clicks the "X" sign near savta's movie, while the movie is open, 
	//then the iframe will disappear and the user will see savta's image again.
	//I'm changing the src, because otherwise the video continues playing (It's a way to make the video stops).
	$("#xThatBringsBackSavtaImgInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile #movieForMobile").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #movieForMobileWithoutFullScreen").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #savta").css({"animation": "twirlBack 1.2s 0.6s ease-out forwards"});
		$("#mobile #subjects h1").first().delay(1200).fadeIn(1000);
		setTimeout(delaySrcChange, 600);
	});



	//When someone clicks the picture of time-line on mobile screens, it disappears
	//and then the transformed div appears and also the "X" that closes the time-line appears.
	$("#mobile #subjects #clockImg").on("click", function(){
		if((window.innerWidth < 600 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 900 && (window.matchMedia("(orientation: landscape)").matches))){
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
		if((window.innerWidth < 600 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 900 && (window.matchMedia("(orientation: landscape)").matches))){
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
		if((window.innerWidth < 600 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 900 && (window.matchMedia("(orientation: landscape)").matches))){
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


	

	//I devided the gallery (on mobile) to 4 different sections on the x-axis. When someone scrolls the gallery around the second section and
	//releases his finger, then the gallery will move exactly to the beginning of the second section. 
	//When someone scrolls the gallery around the third section and releases his finger,
	//then the gallery will move exactly to the beginning of the third section, etc.
	let lastTouchLocation;
	let currentLocation;
	window.translateXGalleryLocation = 1;//That will tell us which section of the 4 galley sections currently appears on the screen. 
										//I wrote window.translateXGalleryLocation instead of let translateXGalleryLocation, 
										//because the console didn't know how to read a global scope (and I had to check this variable)
	const widerGalleryContainer = document.getElementById("mobile-gallery-wider-container");
	const regularGalleryContainer = document.getElementById("mobile-gallery-regular-container");



	$("#mobile-gallery-regular-container").on("touchstart", function(e){  //touchstart
		//console.log(e); //When we do console log to "e", we get a lot of info like the next line I wrote:
		lastTouchLocation = e.touches[0].clientX; //this locates the x coordinate of the touchstart event
		// console.log("last location" + lastTouchLocation);
	});



	$("#mobile-gallery-regular-container").on("touchend", function(e){ //touchmove


		currentLocation = e.changedTouches[0].clientX; //this locate the x coordinate of the touchend event
		//console.log("current location" + currentLocation);
		
		//by the use of console.log(e); I found out that e.changedTouches[0].target shows me on which DOM element I started my touchend event:
		let id = $(e.changedTouches[0].target).attr("id");
				                   
		//rules to move the first section to the second section
		if( ((currentLocation - lastTouchLocation) < -10) && (id == 'img-a' || id == 'img-b' || id == 'img-c' || id == 'img-d' || id == 'img-e' || id == 'img-f')){
			widerGalleryContainer.style.animation = "galleryMovesLeft1 0.5s forwards ease";
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		document.getElementById("secondCircle").style.background = "rgba(255, 255, 255, 1)"; //the second bullet becomes white
	 		document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		window.translateXGalleryLocation = 2;
		} 

		//rules to move the second section to the third section
		else if ( ((currentLocation - lastTouchLocation) < -10) && (id == 'img-g' || id == 'img-h' || id == 'img-i' || id == 'img-j' || id == 'img-k' || id == 'img-l')){
			widerGalleryContainer.style.animation = "galleryMovesLeft2 0.5s forwards ease";
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("thirdCircle").style.background = "rgba(255, 255, 255, 1)"; //the third bullet becomes white
	 		document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		window.translateXGalleryLocation = 3;
		}

		//rules to move the third section to the fourth section
		else if ( ((currentLocation - lastTouchLocation) < -10) && (id == 'img-m' || id == 'img-n' || id == 'img-o' || id == 'img-p' || id == 'img-q' || id == 'img-r')){
			widerGalleryContainer.style.animation = "galleryMovesLeft3 0.5s forwards ease";
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("fourthCircle").style.background = "rgba(255, 255, 255, 1)"; //the fourth bullet becomes white
	 		window.translateXGalleryLocation = 4;
	 	}

		//rules to move the fourth section back to the third section	 		
	 	else if ( ((currentLocation - lastTouchLocation) > 10) && (id == 'img-s' || id == 'img-t' || id == 'img-u' || id == 'img-v' || id == 'img-w' || id == 'img-x')){
			widerGalleryContainer.style.animation = "galleryMovesRight3 0.5s forwards ease";
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("thirdCircle").style.background = "rgba(255, 255, 255, 1)"; //the third bullet becomes white
	 		document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		window.translateXGalleryLocation = 3;
	 	}

	 	//rules to move the third section back to the second section
	 	else if ( ((currentLocation - lastTouchLocation) > 10) && (id == 'img-m' || id == 'img-n' || id == 'img-o' || id == 'img-p' || id == 'img-q' || id == 'img-r')){
			widerGalleryContainer.style.animation = "galleryMovesRight2 0.5s forwards ease";
			document.getElementById("firstCircle").style.background = "rgba(125, 119, 119, 0.6)";
	 		document.getElementById("secondCircle").style.background = "rgba(255, 255, 255, 1)"; //the second bullet becomes white
	 		document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		window.translateXGalleryLocation = 2;
	 	}

	 	//rules to move the second section back to the first section
	 	else if ( ((currentLocation - lastTouchLocation) > 10) && (id == 'img-g' || id == 'img-h' || id == 'img-i' || id == 'img-j' || id == 'img-k' || id == 'img-l')){
			widerGalleryContainer.style.animation = "galleryMovesRight1 0.5s forwards ease";
			document.getElementById("firstCircle").style.background = "rgba(255, 255, 255, 1)"; //the first bullet becomes white
	 		document.getElementById("secondCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("thirdCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		document.getElementById("fourthCircle").style.background = "rgba(125, 119, 119, 0.6)"; 
	 		window.translateXGalleryLocation = 1;
	 	}

	 	//working on cases that we click on an image (the browser thinks that click is touchstart + touchend:
	 	else if ( ((currentLocation - lastTouchLocation) > -10) && ((currentLocation - lastTouchLocation) < 10) && (window.translateXGalleryLocation == 1)){
	 		widerGalleryContainer.style.animation = "galleryStaysAt1 0.7s forwards ease";
	 	}

	 	else if ( ((currentLocation - lastTouchLocation) > -10) && ((currentLocation - lastTouchLocation) < 10) && (window.translateXGalleryLocation == 2)){
	 		widerGalleryContainer.style.animation = "galleryStaysAt2 0.7s forwards ease";
	 	}

	 	else if ( ((currentLocation - lastTouchLocation) > -10) && ((currentLocation - lastTouchLocation) < 10) && (window.translateXGalleryLocation == 3)){
	 		widerGalleryContainer.style.animation = "galleryStaysAt3 0.7s forwards ease";
	 	}

	 	else if ( ((currentLocation - lastTouchLocation) > -10) && ((currentLocation - lastTouchLocation) < 10) && (window.translateXGalleryLocation == 4)){
	 		widerGalleryContainer.style.animation = "galleryStaysAt4 0.7s forwards ease";
	 	}

	});

		
		
	//on a bullet click (under the gallery), the mobile-gallery-wider-container will move to its correct location
	const firstBullet = document.getElementById("firstCircle");
	const secondBullet = document.getElementById("secondCircle"); 
	const thirdBullet = document.getElementById("thirdCircle"); 
	const fourthBullet = document.getElementById("fourthCircle"); 


	$(firstBullet).on("click",  function(){

	 	firstBullet.style.background = "rgba(255, 255, 255, 1)"; //the first bullet becomes white
	 	secondBullet.style.background = "rgba(125, 119, 119, 0.6)"; 
	 	thirdBullet.style.background = "rgba(125, 119, 119, 0.6)"; 
	 	fourthBullet.style.background = "rgba(125, 119, 119, 0.6)"; 

	 	if (window.translateXGalleryLocation == 2){
	 		widerGalleryContainer.style.animation = "galleryMovesRight1 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 3){
	 		widerGalleryContainer.style.animation = "galleryMovesRight2and1 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 4){
	 		widerGalleryContainer.style.animation = "galleryMovesRight3and2and1 0.5s forwards ease";
	 	}

	 	window.translateXGalleryLocation = 1;
	});



	 $(secondBullet).on("click",  function(){

	 	firstBullet.style.background = "rgba(125, 119, 119, 0.6)";
	 	secondBullet.style.background = "rgba(255, 255, 255, 1)";  //the second bullet becomes white
	 	thirdBullet.style.background = "rgba(125, 119, 119, 0.6)"; 
	 	fourthBullet.style.background = "rgba(125, 119, 119, 0.6)"; 

	 	if (window.translateXGalleryLocation == 1){
	 		widerGalleryContainer.style.animation = "galleryMovesLeft1 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 3){
	 		widerGalleryContainer.style.animation = "galleryMovesRight2 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 4){
	 		widerGalleryContainer.style.animation = "galleryMovesRight3and2 0.5s forwards ease";
	 	}

	 	window.translateXGalleryLocation = 2;
	});



	$(thirdBullet).on("click",  function(){

	 	firstBullet.style.background = "rgba(125, 119, 119, 0.6)";
	 	secondBullet.style.background = "rgba(125, 119, 119, 0.6)";  
	 	thirdBullet.style.background = "rgba(255, 255, 255, 1)"; //the third bullet becomes white
	 	fourthBullet.style.background = "rgba(125, 119, 119, 0.6)"; 

	 	if (window.translateXGalleryLocation == 1){
	 		widerGalleryContainer.style.animation = "galleryMovesLeft1and2 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 2){
	 		widerGalleryContainer.style.animation = "galleryMovesLeft2 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 4){
	 		widerGalleryContainer.style.animation = "galleryMovesRight3 0.5s forwards ease";
	 	}

	 	window.translateXGalleryLocation = 3;
	});

	 			
	 			
	$(fourthBullet).on("click",  function(){

	 	firstBullet.style.background = "rgba(125, 119, 119, 0.6)";
	 	secondBullet.style.background = "rgba(125, 119, 119, 0.6)";  
	 	thirdBullet.style.background = "rgba(125, 119, 119, 0.6)"; 
	 	fourthBullet.style.background = "rgba(255, 255, 255, 1)"; //the fourth bullet becomes white

	 	if (window.translateXGalleryLocation == 1){
	 		widerGalleryContainer.style.animation = "galleryMovesLeft1and2and3 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 2){
	 		widerGalleryContainer.style.animation = "galleryMovesLeft2and3 0.5s forwards ease";
	 	} else if (window.translateXGalleryLocation == 3){
	 		widerGalleryContainer.style.animation = "galleryMovesLeft3 0.5s forwards ease";
	 	}

	 	window.translateXGalleryLocation = 4;
	});
	 		
	 	


	//on ios, the layer under the fancybox appears on screen, even when fancybox is open (it's a bug). 
	//So the way to fix it is by making the gallery disappear (other trials didn't work).
	//so since fancybox is adding class="fancybox-active" to the body, while fancubox is active, 
	//and since this class disappears while fancubox is not active, so I used MutationObserver.observe() 
	//which provides the ability to watch for changes being made to the DOM tree.
	var element = document.getElementsByTagName('body');
	var body = element[0];
			
	//I'm making a object called MutationObserver and mutations is its a parameter
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {  //for each element in the mutations' array, the next function will work 

			if ((mutation.type == "attributes") && (body.className == "fancybox-active")) {
				widerGalleryContainer.style.display = "none";
				document.getElementById("xThatBringsBackGalleryInMobile").style.display = "none";
				document.getElementById("bulletsContainer").style.display = "none";
				   		
			} 
			else if ((mutation.type == "attributes") && (body.className !== "fancybox-active")) {
				widerGalleryContainer.style.display = "grid";	
				document.getElementById("xThatBringsBackGalleryInMobile").style.display = "block";
				document.getElementById("bulletsContainer").style.display = "block";
				// widerGalleryContainer.style.animation = "galleryMovesRight1 0.5s forwards ease";	
			}

		});
	});

	//this is the function call:
	observer.observe(body, {
		attributes: true //configure it to listen to attribute changes in the body
	});





	//When someone clicks the #recipesFrontImg on mobile screens, it disappears
	//and then the transformed div appears and also the "X" that closes the recipes container.
	$("#mobile #subjects #recipesFrontImg").on("click", function(){
		if((window.innerWidth < 600 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 900 && (window.matchMedia("(orientation: landscape)").matches))){
			$(this).css({"animation": "twirl 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because the clock's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile .pic-box-food ul").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"}); //
			$("#mobile .pic-box-food #recipes-mobile-container").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"});
			$("#mobile #subjects .pic-box-food h1").fadeOut(1000);
			$("#mobile #xThatBringsBackRecipesInMobile").delay(1200).fadeIn(1000);
		}
	});


	//When someone clicks the "X" sign near the recipes container,  
	//then the the recipes container will disappear and the user will see the img of #recipesFrontImg again.
	$("#xThatBringsBackRecipesInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile .pic-box-food ul").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile .pic-box-food #recipes-mobile-container").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #recipesFrontImg").css({"animation": "twirlBack 1.2s 0.8s ease-out forwards"});
		$("#mobile #subjects .pic-box-food h1").delay(1200).fadeIn(1000);
	});



	//when someone clicks on a recipe title on the upper line, it goes down with the rest of its line
	const topRecipes = document.getElementsByClassName("topRecipes");
	const bottomRecipes = document.getElementsByClassName("bottomRecipes");

	for (i = 0; i < 3; i++){
		topRecipes[i].onclick = function() {
		topRecipes[0].style.order = "3";
		topRecipes[1].style.order = "4";
		topRecipes[2].style.order = "5";
		bottomRecipes[0].style.order = "1";
		bottomRecipes[1].style.order = "2";
	};
	}

	//If the bottom line of the recipes is at the top, so when someone clicks it, it goes to the bottom with the rest of its line.
	for (i = 0; i < 2; i++){
		bottomRecipes[i].onclick = function() {
		topRecipes[0].style.order = "0";
		topRecipes[1].style.order = "1";
		topRecipes[2].style.order = "2";
		bottomRecipes[0].style.order = "3";
		bottomRecipes[1].style.order = "4";
	};
	}




	//When someone clicks the #musicFrontImg on mobile screens, it disappears
	//and then the transformed div appears and also the "X" that closes the recipes container.
	$("#mobile #subjects #musicFrontImg").on("click", function(){
		if((window.innerWidth < 600 && (window.matchMedia("(orientation: portrait)").matches)) || (window.innerWidth < 900 && (window.matchMedia("(orientation: landscape)").matches))){
			$(this).css({"animation": "twirl 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because the violin's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile .pic-box-music #mobile-music-iframes").css({"animation": "twirlBack 1.2s 0.7s ease-out forwards"});
			$("#mobile #subjects .pic-box-music h1").fadeOut(1000);
			$("#mobile #xThatBringsBackMusicInMobile").delay(1200).fadeIn(1000);
		}
	});


	//I made a function, that pauses the videos (after the X button is clicked),
	//because otherwise the videos continue playing even when someone leaves the music/video's screen. 
	function srcPause() {
		for (i = 0; i < players.length; i++ ){  //the player is an Array that I made in the youTubeAPI.js file
			players[i].pauseVideo();
		}
	}
	

	//When someone clicks the "X" sign at the top of the music container,  
	//then the the music container will disappear and the user will see the img of #musicFrontImg again.
	$("#xThatBringsBackMusicInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile .pic-box-music #mobile-music-iframes").css({"animation": "twirl 0.5s ease-in forwards"});
		$("#mobile #subjects #musicFrontImg").css({"animation": "twirlBack 1.2s 0.8s ease-out forwards"});
		$("#mobile #subjects .pic-box-music h1").delay(1200).fadeIn(1000);
		setTimeout(srcPause, 600);
	});





	const wideMusicContainer = document.getElementById("widerMusicContainer");
	const regularMusicContainer = document.getElementById("mobile-music-iframes");

	//The next variable helps calculate the starting position of the music slider.
	//The #second-song needs to be centered at the middle of the screen.
	//Since we have 8 videos and we need to put the #second-song (which has 2 videos before it) at the center, then we take 
	//the container's width, devide it by 8 and multiply it by 2.5.
	//The other part of the calculation, puts the number we got at the center of the screen
	let calculateStartingPoint = -((((wideMusicContainer.offsetWidth)/8)*2.5)- (0.5 * window.innerWidth)); //offsetWidth tells us the width of an element 

	//wideMusicContainer.style.marginLeft = calculateStartingPoint + "px";

	let lastMusicTouchLocation;
	let currentMusicTouchLocation;
	window.marginLeftMusicLocation = 2;//That will tell us which video of the 6 music videos is currently at the center of the screen.
										//It equals 2, since #second-song is at the center of the screen at the beginning.
										//I wrote window.marginLeftGalleryLocation instead of let marginLeftGalleryLocation, 
										//because the console didn't know how to read a global scope (and I had to check this variable)


	$("#widerMusicContainer").on("touchstart", function(e){  //touchstart
		lastMusicTouchLocation = e.touches[0].clientX; //this locates the x coordinate of the touchstart event
	});


	$("#widerMusicContainer").on("touchend", function(e){ //touchmove


		currentMusicTouchLocation = e.changedTouches[0].clientX;//this locates the x coordinate of the touchend event


		if( ((currentMusicTouchLocation - lastMusicTouchLocation) < -10) && (window.marginLeftMusicLocation == 2) ){	
			window.marginLeftMusicLocation += 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX2ndTo3rdVideo 1s forwards ease"
			document.getElementById("widerMusicContainer").getElementsByClassName("second-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("third-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) < -10) && (window.marginLeftMusicLocation == 3) ){
			window.marginLeftMusicLocation += 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX3rdTo4thVideo 1s forwards ease"
			document.getElementById("widerMusicContainer").getElementsByClassName("third-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("fourth-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) < -10) && (window.marginLeftMusicLocation == 4) ){
			window.marginLeftMusicLocation += 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX4thTo5thVideo 1s forwards ease"
			document.getElementById("widerMusicContainer").getElementsByClassName("fourth-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("fifth-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) < -10) && (window.marginLeftMusicLocation == 5) ){
			window.marginLeftMusicLocation += 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX5thTo6thVideo 1s forwards ease"
			document.getElementById("widerMusicContainer").getElementsByClassName("fifth-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("sixth-song")[0].style.animation = "scaleBig 0.8s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("zero-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) < -10) && (window.marginLeftMusicLocation == 6) ){
			window.marginLeftMusicLocation = 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX6thTo1stVideo 1s forwards ease"
			document.getElementById("widerMusicContainer").getElementsByClassName("zero-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("sixth-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("first-song")[0].style.animation = "scaleBig 0.8s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("seventh-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}


		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) < -10) && (window.marginLeftMusicLocation == 1) ){
			window.marginLeftMusicLocation += 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX1stTo2ndVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("first-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("second-song")[0].style.animation = "scaleBig 0.8s forwards ease";
			//If someone swipe right and suddenly changes dirrection, it'll cause the #seventh-song to appear big, that's why we need the next line:
			document.getElementById("widerMusicContainer").getElementsByClassName("seventh-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
		}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		//The videos are on a "videos slider" where the #first-song is changing to #sixth-song after swiping right with our finger
		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) > 10) && (window.marginLeftMusicLocation == 1) ){
			window.marginLeftMusicLocation = 6;
			document.getElementById("widerMusicContainer").style.animation = "translateX1stTo6thVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("seventh-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("first-song")[0].style.animation = "scaleSmall 0.4s forwards ease";			
			document.getElementById("widerMusicContainer").getElementsByClassName("sixth-song")[0].style.animation = "scaleBig 0.8s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("zero-song")[0].style.animation = "scaleBig 0.8s forwards ease";//
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) > 10) && (window.marginLeftMusicLocation == 6) ){
			window.marginLeftMusicLocation = 5;
			document.getElementById("widerMusicContainer").style.animation = "translateX6thTo5thVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("sixth-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("fifth-song")[0].style.animation = "scaleBig 0.8s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("zero-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) > 10) && (window.marginLeftMusicLocation == 5) ){
			window.marginLeftMusicLocation = 4;
			document.getElementById("widerMusicContainer").style.animation = "translateX5thTo4thVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("fifth-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("fourth-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) > 10) && (window.marginLeftMusicLocation == 4) ){
			window.marginLeftMusicLocation = 3;
			document.getElementById("widerMusicContainer").style.animation = "translateX4thTo3rdVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("fourth-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("third-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) > 10) && (window.marginLeftMusicLocation == 3) ){
			//calculateStartingPoint += ((wideMusicContainer.offsetWidth)/8);
			//wideMusicContainer.style.marginLeft = calculateStartingPoint + "px";
			window.marginLeftMusicLocation = 2;
			document.getElementById("widerMusicContainer").style.animation = "translateX3rdTo2ndVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("third-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("second-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}		

		else if( ((currentMusicTouchLocation - lastMusicTouchLocation) > 10) && (window.marginLeftMusicLocation == 2) ){
			window.marginLeftMusicLocation = 1;
			document.getElementById("widerMusicContainer").style.animation = "translateX2ndTo1stVideo 1s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("second-song")[0].style.animation = "scaleSmall 0.4s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("first-song")[0].style.animation = "scaleBig 0.8s forwards ease";
			document.getElementById("widerMusicContainer").getElementsByClassName("seventh-song")[0].style.animation = "scaleBig 0.8s forwards ease";
		}



		//pointer-events: auto; means that the user can click on the chosen element. 
		//I told the CSS that the pointer-events for the iframe is "none", because
		//I couldn't swipe the #widerMusicContainer (the mobile devices reffered only to the iframes and not to the bigger container around it),
		//so this javascript code is telling that if there is a click and not a swipe, then the iframes can be clicked.
		if( ((currentMusicTouchLocation - lastMusicTouchLocation) < 10) && ((currentMusicTouchLocation - lastMusicTouchLocation) > -10) ){
			$("iframe").css("pointerEvents", "auto");
		}
		

	});
	












});

