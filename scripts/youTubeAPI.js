
  // 2. This code loads the IFrame Player API code
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      //This array contains the id names of the divs that contain the iframes
      let musicIds = ["zero-song", "first-song", "second-song", "third-song", "fourth-song", "fifth-song", "sixth-song", "seventh-song"];
      //This array contains the youTube's videoId
      let videoIds = ["nJ1ERiGhpmA", "ZUVEq6NC7mM", "mqokFDOE4AQ", "Akk2zwoA80s", "vYs-BHkMV_A", "xejh9WAJEHg", "nJ1ERiGhpmA", "ZUVEq6NC7mM"];

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        for (i = 0; i < musicIds.length; i++) {

          let currentSong = musicIds[i];
          let currentVideo = videoIds[i];

          let onReadyPlayer = function(event) {            
            $("#" + currentSong).css("pointerEvents", "none");
          }

          let onPlayerStateChange = function(event) {
            if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
              $(".MobileSong").css("pointerEvents", "none");
            } else if (event.data == YT.PlayerState.PLAYING) {
              $("#" + currentSong).css("pointerEvents", "auto");
            }
          }

          player = new YT.Player(currentSong, {
            height: '100%',
            width: '200',
            videoId: currentVideo,
            playerVars: {
              'playsinline': 1
            },
            events: {
              'onReady': onReadyPlayer,
              'onStateChange': onPlayerStateChange
            }
          });

        }  
      }

      
