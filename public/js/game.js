// Append questions to each value box in the page
// add buzzer function to listen for the first users input with a "buzzedIn" boolean in the cookie
// add button click functionality to populate each question into the given field
// add logic to check answers that are given by the users
//      add a message telling the user whether their score was correct or incorrect
// add logic to update scores based on a correct/incorrect answer
const socket = io();
let {Game, User} = require('../../models')
const curTurn = false;

socket.on('buzzed', data => {
    // Show results
    
    Game.curr_turn = Object.keys(socket.game_id)[1]
    if (curr_turn = User.username){
        window.alert('Pick a question!');
        // handle button presses from the game view
        curTurn = true
        // if it's not your turn, the buttons should not be clickable
        // setup the button clicks for the questions
        // rows correspond to equal values
        // columns correspond to a single category
        // use the value and category to retrieve the corresponding question text from the database
        if (curTurn) {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 5; j++) {
                    document.querySelector(`#r${i}c${j}`).addEventListener('click', questionClickHandler);
                };
            };
        };
    };
        const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
            console.log('clicked')
        };


    // Disable buzz button
    $('#buzz-button').removeClass('enabled').attr('disabled', 'disabled');
  });
