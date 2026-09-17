"server-only";
import { BACKEND_URL } from "@/shared/constants";
import { cookies } from "next/headers";

export const auth = async () => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;
    if (!sessionToken) return false;
    const res = await fetch(`${BACKEND_URL}/recruters/auth`, {
      headers: {
        Authorization: sessionToken,
      },
    });
    const data = await res.json();

    if (res.ok) {
      return { token: sessionToken, data: data.data };
    }
    console.log(data.error);
    return false;
  } catch (error) {
    console.error(error);
  }
};
