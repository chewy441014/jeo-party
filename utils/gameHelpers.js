// Helper functions to run the game and calucalte scores

checkAnswer((answerInput, correctAnswer) => {
    let answerBoolean = false;
    if(answerInput.toLowerCase() === correctAnswer.toLowerCase()){
        answerBoolean = true;
    }
    return answerBoolean;
});

addScore((value, currentScore) => {
    currentScore = value + currentScore;
    return currentScore;
});

subtractScore((value, currentScore) => {
    currentScore = currentScore - value;
    return currentScore;
});