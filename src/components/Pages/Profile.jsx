import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ You forgot to import useNavigate
import church from "../../images/church.jpg";

const Profile = () => {
  const [posts, setPosts] = useState([]); // ✅ should be an array
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://backend-mu-lime.vercel.app/api/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched posts:", result);
        if (result.success && Array.isArray(result.data)) {
          setPosts(result.data); // ✅ set actual post array
        } else {
          setPosts([]); // fallback to empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      });
  }, []);

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col p-4">
        {/* Profile Section */}
        <div className="flex justify-center items-center flex-wrap gap-10">
          <img
            src={church}
            alt="Profile"
            className="size-[180px] rounded-full shadow-2xl object-cover"
          />
          <div className="text-center">
            <h1 className="font-bold font-serif text-2xl">Mayank Sharma</h1>
            <div className="flex gap-7 text-lg mt-2">
              <p>
                <span className="font-bold">{posts.length}</span> Posts
              </p>
              <p>
                <span className="font-bold">40</span> Followers
              </p>
              <p>
                <span className="font-bold">40</span> Following
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-[100%] border-t border-gray-300 mt-4" />

        {/* Image Gallery */}
        <div className="flex flex-wrap justify-center gap-5 pt-4">
          {posts.map((post, i) => (
            <img
              key={i}
              src={post.Photo} // or post.image, depending on your model
              alt={`Post image ${i + 1}`}
              className="w-[250px] h-[250px] object-cover shadow-2xl rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
