// hooks/useAuthUser.js
import { useEffect, useState } from "react";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }
      setUser(payload);
    } catch (err) {
      localStorage.removeItem("token");
      console.log(err);
    }
    setLoading(false);
  }, []);

  return { user, loading };
};

export default useAuthUser;
