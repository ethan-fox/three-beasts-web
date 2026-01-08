export const calculateAccuracy = (score: number): number => {
  return Math.round((score / 33) * 100);
};

export const getMotivationalMessage = (score: number): string => {
  if (score === 100) {
    return "Perfect! You're a savant.";
  } else if (score >= 90) {
    return "You know your stuff!";
  } else if (score >= 75) {
    return "Well done, I'm impressed.";
  } else if (score >= 50) {
    return "Not bad! You're on your way.";
  } else if (score >= 25) {
    return "Keep practicing!";
  } else {
    return "Better luck next time.";
  }
};
