import { getAvailableDateRange, formatDateForDisplay, getCurrentEasternDate } from "@/util/dateUtil";

interface DateSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
  guessrId?: number;
}

const DateSelector = ({ value, onChange, guessrId }: DateSelectorProps) => {
  const availableDates = getAvailableDateRange();
  const today = getCurrentEasternDate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value, 10);
    onChange(availableDates[selectedIndex]);
  };

  const currentIndex = availableDates.findIndex(
    (date) => date.toDateString() === value.toDateString()
  );

  const formatDisplayText = (date: Date, calculatedId?: number) => {
    const isToday = date.toDateString() === today.toDateString();
    const dateText = isToday ? "Today's Puzzles" : formatDateForDisplay(date);
    return calculatedId ? `#${calculatedId} - ${dateText}` : dateText;
  };

  return (
    <select
      id="date-select"
      value={currentIndex}
      onChange={handleChange}
      className="w-auto p-2 border rounded-md bg-white text-center"
    >
      {availableDates.map((date, index) => {
        const calculatedId = guessrId ? guessrId + (currentIndex - index) : undefined;
        const displayText = formatDisplayText(date, calculatedId);

        return (
          <option key={index} value={index}>
            {displayText}
          </option>
        );
      })}
    </select>
  );
};

export default DateSelector;
