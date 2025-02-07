import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useUserProfile = () => {
  const { authUser } = useAuthContext();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`https://chat-app-h623.onrender.com/api/users/userProfile`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setUserProfile(data.user);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser]);

  return { userProfile, loading };
};

export default useUserProfile;
