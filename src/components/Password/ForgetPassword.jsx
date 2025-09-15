import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const ForgetPassword = () => {
  const [send, setSend] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSend(true);
    try {
      const response = await axios.post("http://localhost:8000/sendotpforpasword", {
        email: email.toLowerCase(),
      });
      alert(response.data.message);
      navigate("/change-password");
    } catch (err) {
      console.log(err);
    } finally {
      setSend(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[450px] gap-6 shadow-xl p-6 rounded-lg bg-white"
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Forgot Your Password?
        </h1>

        <p className="text-gray-600 text-sm text-center">
          Enter your registered email below. We'll send you an OTP to reset your password.
        </p>

        <input
          type="email"
          name="email"
          required
          autoFocus
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder="Enter your valid email"
          className="outline-none border-b-2 border-gray-300 p-3 w-full focus:border-blue-500 transition"
        />

        <button type="submit"
          disabled={send}
          className={`${send
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded-xl`}>
          {send ? "Sending..." : "Send"}
        </button>

      </form>
    </div>
  );
};

export default ForgetPassword;

