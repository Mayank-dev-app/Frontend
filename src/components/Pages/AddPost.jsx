import church from "../../images/church.jpg"
import deflt from "../../images/default.jpg"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreView] = useState(deflt);
    const [body, setBody] = useState("");

    const navigate = useNavigate();
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreView(URL.createObjectURL(file));
        }
    };

    const handlePost = () => {
        console.log(body, image);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "AddImages");
        data.append("cloud_name", "dosbthbn6");

        fetch("https://api.cloudinary.com/v1_1/dosbthbn6/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(cloudinaryData => {
                const imageUrl = cloudinaryData.url;
                // Now send the post data to your backend
                const token = localStorage.getItem("token");
                return fetch("http://localhost:8000/api/v1/create-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        Body: body,
                        Photo: imageUrl,
                    })
                });
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    alert(data.message)
                    console.error("Post have erorr: ", data.message);
                } else {
                    alert("Post created succesfully");
                    console.log("Post crated: ", data);
                    navigate("/");
                }
                // Optionally reset form here
            })
            .catch(err => console.error("Error: ", err));
    };

    return (
        <div className='min-h-screen flex flex-col items-center pt-5 '>
            <div className='flex flex-col  rounded-2xl shadow-2xl '>
                <div className='flex justify-between p-2 '>

                    <h1 className='font-semibold font-serif '>Create New Post</h1>
                    <button
                        className='font-bold text-green-400 cursor-pointer'
                        onClick={() => { handlePost() }}>Share
                    </button>
                </div>
                <hr className='w-full bg-gray-400' />
                <div className='p-2 '>
                    {preview &&
                        <img src={preview} alt="Preview" className="max-h-[300px] object-contain rounded-t-xl " />
                    }

                    <input type="file" name="file" accept="image/*" onChange={(e) => { handleImage(e); }}
                        className="outline mt-2 bg-gray-300 p-1  rounded-2xl hover:bg-gray-200 " />
                </div>
                <hr />
                <div>
                    <div className='flex flex-col '>
                        <div className="flex p-3 items-center gap-3">
                            <img
                                src={church}
                                alt="Profile"
                                className="size-[40px] rounded-full shadow-xl object-cover"
                            />
                            <h1 className="font-bold font-serif text-sm">Mayank Sharma</h1>
                        </div>
                        <textarea
                            name="text"
                            value={body} placeholder='Write a Caption....'
                            className='border-none outline-0 pl-2 font-serif max-h-[100px] min-h-[21px]'
                            onChange={(e) => { setBody(e.target.value) }} ></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost



