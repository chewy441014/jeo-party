// Append questions to each value box in the page
// add buzzer function to listen for the first users input with a "buzzedIn" boolean in the cookie
// add button click functionality to populate each question into the given field
// add logic to check answers that are given by the users
//      add a message telling the user whether their score was correct or incorrect
// add logic to update scores based on a correct/incorrect answer
const socket = io("http://localhost:3001");
//let {Game} = require('../../models')

const checkAnswer = (answerInput, correctAnswer) => {
    let answerBoolean = false;
    if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
        answerBoolean = true;
    }
    return answerBoolean;
};

const submitAnswer = async function (correctAnswer) {
    // Need API route to get correct answer
    if (checkAnswer(document.getElementById('#answerText').value, correctAnswer)) {
        document.getElementById('#answerText').reset();
            if (req.session.myTurn) {
                req.session.myTurn = false;
            }
            else {
                req.session.myTurn = true;
            }
    }
    else{
        alert('Answer is incorrect');
    }
};


// Function to get the selected question from the database to populate on the page
const questionClickHandler = async function (event) {
    // use event.target to get the id of the button that was clicked, and retrieve the question corresponding to this button
    cardID = event.target.id;
    console.log(cardID);
    let questionNumber = 0;
    switch(cardID){
        case 'r1c1':
            questionNumber = 0;
        break
        case 'r2c1':
            questionNumber = 1;
        break
        case 'r3c1':
            questionNumber = 2;
        break
        case 'r4c1':
            questionNumber = 3;
        break
        case 'r1c2':
            questionNumber = 4;
        break
        case 'r2c2':
            questionNumber = 5;
        break
        case 'r3c2':
            questionNumber = 6;
        break
        case 'r4c2':
            questionNumber = 7;
        break
        case 'r1c3':
            questionNumber = 8;
        break
        case 'r2c3':
            questionNumber = 9;
        break
        case 'r3c3':
            questionNumber = 10;
        break
        case 'r4c3':
            questionNumber = 11;
        break
        case 'r1c4':
            questionNumber = 12;
        break
        case 'r2c4':
            questionNumber = 13;
        break
        case 'r3c4':
            questionNumber = 14;
        break
        case 'r4c4':
            questionNumber = 15;
        break
        case 'r1c5':
            questionNumber = 16;
        break
        case 'r2c5':
            questionNumber = 17;
        break
        case 'r3c5':
            questionNumber = 18;
        break
        case 'r4c5':
            questionNumber = 19;
        break
    };
    const gameID = req.session.id;
    console.log(gameID);
    const questionIdResp = await fetch(`/api/gameStates/${gameID}`,{
        method: 'GET'
    });
    const questionIDs = await questionIdResp.json();
    console.log(questionIDs);
    const questionTextResp = await fetch(`/api/questions/${questionIDs[questionNumber]}`, {
        method: 'GET',
    });
    const questionText = await questionTextResp.json()
    console.log(questionText.question);

    const questionBox = document.getElementById('#question-text');
    questionBox.textContent.replace(questionText.question);

    document.getElementById('#submit-button').addEventListener('submit', submitAnswer(questionText.answer));

    console.log('clicked');
    console.log(questionNumber);
};

    // Show results
    //req.session.save(() => {
        //req.session.myTurn = true;
    //})
    //if (myTurn) {
       // window.alert('Pick a question!');
        // handle button presses from the game view
        //curTurn = true
        // if it's not your turn, the buttons should not be clickable
        // setup the button clicks for the questions
        // rows correspond to equal values
        // columns correspond to a single category
        // use the value and category to retrieve the corresponding question text from the database
        //if (curTurn) {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 5; j++) {
                    document.querySelector(`#r${i}c${j}`).addEventListener('click', questionClickHandler);
                };
            };
        //};
    //};


    
//TODO:alter question box once chosen

        // remove div once clicked????
    //can take out for loop from if stmt to run on load
    
// var style = document.createElement('style');
//     style.innerHTML =
//             '.question {' +
//             'color: black;' +
//             '}';

//  var ref = document.querySelector('script');            