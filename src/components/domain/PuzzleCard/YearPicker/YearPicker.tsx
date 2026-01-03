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
      className="text-center transition-all duration-200 hover:border-primary hover:shadow-[0_0_0_1px] hover:shadow-primary focus:border-primary focus:shadow-[0_0_0_2px] focus:shadow-primary"
    />
  );
};

export default YearPicker;
