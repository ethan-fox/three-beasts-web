import { Input } from "@/components/ui/input";

interface YearPickerProps {
  value: number | null;
  onChange: (year: number | null) => void;
  disabled?: boolean;
}

const YearPicker = ({ value, onChange, disabled }: YearPickerProps) => {
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
      value={value ?? ""}
      onChange={handleChange}
      placeholder={"Answer here"}
      disabled={disabled}
      className="transition-all duration-200 hover:border-primary hover:shadow-[0_0_0_1px] hover:shadow-primary focus:border-primary focus:shadow-[0_0_0_2px] focus:shadow-primary"
    />
  );
};

export default YearPicker;
