document.addEventListener("DOMContentLoaded", function() {

  var channelArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var url = "https://wind-bow.glitch.me/twitch-api/"
  var channels = document.getElementById("container");

  // loop through all default channels in array
  channelArray.forEach(function(item){
    var status = "";
    var iconClass = "";
    // status information request
    var requestStatus = new XMLHttpRequest();

    requestStatus.open('GET', url + 'streams/' + item, true);
    requestStatus.onload = function() {
      if (this.status >= 200 && this.status < 400){
        var dataStatus = JSON.parse(this.response);
        if(dataStatus.stream === null){
          status = "offline";
          iconClass = "fa-times";
        } else {
          status = "online";
          iconClass = "fa-check";
        }
        fetchData(item); // call rest of data once status collected.
      } else {
        console.log("ERROR FETCHING DATA");
      }
    };
    requestStatus.onerror = function() {
      console.log("ERROR CONNECTING TO SERVER");
    };
    requestStatus.send();


    // Channel data request
    function fetchData(item){
      var requestChannel = new XMLHttpRequest();
      requestChannel.open('GET', url + 'channels/' + item, true);

      requestChannel.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          var dataChannel = JSON.parse(this.response);
          var row = document.createElement("div");
          var img = document.createElement("img");
          var imgUrl = "http://placehold.it/40x40"

          channels.appendChild(row);
          row.className = "row";
          // add logo
          if(dataChannel.logo) {
            imgUrl = dataChannel.logo;
          }
          // build the rows with data
          row.innerHTML = '<img src="' + imgUrl + '"><div class="title"><a href="' + dataChannel.url + '">' + dataChannel.display_name + '</a></div><div class="status"><i class="fa ' + iconClass + '" aria-hidden="true"></i></div>';
          row.className = 'row ' + status;

        } else {
          console.log("ERROR FETCHING DATA");
        }
      };
      requestChannel.onerror = function() {
        console.log("ERROR CONNECTING TO SERVER");
      };
      requestChannel.send();
    }
  });

  // Button event listeners
  document.getElementById("all-button").addEventListener("click", function(){
    removeHandle();
  });
  document.getElementById("online-button").addEventListener("click", function(){
    removeHandle();
    addHandle('.offline');
  });
  document.getElementById("offline-button").addEventListener("click", function(){
    removeHandle();
    addHandle('.online');
  });

  // class manipulation functions
  function removeHandle(){
    var elements = document.querySelectorAll('.row');
    for(var i = 0; i < elements.length; i++){
      elements[i].classList.remove('handle');
    }
  }

  function addHandle(selector){
    var elements = document.querySelectorAll(selector);
    for(var i = 0; i < elements.length; i++){
      elements[i].classList.add('handle');
    }
  }
});
