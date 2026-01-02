export interface YearPickerProps {
  value: number | null;
  onChange: (year: number | null) => void;
  minYear: number;
  maxYear: number;
  disabled?: boolean;
}
