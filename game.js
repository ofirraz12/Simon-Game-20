let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = []; 
let level = 0; 

let sounds = {};
buttonColours.forEach(colour => {
    sounds[colour] = new Audio("sounds/" + colour + ".mp3");
});
sounds["wrong"] = new Audio("sounds/wrong.mp3");

setTimeout(function() {
    nextSequence();
}, 2000);

$(".btn").click(function() {
    if (gamePattern.length > 0) {
        let userChosenColour = this.id; 
        userPattern.push(userChosenColour); 
        
        // Play sound for the button pressed
        playSound(userChosenColour);

        // Animate button pressed
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 50);

        checkPress(userPattern.length - 1);
    }
});

// Restart game on click in lose state
$(".lose-state").click(function() {
    resetGame();
});

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var random_n = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[random_n];
    gamePattern.push(randomChosenColour);
    showPattern();
}

function showPattern() {
    for (let i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
            }, i * 500);
        })(i);
    }
}

function checkPress(currentIndex) {
    if (userPattern[currentIndex] === gamePattern[currentIndex]) {
        console.log("Correct Pressed!");

        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong Pressed!");
        playSound("wrong");
        $(".lose-state").show();
        $("#level-title").text("Game Over!");
        gamePattern = [];
    }
}

function playSound(name) {
    // Create a new Audio instance each time to play the sound immediately
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(error => {
        console.error("Error playing sound:", error);
    });
}

function resetGame() {
    level = 0;
    gamePattern = [];
    userPattern = [];
    $(".lose-state").hide();
    $("#level-title").text("Starting...");
    setTimeout(function() {
        nextSequence();
    }, 2000);
}
