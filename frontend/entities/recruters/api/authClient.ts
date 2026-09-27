"client-only";
import { BACKEND_URL } from "@/shared/constants";

export const authClient = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/recruters/auth`, {
      credentials: "include",
    });
    const data = await res.json();

    if (res.ok) {
      return { data: data.data };
    }
    console.log(data.error);
    return false;
  } catch (error) {
    console.error(error);
  }
};
