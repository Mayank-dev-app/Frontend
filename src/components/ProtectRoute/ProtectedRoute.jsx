import { useAuth } from "../context/AuthContext";
import LoginOverlay from "../Authentication/LoginRequiredOverlay";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return null; // or <Loader /> component if you want
  }

  if (!token) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;



