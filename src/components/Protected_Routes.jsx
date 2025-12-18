import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const ProtectedRoutes = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Any protected endpoint works
        await api.get("/auth/me/");
        setIsAuthorised(true);
      } catch (err) {
        setIsAuthorised(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthorised === null) {
    return <div>Loading...</div>;
  }

  return isAuthorised ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;


