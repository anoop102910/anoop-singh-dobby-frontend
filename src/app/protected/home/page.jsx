import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Image from "../../../components/shared/Image";
import { useNavigate } from "react-router-dom";
import { useQueryContext } from "../../../context/QueryContext";

function Home() {
  const {query} = useQueryContext();
  const [imageData, isLoading, error] = useFetch(`/api/image?name=${query}`);
  const images = imageData?.images;
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("i");
  }, []);

  if (isLoading) return <div className="text-center mt-10 text-3xl text-slate-300">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-3xl bg-slate-300">{error}</div>;

  if (images.length == 0)
    return (
      <div
        onClick={() => navigate("/upload")}
        className="min-h-[90vh] flex items-center justify-center  text-2xl font-bold text-slate-500"
      >
        <div className="py-10 px-20 border-4 border-slate-400 border-dotted cursor-pointer rounded-md">
          Upload our first Image
        </div>{" "}
      </div>
    );
  return (
    <div id="image-wrapper " className="p-4">
      <div className="flex items-start relative gap-6 flex-wrap  ">
        {images.map((image, index) => {
          return <Image image={image} key={image._id} />;
        })}{" "}
      </div>
    </div>
  );
}

export default Home;
