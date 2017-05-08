document.addEventListener("DOMContentLoaded", function() {

  var channelArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var url = "https://wind-bow.glitch.me/twitch-api/"
  var channels = document.getElementById("container");

  // loop through all default channels in array
  channelArray.forEach(function(item){
    var status = "";

    // Stream information request
    var requestStatus = new XMLHttpRequest();
    requestStatus.open('GET', url + 'streams/' + item, true);
    requestStatus.onload = function() {

      if (this.status >= 200 && this.status < 400){
        var dataB = JSON.parse(this.response);
        if(dataB.stream === null){
          status = "offline";
        } else {
          status = "online";
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
          var data = JSON.parse(this.response);
          var row = document.createElement("div");
          var img = document.createElement("img");
          var imgUrl = "http://placehold.it/40x40"

          channels.appendChild(row);
          row.className = "row";
          // add logo
          if(data.logo) {
            imgUrl = data.logo;
          }
          // build the rows with data
          row.innerHTML = '<img src="' + imgUrl + '"><div class="title"><a href="' + data.url + '">' + data.display_name + '</a></div><div class="status ' + status + '">' + status + '</div>';

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


  // Event listeners


  document.getElementById("all-button").addEventListener("click", function(){
    console.log("clicked");
  });
  document.getElementById("online-button").addEventListener("click", function(){
    console.log("clicked");
    var offClass = document.querySelectorAll('.offline').classList;
    offClass.add('handle');
  });
  document.getElementById("offline-button").addEventListener("click", function(){
    console.log("clicked");
  });

});
