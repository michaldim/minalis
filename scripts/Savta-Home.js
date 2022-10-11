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
			setTimeout(() => {
				$("#mobile #movieForMobile").css("transform", "rotateY(0deg)");
				$("#mobile #movieForMobile").css({"animation": "none"}); 
				$("#mobile #movieForMobile").addClass('animationRemoved');
            	$("#mobile #movieForMobile").removeClass('animationIsOn');
			}, 1900);
		}
	});


	//I made a function, that changes the src of the video and then brings it back,
	//because otherwise the video continues playing even when someone leaves the video's screen. 
	//(It's a way to make the video stops).
	function delaySrcChange() {
		if( (window.innerWidth < 771 && (window.matchMedia("(orientation: landscape)").matches)) || (window.innerHeight < 671 && (window.matchMedia("(orientation: portrait)").matches)) ){
			$("#movieForMobile").attr("src", "").attr("src", "https://player.vimeo.com/video/757880417?h=d7cb0c4844&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479");
		} else {
			$("#movieForMobileWithoutFullScreen").attr("src", "").attr("src", "https://player.vimeo.com/video/757880417?h=d7cb0c4844&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479");
		}
	}
	

	//When someone clicks the "X" sign near savta's movie, while the movie is open, 
	//then the iframe will disappear and the user will see savta's image again.
	//I'm changing the src, because otherwise the video continues playing (It's a way to make the video stops).
	$("#xThatBringsBackSavtaImgInMobile").on("click", function(){
		$("#mobile #movieForMobile").addClass('animationIsOn');
        $("#mobile #movieForMobile").removeClass('animationRemoved');
		$(this).fadeOut(500);
		$("#mobile #movieForMobile").css("transform", "rotateY(-90deg)");
		$("#mobile #movieForMobile").css({"animation": "twirlOtherDirection 0.5s ease-in forwards"});
		$("#mobile #movieForMobileWithoutFullScreen").css({"animation": "twirlOtherDirection 0.5s ease-in forwards"});
		$("#mobile #subjects #savta").css({"animation": "twirlBackOtherDirection 1.2s 0.6s ease-out forwards"});
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
			$(this).css({"animation": "twirlOtherDirection 0.6s ease-in forwards", "transform": "rotateY(90deg)"}); //I used transform here, because the clock's img appears in (0deg) when I want to bring it back (after clicking on the X)
			$("#mobile #family-tree-mobile-container").css({"animation": "twirlBackOtherDirection 1.2s 0.7s ease-out forwards"}); //
			$("#mobile #subjects .pic-box-tree h1").fadeOut(1000);
			$("#mobile #xThatBringsBackTreeImgInMobile").delay(1200).fadeIn(1000);
		}
	});


	//When someone clicks the "X" sign near savta's time-line,  
	//then the time-line will disappear and the user will see the clock image again.
	$("#xThatBringsBackTreeImgInMobile").on("click", function(){
		$(this).fadeOut(500);
		$("#mobile #family-tree-mobile-container").css({"animation": "twirlOtherDirection 0.5s ease-in forwards"});
		$("#mobile #subjects #treeMobileImg").css({"animation": "twirlBackOtherDirection 1.2s 0.8s ease-out forwards"});
		$("#mobile #subjects .pic-box-tree h1").delay(1200).fadeIn(1000);
	});



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
			$(".MobileSong").css("pointerEvents", "none");
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

	



	//The familyTreeMobileImg wasn't centered inside its scrolled container
	//so I took the img's width and devided it to 3.6 (in order to reach its center)
	var familyTreeContainerInsideContainer = $("#containerInsideContainer");
	var familyTreeMobileImg = $("#familyTreeMobileImg");
	var scrollto = familyTreeMobileImg.width() / 3.6;
	familyTreeContainerInsideContainer.animate({ scrollLeft:  scrollto});




	//I devided the gallery (on mobile) to 4 different sections on the x-axis. When someone scrolls the gallery around the second section and
	//releases his finger, then the gallery will move exactly to the beginning of the second section. 
	//When someone scrolls the gallery around the third section and releases his finger,
	//then the gallery will move exactly to the beginning of the third section, etc.
	let lastTouchLocation;
	let currentLocation;
	window.translateXGalleryLocation = 0;//That will tell us which section of the 4 galley sections currently appears on the screen. 
										//I wrote window.translateXGalleryLocation instead of let translateXGalleryLocation, 
										//because the console didn't know how to read a global scope (and I had to check this variable)
	const widerGalleryContainer = document.getElementById("mobile-gallery-wider-container");
	const regularGalleryContainer = document.getElementById("mobile-gallery-regular-container");


	//The gallery bullets
	const bullet1 =	document.getElementById("firstCircle");
	const bullet2 =	document.getElementById("secondCircle");
	const bullet3 =	document.getElementById("thirdCircle");
	const bullet4 =	document.getElementById("fourthCircle");
	const bullets = [bullet1, bullet2, bullet3, bullet4];


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

		let IDsDevidedByScreens = [['img-a', 'img-b', 'img-c', 'img-d', 'img-e', 'img-f'],  //IDsDevidedByScreens[0];
							  	  ['img-g', 'img-h', 'img-i', 'img-j', 'img-k', 'img-l'],  //IDsDevidedByScreens[1];
							 	  ['img-m', 'img-n', 'img-o', 'img-p', 'img-q', 'img-r'],  //IDsDevidedByScreens[2];
								  ['img-s', 'img-t', 'img-u', 'img-v', 'img-w', 'img-x']]; //IDsDevidedByScreens[3];
	

		//This function will help us find the index of the screen section that was clicked at the beginning of the touch action
		//(The screen is devided to 4 sections/arrays in IDsDevidedByScreens)
		function screensIndex(){
			let a;
			IDsDevidedByScreens.forEach(function(value, index){
				value.forEach(function(insideValue, insideIndex){  //The value is the inner array
					if (id == insideValue){
						a = index;
					}
				});
			});
			return a;
		} 					  	


		let startingScreenIndex = screensIndex(); //Now I'm calling the screensIndex() function and put it in a variable

		if((currentLocation - lastTouchLocation) < -10) { //When someone swipes his finger from right to left
				if (startingScreenIndex < 3) {   //It is smaller than 3, because we can't swipe the 4th screen in that direction, since it's the last one
					widerGalleryContainer.style.animation = "galleryMoves" + startingScreenIndex + "to" + (startingScreenIndex + 1) + " 0.5s forwards ease";  //The widerGalleryContainer moves, and a new section of the gallery appears
					bullets[startingScreenIndex + 1].style.background = "rgba(255, 255, 255, 1)"; //The new screen's bullet will become white
					bullets[startingScreenIndex].style.background = "rgba(125, 119, 119, 0.6)";	//The previous bullet will become grey
					window.translateXGalleryLocation = startingScreenIndex + 1; //The new translateXGalleryLocation 
				}		
		} else if ((currentLocation - lastTouchLocation) > 10) {    //When someone swipes his finger from left to right
					if (startingScreenIndex > 0) {  //It is bigger than 0, because we can't swipe the first screen in that direction
						widerGalleryContainer.style.animation = "galleryMoves" + startingScreenIndex + "to" + (startingScreenIndex - 1) + " 0.5s forwards ease";
						bullets[startingScreenIndex - 1].style.background = "rgba(255, 255, 255, 1)"; //The new screen's bullet will become white
						bullets[startingScreenIndex].style.background = "rgba(125, 119, 119, 0.6)";	//The previous bullet will become grey
						window.translateXGalleryLocation = startingScreenIndex - 1;  //The new translateXGalleryLocation
					}
		 } else if (((currentLocation - lastTouchLocation) >= -10) && ((currentLocation - lastTouchLocation) <= 10)) {  //working on cases that we click on an image (the browser thinks that click is touchstart + touchend)
					widerGalleryContainer.style.animation = "galleryStaysAt"+ startingScreenIndex +" 0.7s forwards ease";  //The gallery stays in place
					window.translateXGalleryLocation = startingScreenIndex;
		}

	});

		


	//When someone clicks a gallery bullet, it will change its color and the widerGalleryContainer location
	for (j = 0; j < 4; j++){
		$(bullets[j]).on("click",  function(){
		  	this.style.background = "rgba(255, 255, 255, 1)"; //this bullet becomes white
		  	let n; //It will represent the variable k outside the inner scope
			for (k = 0; k < 4; k++){  		//for all other bullets
				if (this != (bullets[k])){
					bullets[k].style.background = "rgba(125, 119, 119, 0.6)"; //these bullets become grey
				} else {
					n = k; //will help us find the index of the bullet that was clicked
				}
			} 

			let m = window.translateXGalleryLocation;
			if (m != n){  
				widerGalleryContainer.style.animation = "galleryMoves" + m + "to" + n + " 0.5s forwards ease";
			}
			window.translateXGalleryLocation = n;
		});
	}
	
	 		
	 	


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
			}

		});
	});

	//this is the function call:
	observer.observe(body, {
		attributes: true //configure it to listen to attribute changes in the body
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
		if (i < 2) {   //If the bottom line of the recipes is at the top, so when someone clicks it, it goes to the bottom with the rest of its line.
			bottomRecipes[i].onclick = function() {
				topRecipes[0].style.order = "0";
				topRecipes[1].style.order = "1";
				topRecipes[2].style.order = "2";
				bottomRecipes[0].style.order = "3";
				bottomRecipes[1].style.order = "4";
			};
		}
	}





	const regularMusicContainer = document.getElementById("mobile-music-iframes");
	const wideMusicContainer = document.getElementById("widerMusicContainer");

	//The next variable helps calculate the starting position of the music slider.
	//The #second-song needs to be centered at the middle of the screen.
	//Since we have 8 videos and we need to put the #second-song (which has 2 videos before it) at the center, then we take 
	//the container's width, devide it by 8 and multiply it by 2.5.
	//The other part of the calculation, puts the number we got at the center of the screen
	let calculateStartingPoint = -((((wideMusicContainer.offsetWidth)/8)*2.5)- (0.5 * window.innerWidth)); //offsetWidth tells us the width of an element 

	//wideMusicContainer.style.marginLeft = calculateStartingPoint + "px";
	
	let lastMusicTouchLocation;
	let currentMusicTouchLocation;
	window.musicLocation = 2;//That will tell us which video of the 6 music videos is currently at the center of the screen.
							//It equals 2, since #second-song is at the center of the screen at the beginning.
							//I wrote window.marginLeftGalleryLocation instead of let marginLeftGalleryLocation, 
							//because the console didn't know how to read a global scope (and I had to check this variable)


	$("#widerMusicContainer").on("touchstart", function(e){  //touchstart
		lastMusicTouchLocation = e.touches[0].clientX; //this locates the x coordinate of the touchstart event
	});


	$("#widerMusicContainer").on("touchend", function(e){ //touchmove

		currentMusicTouchLocation = e.changedTouches[0].clientX;//this locates the x coordinate of the touchend event

		const musicArray =["minusOne-song", "zero-song", "first-song", "second-song", "third-song", "fourth-song", "fifth-song", "sixth-song", "seventh-song", "eighth-song"];
		let i = window.musicLocation;

		function videoSizeChangeRight(element){
			wideMusicContainer.getElementsByClassName(musicArray[element + 1])[0].style.animation = "scaleSmall 0.4s forwards ease";
			wideMusicContainer.getElementsByClassName(musicArray[element + 2])[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		function videoSizeChangeLeft(element){
			wideMusicContainer.getElementsByClassName(musicArray[element + 1])[0].style.animation = "scaleSmall 0.4s forwards ease";
			wideMusicContainer.getElementsByClassName(musicArray[element])[0].style.animation = "scaleBig 0.8s forwards ease";
		}

		if(((currentMusicTouchLocation - lastMusicTouchLocation) <= -10) && (i >= 1) && (i <= 6)){  //Swipe to the right (the finger goes left)

			if (i == 6){
				wideMusicContainer.style.animation = "translateX6to1video 1s forwards ease";  //The gallery is a loop, so when it reaches its end, it starts from the beginning
			} else {
				wideMusicContainer.style.animation = "translateX" + i + "to" + (i + 1) +"video 1s forwards ease";  //It's based on the CSS animation keyframes
			}

			videoSizeChangeRight(i);

			switch (i) {        		   //switch is the same as "if", but it looks cleaner
				case 1:                    //"first-song" is the same as "seventh-song"
					videoSizeChangeRight(7);
					break;
				case 2:                    //"second-song" is the same as "eighth-song" (It's an edge case)
					wideMusicContainer.getElementsByClassName(musicArray[8 + 1])[0].style.animation = "scaleSmall 0.4s forwards ease"; //"eighth-song"
					break;
				case 5:                    //"fifth-song" is the same as "minusOne-song"
					videoSizeChangeRight(-1);
					break;
				case 6:                    //"sixth-song" is the same as "zero-song"
					videoSizeChangeRight(0);
					window.musicLocation = 0; 
					break;
			}
	
			window.musicLocation += 1;
		

		} else if( ((currentMusicTouchLocation - lastMusicTouchLocation) >= 10) && (i >= 1) && (i <= 6)){ //Swipe to the left (the finger goes right)

			if (i == 1){
				wideMusicContainer.style.animation = "translateX1to6video 1s forwards ease";  //the gallery is a loop, so when it reaches its end, it starts from the beginning
			} else {
				wideMusicContainer.style.animation = "translateX" + i + "to" + (i - 1) + "video 1s forwards ease";  //It's based on the CSS animation keyframes
			}
			
			videoSizeChangeLeft(i);

			switch (i) {   //It's the same as "if" but looks better
				case 6:                       //"sixth-song" is the same as "zero-song"
					videoSizeChangeLeft(0);
					break;
				case 5:                       //"fifth-song" is the same as "minusOne-song" (It's an edge case)
					wideMusicContainer.getElementsByClassName(musicArray[0])[0].style.animation = "scaleSmall 0.4s forwards ease";
					break;
				case 2: 					  //"second-song" is the same as "eighth-song"
				 	videoSizeChangeLeft(8);
				 	break;
				case 1:                       //"first-song" is the same as "seventh-song"
					videoSizeChangeLeft(7);
					window.musicLocation = 7;  //the gallery is a loop, so when it reaches its end, it starts from the beginning
					break;
			}

			window.musicLocation -= 1;	


		} else if( ((currentMusicTouchLocation - lastMusicTouchLocation) < 10) && ((currentMusicTouchLocation - lastMusicTouchLocation) > -10) ){
			
			$(".MobileSong").css("pointerEvents", "auto");  //If the click is in one place and not a swipe, then the videos will become clickable
		}
		

	});
	




});

