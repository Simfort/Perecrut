import { useRouter } from "next/navigation";
import { Calendar } from "./Calendar";

export const CalendarCandidate = () => {
  const router = useRouter();

  return (
    <div>
      <Calendar />
      <button onClick={() => router.push("?step=0")} className="but-prim">
        Back
      </button>
    </div>
  );
};
