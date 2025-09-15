import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); //To Navigate Verifiaction Page
  const [loading, setLoading] = useState(false);  //It is use for button element

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.post("https://backend-mu-lime.vercel.app/signIn", formData);
      alert(response.data.message);
      const token = response.data.token;
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.username); 
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("userId"));
      console.log(localStorage.getItem("userName"));
      // Clear form fields after success
      setFormData({
        email: "",
        password: "",
      });
      if (!token) {
        navigate("/verification");
      } else {
        navigate("/Profile");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="flex justify-center ">
      <form
        className='flex flex-col  gap-6 shadow-xl/30 p-5 mt-4 rounded-sm w-[400px]'
        onSubmit={handleSubmit}>

        <h1 className="text-2xl text-blue-600 font-bold text-center  mt-3">LOGIN</h1>

        <input
          type="email"
          name="email"
          placeholder='Email'
          className="border p-3 rounded-2xl w-full"

          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder='password'
          className="border p-3 rounded-2xl w-full"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex justify-between p-4">
          <Link to={"/forget-password"}
            className="text-blue-600 hover:underline text-sm" > Forget-Password</Link>

          <Link to={"/signin"} className="text-blue-600 hover:underline text-sm">SignIn</Link>
        </div>

        <button type="submit"
          className={`${loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded-xl`}>
          {loading ? "Submitting..." : "Submit"}
        </button>


      </form>

    </div>
  )
}

export default Login
