import { Home, UserCircle2, PlusCircle, LogOutIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import LogoutOverlay from './Authentication/LogoutOverlay'
import { useState } from 'react'

const Navbar = () => {
  const [overlay, setLogoutOverLay] = useState(false);

  const handleCancel = () => {
    setLogoutOverLay(false);
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/logout", {
        method: "POST", // or GET, based on your backend
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // pass the JWT
        },
      });

      const data = await res.json();
      if(data.success){
        localStorage.removeItem("token");
        localStorage.clear(); // sab kuch hata dega

        alert(data.message);
        window.location.href = "/";
      }else{
        alert("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Server error during logout.");
    }
  };

  return (
    <div className='w-[250px] h-screen flex flex-col fixed left-0 top-0 shadow-2xl shadow-gray-500 rounded-r-xl p-4 '>
      <div>
        <h1 className='pl-3 pt-5 font-bold font-serif italic text-2xl'>Instagrame</h1>
      </div>
      <div className='flex flex-col pl-7 gap-5 pt-10'>
        <NavLink to="/" className="flex gap-2"><Home /> <span className='font-bold'>Home</span></NavLink>
        <NavLink to="/post" className="flex gap-2" > <PlusCircle /> <span className='font-bold'>Post</span></NavLink>
        <NavLink to="/profile" className="flex gap-2"><UserCircle2 /> <span className='font-bold'>Profile</span></NavLink>
        <button className="flex gap-2" onClick={() => { setLogoutOverLay(true) }}><LogOutIcon /> <span className='font-bold'>Logout</span></button>
      </div>
      {/* Conditional rendering of LogoutOverlay */}
      {overlay && (
        <LogoutOverlay onCancel={handleCancel} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default Navbar