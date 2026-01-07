import DateSelector from "@/components/domain/DateSelector/DateSelector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import HowToPlay from "@/components/domain/HowToPlay/HowToPlay";
import type { GuessrItemView } from "@/model/view/GuessrItemView";

interface GameControlsProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  summary: GuessrItemView[] | null;
}

const GameControls = ({ selectedDate, onDateChange, summary }: GameControlsProps) => {
  return (
    <div className="relative mb-[clamp(1rem,2vh,2rem)] flex justify-center">
      <DateSelector value={selectedDate} onChange={onDateChange} summary={summary} />
      <div className="absolute top-0 right-0 flex items-center gap-1">
        <ThemeToggle />
        <HowToPlay />
      </div>
    </div>
  );
};

export default GameControls;
