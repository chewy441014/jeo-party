// handle button presses from the game view

// if it's not your turn, the buttons should not be clickable

const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
    console.log('clicked')
}

const curTurn = false;

// setup the button clicks for the questions
// rows correspond to equal values
// columns correspond to a single category
// use the value and category to retrieve the corresponding question text from the database
if (curTurn) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 5; j++) {
            document.querySelector(`#r${i}c${j}`).addEventListener('click', questionClickHandler);
        }
    }
}