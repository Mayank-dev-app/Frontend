import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verifyCode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/changePassword", {
        email: formData.email.toLowerCase(),
        password: formData.password,
        verifyCode: formData.verifyCode,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg flex flex-col gap-5 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center">Reset Your Password</h2>

        <input
          type="email"
          name="email"
          placeholder="Your registered email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-b p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="verifyCode"
          placeholder='Enter Valid OTP'
          className="border-b p-3 outline-none focus:border-blue-500 "
          value={formData.verifyCode}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="New password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-b p-3 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="border-b p-3 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 rounded-xl transition`}
        >
          {loading ? "Submitting..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

