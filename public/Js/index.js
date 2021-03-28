

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

      $(".weather").on("click",function(){
        $(".weather").text("hello ");
      })




        var date = new Date();
        const time = date.getHours();

        var wish = "";

        if (time < 12) {
        wish = "Good Morning!!";

        } else if (time < 18) {
        wish = "Good Afternoon !!";
        $("body").on("mouseover",function(){
          $("body").css("background-image","url(/images/afternoon.jpg)");
        })

        } else {
        wish = "Good Evening!!";
        $("body").on("mouseover",function(){
          $("body").css("background-image","url(/images/lastnight2.jpg)");
        })
        }

        $("#wish").on("mouseover",function(){
          $("#wish").text(wish);
        })





      var timeDisplay = document.getElementById("time");


      function refreshTime() {
        var dateString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
        var formattedString = dateString.replace(", ", " - ");
        timeDisplay.innerHTML = formattedString;
      }

      setInterval(refreshTime, 1000);
