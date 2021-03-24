

    function playaudio(){
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
    }


    $("button").on("click" , function(){
      $("button").playaudio();

    });


      $(".giphy1").on("mouseover",function(){
        $(".giphy1").attr("src","images/giphy2.gif");

      });


      var timeDisplay = document.getElementById("time");


      function refreshTime() {
        var dateString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
        var formattedString = dateString.replace(", ", " - ");
        timeDisplay.innerHTML = formattedString;
      }

      setInterval(refreshTime, 1000);


    
