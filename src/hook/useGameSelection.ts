import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDateForApi, getCurrentEasternDate } from "@/util/dateUtil";
import { DEFAULT_VARIANT } from "@/util/variantUtil";

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

const getInitialVariantFromUrl = (searchParams: URLSearchParams): string => {
  return searchParams.get("variant") || DEFAULT_VARIANT;
};

export const useGameSelection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getInitialDateFromUrl(searchParams)
  );
  const [selectedVariant, setSelectedVariant] = useState<string>(() =>
    getInitialVariantFromUrl(searchParams)
  );

  // Use ref to store setSearchParams to avoid infinite loop
  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;

  useEffect(() => {
    const today = getCurrentEasternDate();
    const isToday = selectedDate.toDateString() === today.toDateString();
    const params: Record<string, string> = {};

    if (!isToday) {
      params.date = formatDateForApi(selectedDate);
    }

    if (selectedVariant !== DEFAULT_VARIANT) {
      params.variant = selectedVariant;
    }

    setSearchParamsRef.current(params, { replace: true });
  }, [selectedDate, selectedVariant]);

  const selectVariant = useCallback((variant: string) => {
    setSelectedVariant(variant);
    setSelectedDate(getCurrentEasternDate());
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    selectedVariant,
    selectVariant
  };
};
