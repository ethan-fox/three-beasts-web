import { threeBeastsBackend } from "@/client/ThreeBeastsBackend";
import type { GuessrItemView } from "@/model/view/GuessrItemView";
import type { GuessrDetailView } from "@/model/view/GuessrDetailView";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessSubmission } from "@/model/api/GuessSubmission";
import type { HowToPlayView } from "@/model/view/HowToPlayView";
import type { DayStatsView } from "@/model/view/DayStatsView";

class GuessrClient {
  async listGuessrs(date?: string, variant?: string): Promise<GuessrItemView[]> {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    if (variant) params.variant = variant;

    const response = await threeBeastsBackend.get<GuessrItemView[]>(`/v1/guessr`, {
      params,
    });
    return response.data;
  }

  async getGuessr(guessrId: number): Promise<GuessrDetailView> {
    const response = await threeBeastsBackend.get<GuessrDetailView>(
      `/v1/guessr/${guessrId}`
    );
    return response.data;
  }

  async validateGuesses(
    guessrId: number,
    submission: GuessSubmission
  ): Promise<BatchGuessValidationView> {
    const response = await threeBeastsBackend.post<BatchGuessValidationView>(
      `/v1/guessr/${guessrId}`,
      submission
    );
    return response.data;
  }

  async fetchHowToPlay(): Promise<HowToPlayView> {
    const response = await threeBeastsBackend.get<HowToPlayView>(`/guessr/how-to-play`);
    return response.data;
  }

  async getStats(guessrId: number): Promise<DayStatsView> {
    const response = await threeBeastsBackend.get<DayStatsView>(
      `/v1/guessr/${guessrId}/stats`
    );
    return response.data;
  }
}

export default GuessrClient;
export const guessrClient = new GuessrClient();
