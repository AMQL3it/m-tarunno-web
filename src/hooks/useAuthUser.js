import { useEffect, useState } from "react";

const useAuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  return user;
};

export default useAuthUser;
