import type { GuessrSummaryView } from "@/model/view/GuessrSummaryView";

export interface DateSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
  summary: GuessrSummaryView[] | null;
}
