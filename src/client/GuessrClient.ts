import { threeBeastsBackend } from "./ThreeBeastsBackend";
import type { GuessrListView } from "@/model/view/GuessrListView";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessSubmission } from "@/model/api/GuessSubmission";
import type { HowToPlayView } from "@/model/view/HowToPlayView";

class GuessrClient {
  async fetchPuzzles(date: string): Promise<GuessrListView> {
    const response = await threeBeastsBackend.get<GuessrListView>(`/guessr/`, {
      params: { date },
    });
    return response.data;
  }

  async submitGuesses(
    guessrId: number,
    submission: GuessSubmission
  ): Promise<BatchGuessValidationView> {
    const response = await threeBeastsBackend.post<BatchGuessValidationView>(
      `/guessr/${guessrId}`,
      submission
    );
    return response.data;
  }

  async fetchHowToPlay(): Promise<HowToPlayView> {
    const response = await threeBeastsBackend.get<HowToPlayView>(`/guessr/how-to-play`);
    return response.data;
  }
}

export default GuessrClient;
export const guessrClient = new GuessrClient();
