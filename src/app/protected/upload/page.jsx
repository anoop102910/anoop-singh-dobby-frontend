import React from "react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { api } from "../../../util/api";

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name,setName] = useState("")
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  const clearForm = () => {
    imageRef.current.value = null;
    setSelectedImage(null);
    setName('')
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (selectedImage) {
      try {
        console.log(selectedImage);
        const response = await api.post(
          "api/image",
          { image: selectedImage,name },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response.data);
        clearForm();
        setLoading(false);
        toast.success("Image uploaded successfully");
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="mb-10">
      <form
        className=" max-w-[30rem] mx-auto mt-20 "
        onSubmit={e => handleSubmit(e)}
      >
        <div>
          {selectedImage ? (
            <div className="relative ">
              <img
                onClick={() => {
                  setSelectedImage(null);
                  imageRef.current.value = null;
                }}
                className="cursor-pointer absolute top-1 right-1 "
                width="36"
                height="36"
                src="https://img.icons8.com/parakeet/48/multiply.png"
                alt="multiply"
              />
              <img className="rounded-lg mt-4 -z-20" src={URL.createObjectURL(selectedImage)} />
            </div>
          ) : (
            <label className="cursor-pointer" htmlFor="image">
            <div className="w-full h-[200px] border-2 border-dotted border-gray-400 rounded-md mt-5 flex justify-center items-center text-gray-400 ">
              Upload Your Image
            </div>
            </label>
          )}
          <div className="flex justify-between items-center mt-4">
            <div>
              <input
                ref={imageRef}
                onChange={e => setSelectedImage(e.target.files[0])}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden "
              />
            </div>
            
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="image-name">Name</label>
          <input type="text" className="w-full py-2 bg-slate-200 px-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 rounded-md " placeholder="Enter Image name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <input
              className="py-2 w-full bg-blue-500 rounded-md text-white hover:bg-blue-600 transition mt-4 disabled:bg-slate-500"
              type="submit"
              value={loading ? "Uploading..." : "Upload Image"}
              disabled={loading}
            />
      </form>
    </div>
  );
}

export default Upload;
