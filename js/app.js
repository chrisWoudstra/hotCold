
$(document).ready(function(){
	var answer = Math.floor((Math.random() * 100) + 1);
	var guesses = [];
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
	  
	$('#guessButton').click(function(e) {
		e.preventDefault();
		playGame(answer, guesses);
		clearNum();
			
	});
	$('#userGuess').keydown(function(enter) {
		if (enter.keycode == 13) {
			playGame(answer, guesses);
			clearNum();
		}
	});
	$('.new').click(function() {
		answer = Math.floor((Math.random() * 100) + 1);
	});

});



function playGame(answer, guesses) {
	var guess = parseInt($('#userGuess').val());
	var previousGuess = guesses[guesses.length - 1];
	var numGuesses = $('#guessList li').size();
	var distance = Math.abs(answer - guess);
	var previousDistance = Math.abs(answer - previousGuess);
	var repeatGuess = inArray(guess, guesses);
	
	if (isNaN(guess) || guess < 1 || guess > 100) {
		alert('You must choose a number between 1 and 100');
	}
	else if (repeatGuess == true) {
		alert('You have already guessed that number. Please try another.');
	}
	else if (guess > 0 && guess < 101) {
		guesses.push(guess);
		$('<li></i>').appendTo('#guessList').text(guess);
		$('#count').html(numGuesses + 1);
		if (guess == answer) {
			postMessage('You got it! Way to go!'); changeColor('#16B287');
			$('#guessButton').click(function() {
				alert('You\'ve already won. Please start a new game to try again!');
				postMessage('Please start a new game!');
				changeColor('#16B287');
				});
		}
		
		else if (distance > 40) {
			postMessage('Ice cold! Guess again!');
			changeColor('#283756');
			if (previousDistance > distance) {
				postMessage('Warmer, but still ice cold!');
			}
			else if (previousDistance < distance) {
				postMessage('Colder than ice cold!');
			}
		}
		else if (distance > 20 && distance <= 40) {
			postMessage('You\'re cold! Guess again!');
			changeColor('#0099ff');
			if (previousDistance > distance) {
				postMessage('Warmer, but still cold.');
			}
			else if (previousDistance < distance) {
				postMessage('Getting colder!');
			}
		}
		else if (distance > 5 && distance <= 20) {
			postMessage('You\'re warm!');
			changeColor('#e74c3c');
			if (previousDistance > distance) {
				postMessage('Getting warmer!');
			}
			else if (previousDistance < distance) {
				postMessage('Getting colder, but still warm!');
			}
		}
		else if (distance > 0 && distance <= 5) {
			postMessage('You\'re hot!');
			changeColor('#ef1d23');
			if (previousDistance > distance) {
				postMessage('Warmer! You\'re Hot!');
			}
			else if (previousDistance < distance) {
				postMessage('Colder, but still hot!');
			}	
		}
	}
}

function postMessage(message) {
	$('#feedback').html(message);
}

function changeColor(color) {
	$('#feedback').css('background-color', color);
}

function clearNum() {
	$('#userGuess').val('');
}

function inArray(guess, guesses) {
	return guesses.indexOf(guess) > -1;
}
