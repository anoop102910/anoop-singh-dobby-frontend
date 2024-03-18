import React, { useState } from "react";
import useToggle from "../../hooks/useToggle";

function Image({ image }) {
  const [hover, toggle] = useToggle(false);
  return (
    <div
      onMouseEnter={toggle}
      onMouseLeave={toggle}
      className="relative sm:w-[45%] md:w-[30%] rounded-md shadow-md inline h-[12rem] overflow-hidden"
    >
      <div>
        <img
          key={image._id}
          className={`w-full h-[12rem] rounded-md shadow-md inline  object-cover `}
          src={image.imageUrl}
          alt=""
        />
      </div>
      {hover && (
        <>
          {/* <div className="w-full h-full bg-black z-[1000] inset absolute"></div> */}
          <div className="absolute top-4 left-4">
            <span className="text-white  ">{image.name}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Image;
