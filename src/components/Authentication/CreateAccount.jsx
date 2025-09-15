import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const CreateAccount = () => {
  const navigate = useNavigate(); //To Navigate Verifiaction Page
  const [loading, setLoading] = useState(false);  //It is use for button element

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
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
      const response = await axios.post("https://backend-mu-lime.vercel.app/user", formData);
      alert(response.data.message);

      // Clear form fields after success
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      // ✅ Redirect to verification page
      navigate("/verification");
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false); // Re-enable button
    }
  };


  return (
    <div className="min-h-full flex justify-center px-4 mt-4">

      <div className="  max-w-md w-full h-full  bg-white shadow-md rounded-2xl p-6">

        <h1 className="text-2xl text-blue-600 font-bold text-center shadow-xl/10 p-5 rounded-2xl mt-3">Create Account</h1>

        <form
          action=""
          method="post"
          className='flex flex-col w-full items-center gap-6 shadow-xl/30 p-2 mt-4'
          onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder='Full Name'
            className="border p-3 rounded-2xl mt-4 w-full bg-blue-100 opacity-75 "
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder='create user Name'
            className="border p-3 rounded-2xl w-full bg-blue-100 opacity-75"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder='Email'
            className="border p-3 rounded-2xl w-full bg-blue-100 opacity-75"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder='password'
            className="border p-3 rounded-2xl w-full bg-blue-100 opacity-75"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit"
            className={`${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
              } text-white px-6 py-2 rounded-xl`}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <div className="shadow-xl/10 p-5 rounded-2xl mt-3">
          <p className="">Already have an Account? {"click on"}
            <Link to={"/login"}
              className="text-blue-600 hover:underline" > login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount