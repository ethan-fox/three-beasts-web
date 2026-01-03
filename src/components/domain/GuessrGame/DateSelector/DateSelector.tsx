import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentEasternDate, formatDateForDisplay, formatDateForApi } from "@/util/dateUtil";
import type { DateSelectorProps } from "@/model/component/DateSelectorProps";

const DateSelector = ({ value, onChange, summary }: DateSelectorProps) => {
  const today = getCurrentEasternDate();

  // Convert summary to dates array
  const availableDates: Date[] = summary
    ? summary.map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);
        return new Date(year, month - 1, day);
      })
    : [];

  const handleChange = (indexString: string) => {
    const selectedIndex = parseInt(indexString, 10);
    onChange(availableDates[selectedIndex]);
  };

  const currentIndex = availableDates.findIndex(
    (date) => date.toDateString() === value.toDateString()
  );

  const formatDisplayText = (date: Date, puzzleId?: number) => {
    const isToday = date.toDateString() === today.toDateString();
    const dateText = isToday ? "Today's Puzzles" : formatDateForDisplay(date);
    return puzzleId ? `#${puzzleId} - ${dateText}` : dateText;
  };

  // Loading state
  if (!summary) {
    return (
      <div className="w-auto p-2 border rounded-md bg-card text-foreground text-center">
        Loading dates...
      </div>
    );
  }

  return (
    <Select value={currentIndex.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-auto cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableDates.map((date, index) => {
          const dateString = formatDateForApi(date);
          const summaryItem = summary.find((item) => item.date === dateString);
          const puzzleId = summaryItem?.id;
          const displayText = formatDisplayText(date, puzzleId);

          return (
            <SelectItem key={index} value={index.toString()}>
              {displayText}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default DateSelector;
