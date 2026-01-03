import type { PlayerView } from "@/model/view/PlayerView";
import type { BattingStat, PitchingStat } from "@/model/view/PuzzleView";

export interface PlayerTableProps {
  players: PlayerView[];
  stat?: BattingStat | PitchingStat;
}
