import { useState, useEffect } from "react";
import { Smile, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import church from "../../images/church.jpg";
import purg from "../../images/purg.jpg";

const Home = () => {
  const [data, setData] = useState([]);
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [activeCommentPost, setActiveCommentPost] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://backend-mu-lime.vercel.app/api/v1/showAllPosts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched posts:", result);
        setData(result?.data || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleLikes = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://backend-mu-lime.vercel.app/api/v1/like-post/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      if (result.success) {
        setData((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                ...post,
                Likes: result.likedBy,
              }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Like error:", error.message);
    }
  };
  const handleComment = async (postId) => {
    const token = localStorage.getItem("token");
    const comment = commentText[postId];

    if (!comment || !comment.trim()) return;

    try {
      const res = await fetch("https://backend-mu-lime.vercel.app/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, comment }),
      });

      const result = await res.json();

      if (result.success) {
        setCommentText((prev) => ({ ...prev, [postId]: "" }));

        // ✅ Use populated comment directly from backend
        const newComment = result.newComment;

        // ✅ Append comment to the post's comment list
        setData((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                ...post,
                Comments: [...(post.Comments || []), newComment],
              }
              : post
          )
        );
      }
    } catch (err) {
      console.error("Comment error:", err.message);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center gap-6 py-4">
      {data.map((post, index) => {
        const isLiked = post.Likes?.map((id) =>
          typeof id === "object" ? id._id?.toString() : id.toString()
        ).includes(userId);
<div className="flex w-full justify-center relative">
  {/* Posts Section */}
  <div className={`flex flex-col gap-6 py-4 transition-all duration-300 ${activeCommentPost ? 'w-2/3' : 'w-full'}`}>
    {data.map((post, index) => {
      // Your existing post rendering code...
    })}
  </div>

  {/* Comment Side Panel */}
  {activeCommentPost && (
    <div className="w-1/3 bg-white shadow-lg border-l p-4 h-screen overflow-y-auto sticky top-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Comments</h2>
        <button
          onClick={() => setActiveCommentPost(null)}
          className="text-gray-500 hover:text-black"
        >
          ✖
        </button>
      </div>

      <img
        src={activeCommentPost.Photo || purg}
        alt="Post"
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <p className="text-sm text-gray-700 mb-2">{activeCommentPost.Body}</p>

      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {activeCommentPost.Comments?.length > 0 ? (
          activeCommentPost.Comments.map((c, i) => (
            <p key={i} className="text-sm">
              <strong>{c.postedBy?.name || "User"}:</strong> {c.comment}
            </p>
          ))
        ) : (
          <p className="text-gray-400 italic text-sm">No comments yet.</p>
        )}
      </div>

      <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 bg-white shadow rounded">
        <Smile className="w-5 h-5 text-yellow-500" />
        <input
          type="text"
          value={commentText[activeCommentPost._id] || ""}
          onChange={(e) =>
            setCommentText((prev) => ({
              ...prev,
              [activeCommentPost._id]: e.target.value,
            }))
          }
          placeholder="Add a comment..."
          className="flex-grow outline-none border-none text-sm"
        />
        <button
          onClick={() => handleComment(activeCommentPost._id)}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Post
        </button>
      </div>
    </div>
  )}
</div>

        return (
          <div
            key={index}
            className="flex border-gray-300 rounded-2xl flex-col shadow-2xl"
          >
            <div className="h-full p-3 bg-gray-200">
              <Link to="/profile" className="flex items-center gap-6">
                <img
                  src={church}
                  alt="user-profile"
                  className="w-15 h-15 rounded-full"
                />
                <h1 className="font-bold text-md">
                  {post.PostedBy?.name || "Unknown User"}
                </h1>
              </Link>
            </div>

            <div className="max-w-[450px]">
              <img src={post.Photo || purg} alt="userImage" />
            </div>

            <div>
              {/* Like Section */}
              <div className="flex items-center gap-2 pl-3 p-2">
                <Heart
                  onClick={() => handleLikes(post._id)}
                  className={`w-7 h-8 cursor-pointer transition duration-150 ${isLiked ? "text-red-700" : "text-gray-500"
                    }`}
                  fill={isLiked ? "red" : "none"}
                />
                <p className="text-gray-600 text-sm">
                  {post.Likes?.length || 0} Like
                  {post.Likes?.length === 1 ? "" : "s"}
                </p>
              </div>

              {/* Post Body */}
              <p className="px-3 text-sm text-gray-800 pb-2">{post.Body}</p>

              {/* Existing Comments */}
              {post.Comments?.length > 0 && (
                <div className="px-3 pb-2 space-y-1 text-sm">
                  {/* {post.Comments.map((c, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <p>
                        <strong>{c.postedBy?.name || "User"}</strong>: {c.comment}
                      </p>
                      <span className="text-xs text-gray-500 italic ml-2">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                  ))} */}
                  {activeCommentPost && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                      <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-[60%] max-h-[90vh] overflow-y-auto relative p-4">
                        {/* Close Button */}
                        <button
                          onClick={() => setActiveCommentPost(null)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                          ✖
                        </button>

                        {/* Post Image */}
                        <img
                          src={activeCommentPost.Photo || purg}
                          alt="Post"
                          className="w-full max-h-80 object-contain rounded-lg mb-4"
                        />

                        {/* Post Body */}
                        <p className="text-gray-800 mb-2">{activeCommentPost.Body}</p>

                        {/* Comments */}
                        <div className="space-y-2 max-h-60 overflow-y-auto border-y py-2">
                          {activeCommentPost.Comments?.length > 0 ? (
                            activeCommentPost.Comments.map((c, i) => (
                              <p key={i}>
                                <strong>{c.postedBy?.name || "User"}</strong>: {c.comment}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-500 italic">No comments yet.</p>
                          )}
                        </div>

                        {/* Comment Input */}
                        <div className="flex items-center gap-2 mt-4 border border-gray-300 px-4 py-2 shadow-sm bg-white">
                          <Smile className="w-6 h-6 text-yellow-500" />
                          <input
                            type="text"
                            value={commentText[activeCommentPost._id] || ""}
                            onChange={(e) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [activeCommentPost._id]: e.target.value,
                              }))
                            }
                            placeholder="Add a comment..."
                            className="flex-grow outline-none border-none text-sm placeholder-gray-400 bg-transparent"
                          />
                          <button
                            onClick={() => {
                              handleComment(activeCommentPost._id);
                              setTimeout(() => {
                                setActiveCommentPost(null); // Close modal after comment
                              }, 300);
                            }}
                            className="text-sm text-blue-600 font-medium hover:underline transition"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}


              {/* Comment Input */}
              <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 shadow-sm bg-white h-full max-w-md">
                <Smile className="w-6 h-6 text-yellow-500" />
                <input
                  type="text"
                  onFocus={() => setActiveCommentPost(post)}
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [post._id]: e.target.value,
                    }))
                  }
                  placeholder="Add a comment..."
                  className="flex-grow outline-none border-none text-sm placeholder-gray-400 bg-transparent"
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="text-sm text-blue-600 font-medium hover:underline transition"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

