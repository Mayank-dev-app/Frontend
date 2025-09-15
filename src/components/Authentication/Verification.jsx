import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

const Verification = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [resending, setresending] =useState(false);
   const [formData, setFormData] = useState({
       email: "",
       verifyCode: "",
   });


  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://backend-mu-lime.vercel.app/verifyuser", formData);
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.username); 
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("userId"));
      console.log(localStorage.getItem("userName"));

      // Clear form fields after success
      setFormData({
        email: "",
        verifyCode: "",
      });

      //  Redirect to verification page
      navigate("/");

    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

    const handleResend = async () => {
    if (!formData.email) {
      alert("Please enter your email before resending OTP.");
      return;
    }
        setresending(true);
    try {
      const response = await axios.post("http://localhost:8000/verify-resend", {
        email: formData.email.toLowerCase(),
      });
      alert(response.data.message || "OTP resent successfully.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP.");
    } finally {
      setresending(false);
    }
  };

  return (
        <div className="min-h-screen flex justify-center px-4 bg-gray-50 mt-5">
       <div className="w-full h-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-6">
          Verify Email
        </h1>
      <form
        action=""
        method="post"
        // className='flex flex-col w-full items-center gap-6 shadow-xl/30 p-2 mt-4'
        onSubmit={handleSubmit}
        className='flex flex-col w-full items-center gap-6 shadow-xl/30 p-2 mt-4'
      >
        <input
          type="email"
          name="email"
          placeholder='Email'
          className="border p-3 rounded-2xl w-full bg-blue-100 opacity-75"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="verifyCode"
          placeholder='Enter Valid OTP'
          className="border p-3 rounded-2xl mt-4 w-full bg-blue-100 opacity-75 "
          value={formData.verifyCode}
          onChange={handleChange}
        />

        <button type="submit"
          className={`${loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-2 rounded-xl`}>
          {loading ? "Submitting..." : "Submit"}
        </button>

          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className={`${
              resending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded-xl w-full`}
          >
            {resending ? "Resending..." : "Resend"}
          </button>
      </form>
  </div>
    </div>
  )
}

export default Verification