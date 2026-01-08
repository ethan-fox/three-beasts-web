import type { HintView } from "@/model/view/HintView";
import type { ContentItemView } from "@/model/view/ContentItemView";

export interface GuessrPuzzleView {
  id: number;
  hint: HintView;
  content: ContentItemView[];
}
