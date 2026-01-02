export interface PuzzleGuess {
  id: number;
  year: number;
}

export interface GuessSubmission {
  guesses: PuzzleGuess[];
}
