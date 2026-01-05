import type { GuessrItemView } from "@/model/view/GuessrItemView";

export interface DateSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
  summary: GuessrItemView[] | null;
}
