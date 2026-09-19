import { getIntervalsHours } from "@/shared/utils/getInterevalsHours";
import { useDeferredValue, useEffect, useState } from "react";
import { useVacancy } from "../lib/store/useVacancy";
import { TimeParsed } from "@/entities/vacancies";

export const CalendarInterval = () => {
  const { vacancy, setVacancy } = useVacancy();
  const [interval, setInterval] = useState(String(vacancy?.interval));
  const deffInterval = useDeferredValue(interval);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(e.target.value);
  };
  useEffect(() => {
    const numInterval = Number(deffInterval);
    if (!numInterval || isNaN(numInterval) || vacancy!.interval === numInterval)
      return;
    const times: TimeParsed[] = getIntervalsHours(numInterval).map((value) => ({
      [value]: "",
    }));
    setVacancy({
      ...vacancy!,
      times,
      interval: numInterval,
    });
  }, [deffInterval]);
  return (
    <div>
      <label htmlFor="">Interval</label>
      <input
        value={interval}
        onChange={handleChange}
        type="number"
        min={0}
        className="inp"
      />
    </div>
  );
};
