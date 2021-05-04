
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var randomChosenColour;
var userClickedPattern = [];
var level = 0;
var started = 0;
// Functions


//use constructor Audio to create the sound object to play the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//flash the button
function animatePress(currentColour){

  $(currentColour).addClass("pressed");

  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  },100);

}

function nextSequence(){

  //replace the text to the corresponding level
  $("h1").text("Level " + level);
  level ++;
  //clean the userClickedPattern to restart a level
  userClickedPattern = [];
  // generate a color
  var randomNumber = Math.floor(Math.random() * 4) ;
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);

  var pick = "#" + randomChosenColour;
  //console.log(pick);
  //$(pick).addClass("flash");
  animatePress(pick);
  playSound(randomChosenColour);
  //
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = 0;
}

function checkAnswer(currentLevel){ //ex level  = 2 there shall be 3 color ex :["red" ,"red" ,"green"]

    if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
      //game over
      playSound("wrong"); // play sound
      $("body").addClass("game-over"); // flash the screen

      setTimeout(function () {
            $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart"); // replace the string
      //wait for user to press a key to restart

      startOver();

    }else{
      //console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000);
      }
    }

  //
}
//Event Listeners
//when any key is pressed , start the game
$(document).on("keydown",function(event){
  //console.log(event.key);
  if (!started){
      nextSequence();
      started = true ;

  }
});

//wait user to click the answers
$(".btn").on("click",function(event){
    //console.log($(this).attr("id"));
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //check everytime user click an colour , check the last one clicked
    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});
//check if they match




//main code
