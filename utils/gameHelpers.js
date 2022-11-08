// Helper functions to run the game and calucalte scores

const checkAnswer = (answerInput, correctAnswer) => {
    let answerBoolean = false;
    if(answerInput.toLowerCase() === correctAnswer.toLowerCase()){
        answerBoolean = true;
    }
    return answerBoolean;
};

const addScore = ((value, currentScore) => {
    currentScore = value + currentScore;
    return currentScore;
});

const subtractScore = ((value, currentScore) => {
    currentScore = currentScore - value;
    return currentScore;
});