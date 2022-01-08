var backgroundSound = new Audio("sounds2/bgMusic.mp3");
// var lvlChangeSound = new Audio("sounds/level_change.mp3")


var colorsGiven = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

function start()
{
    level = 0;
    gamePattern = [];
    started = true;
    backgroundSound.play();
}

$(document).keydown(function()
{
    if (!started)
    {    start();
        nxtSeq();
    }
});

function button_animation(currentBut)
{
    $(currentBut).addClass("pressed");
    setTimeout(function()
    {
        $(currentBut).removeClass("pressed");
    },100);
}

function button_sound(currentBut)
{
    var aud = new Audio("sounds2/" + currentBut + ".mp3");
    aud.play();
}

$(".btn").click(function()
{
    var userChosenColor = $(this).attr('id'); 
    userPattern.push(userChosenColor);

    button_animation("#" + userChosenColor);
    button_sound(userChosenColor);

    check(userPattern.length - 1);
});

function check(currentLevel)
{
    if (gamePattern[currentLevel] == userPattern[currentLevel])
    {
        if (gamePattern.length === userPattern.length)
        {
            
            setTimeout(nxtSeq(),1000);
        }
    }
    else 
    {
        button_sound("wrong");
        $("#level-title").html("GAME OVER  <br ><h6 style = 'color:white;'>Press any key to restart again!</h6>");
        $("body").addClass("game-over");
        $("body").fadeOut();
        setTimeout(function()
        {
            $("body").fadeIn();
        },600);
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },600);
        started = false;
        backgroundSound.stop();
    }
}

function nxtSeq()
{
    // lvlChangeSound.play();
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = colorsGiven[randomNumber];
    gamePattern.push(randomChosenColour);

   
    setTimeout(function(){
        button_animation("#" + randomChosenColour);
        button_sound(randomChosenColour); 
    },1000);
    setTimeout(function(){
        $("#level-title").text("Your turn");
    },1500);
}

