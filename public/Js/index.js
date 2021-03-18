

    function playaudio(){
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
    }


    $("button").on("mouseover" , function(){
      $("button").playaudio();


    })
