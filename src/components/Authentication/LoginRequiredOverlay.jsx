import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react"; // 🔒 You can use any icon library

const LoginOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md w-full space-y-5">
        {/* 🔒 Icon */}
        <div className="flex justify-center">
          <Lock className="w-12 h-12 text-blue-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">Login Required</h2>

        {/* Message */}
        <p className="text-gray-600">
          To access this page, you need to be logged in. Please sign in or create a new account to continue.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signin")}
            className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-200 transition duration-200 border"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOverlay;


