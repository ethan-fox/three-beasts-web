import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentEasternDate, formatDateForDisplay, formatDateForApi } from "@/util/dateUtil";
import type { GuessrItemView } from "@/model/view/GuessrItemView";

interface DateSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
  summary: GuessrItemView[] | null;
  variant: string;
}

const DateSelector = ({ value, onChange, summary, variant }: DateSelectorProps) => {
  const today = getCurrentEasternDate();

  // Filter summary by variant, then convert to dates array
  const filteredSummary = summary?.filter((item) => item.variant === variant) || [];
  const availableDates: Date[] = filteredSummary.map((item) => {
    const [year, month, day] = item.date.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  const handleChange = (indexString: string) => {
    const selectedIndex = parseInt(indexString, 10);
    onChange(availableDates[selectedIndex]);
  };

  const currentIndex = availableDates.findIndex(
    (date) => date.toDateString() === value.toDateString()
  );

  const formatDisplayText = (date: Date, day_number?: number | null) => {
    const isToday = date.toDateString() === today.toDateString();
    const dateText = isToday ? "Today's Puzzles" : formatDateForDisplay(date);
    return day_number ? `#${day_number} - ${dateText}` : dateText;
  };

  // Loading state
  if (!summary) {
    return (
      <div className="w-auto h-9 px-4 py-2 border rounded-md text-sm bg-background shadow-xs dark:bg-input/30 dark:border-input text-center">
        Loading dates...
      </div>
    );
  }

  // No puzzles for this variant
  if (availableDates.length === 0) {
    return (
      <div className="w-auto h-9 px-4 py-2 border rounded-md text-sm bg-background shadow-xs dark:bg-input/30 dark:border-input text-center">
        No puzzles available
      </div>
    );
  }

  return (
    <Select value={currentIndex >= 0 ? currentIndex.toString() : "0"} onValueChange={handleChange}>
      <SelectTrigger className="w-auto cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableDates.map((date, index) => {
          const dateString = formatDateForApi(date);
          const summaryItem = filteredSummary.find((item) => item.date === dateString);
          const day_number = summaryItem?.day_number;
          const displayText = formatDisplayText(date, day_number);

          return (
            <SelectItem key={index} value={index.toString()} className="cursor-pointer">
              {displayText}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default DateSelector;
