import { useState, useEffect} from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom"; 
import CreateAccount from "./components/Authentication/CreateAccount";
import Login from "./components/Authentication/Login";
import ForgetPassword from "./components/Password/ForgetPassword";
import ChangePassword from "./components/Password/ChangePassword";
import Verification from "./components/Authentication/Verification";
import Profile from "./components/Pages/Profile";
import Home from "./components/Pages/Home";
import Navbar from "./components/Navbar";
import AddPost from "./components/Pages/AddPost";
import axios from "axios";
import { Menu } from "lucide-react";

import ProtectedRoute from "./components/ProtectRoute/ProtectedRoute";
import LoginOverlay from "./components/Authentication/LoginRequiredOverlay";

function App() {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

    const token = localStorage.getItem("token");

  // 🔒 Pages where you DON'T want to show the Navbar
  const hideNavbarRoutes = ["/login", "/signin", "/forget-password", "/change-password", "/verification"];

  // ✅ Check if current path matches any of the above
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    axios
      .get("https://backend-mu-lime.vercel.app/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      {!shouldHideNavbar && (
        <div className="hidden md:block fixed top-0 left-0 h-screen z-50">
          <Navbar />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {!shouldHideNavbar && sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar Slide */}
      {!shouldHideNavbar && (
        <div
          className={`fixed top-0 left-0 h-screen w-[250px] bg-white z-50 p-4 transform transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <Navbar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content area */}
      <div
        className={`flex-1 w-full ${!shouldHideNavbar ? "md:ml-[250px]" : ""
          } p-4 min-h-screen bg-gray-50 overflow-y-auto`}
      >
        {/* Hamburger icon (mobile only) */}
        {!shouldHideNavbar && (
          <div className="md:hidden flex items-center mb-4">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-8 h-8" />
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" index element={<CreateAccount />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route
            path="/"
            element={
              !token ? <LoginOverlay /> : <Navigate to="/home" />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

