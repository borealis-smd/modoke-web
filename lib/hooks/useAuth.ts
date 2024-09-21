import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.jwt) {
      setToken(session.user.jwt);
    } else {
      router.push("/signin");
    }
  }, [session, router]);

  return token;
};

export default useAuth;
