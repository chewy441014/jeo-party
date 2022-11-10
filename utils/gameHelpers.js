// Helper functions to run the game and calucalte scores

const checkAnswer = (answerInput, correctAnswer) => {
    let answerBoolean = false;
    if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
        answerBoolean = true;
    }
    return answerBoolean;
};

const addScore = (value, currentScore) => {
    currentScore = value + currentScore;
    return currentScore;
};

const subtractScore = (value, currentScore) => {
    currentScore = currentScore - value;
    return currentScore;
};

const submitAnswer = async function (event) {
    // Need API route to get correctAnswer
    if (checkAnswer(`#answerText`, correctAnswer)) {
        document.getElementById('answerText').reset();
        if (`#r${i}c${j}`) {
            if (req.session.myTurn) {
                req.session.myTurn = false;
            }
            else {
                req.session.myTurn = true;
            }
        }
    }
};
