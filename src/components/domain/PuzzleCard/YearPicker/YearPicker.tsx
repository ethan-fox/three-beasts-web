import { Input } from "@/components/ui/input";
import type { YearPickerProps } from "@/model/component/YearPickerProps";

const YearPicker = ({ value, onChange, minYear, maxYear, disabled }: YearPickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text === "") {
      onChange(null);
      return;
    }

    const year = parseInt(text, 10);
    onChange(isNaN(year) ? null : year);
  };

  return (
    <Input
      type="number"
      inputMode="numeric"
      min={minYear}
      max={maxYear}
      value={value ?? ""}
      onChange={handleChange}
      placeholder={`${minYear}-${maxYear}`}
      disabled={disabled}
      className="text-center"
    />
  );
};

export default YearPicker;
