import { getIntervalsHours } from "@/shared/utils/getInterevalsHours";
import { useDeferredValue, useEffect, useState } from "react";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import { TimeParsed } from "@/entities/vacancies";
import styles from "./CalendarInterval.module.css";
import { useDate } from "@/shared/lib/store/useDate";

export const CalendarInterval = () => {
  const { vacancy, setVacancy } = useVacancy();
  const [interval, setInterval] = useState(String(vacancy?.interval));
  const { date } = useDate();
  const deffInterval = useDeferredValue(interval);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(e.target.value);
  };
  useEffect(() => {
    const numInterval = Number(deffInterval);
    if (!numInterval || isNaN(numInterval) || vacancy!.interval === numInterval)
      return;
    const times: TimeParsed = {
      ...vacancy?.times,
      [date.toDateString()]: getIntervalsHours(numInterval).map((value) => ({
        [value]: "",
      })),
    };
    setVacancy({
      ...vacancy!,
      times,
      interval: numInterval,
    });
  }, [deffInterval]);
  return (
    <div>
      <label htmlFor="interval">Interval</label>
      <input
        name="interval"
        value={interval}
        onChange={handleChange}
        type="number"
        min={0}
        className={`inp ${styles.input}`}
      />
    </div>
  );
};
