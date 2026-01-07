import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDateForApi, getCurrentEasternDate } from "@/util/dateUtil";

const getInitialDateFromUrl = (searchParams: URLSearchParams): Date => {
  const dateParam = searchParams.get("date");

  if (dateParam) {
    const [year, month, day] = dateParam.split("-").map(Number);
    if (year && month && day) {
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
  }

  return getCurrentEasternDate();
};

export const useDateSelection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getInitialDateFromUrl(searchParams)
  );

  useEffect(() => {
    const dateString = formatDateForApi(selectedDate);
    setSearchParams({ date: dateString }, { replace: true });
  }, [selectedDate, setSearchParams]);

  return { selectedDate, setSelectedDate };
};
