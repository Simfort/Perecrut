"use client";

import { createCandidateAction } from "@/entities/candidates/api/createCandidateAction";
import { useVacancy } from "@/entities/vacancies";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const CandidateCreatorForm = () => {
  const { vacancy } = useVacancy();
  const [state, dispatchAction] = useActionState(createCandidateAction, {
    data: {
      firstname: "",
      lastname: "",
      description: "",
      color: "black",
    },
    vacancy_id: vacancy!.id,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("?step=1");
    }
  }, [state.success]);
  return (
    <form action={dispatchAction}>
      <div>
        <label htmlFor="firstname">Firstname</label>{" "}
        <input
          type="text"
          name="firstname"
          placeholder="Linus"
          className={`inp ${state.error ? (state.error.firstname ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.firstname}
        />
      </div>
      <div>
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          placeholder="Torvalds"
          className={`inp ${state.error ? (state.error.lastname ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.lastname}
        />
      </div>{" "}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Info about..."
          className={`inp ${state.error ? (state.error.description ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.description}
        />
      </div>{" "}
      <div>
        <label htmlFor="color">Color</label>
        <input
          type="color"
          name="color"
          className={` ${state.error ? (state.error.color ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.color}
        />
      </div>
      <button className="but-prim">Next</button>
    </form>
  );
};
