import React from "react";
import videoSrc from "../assets/demo.mp4";



export default function Example() {
  return (
    <video className="h-full w-full rounded-lg" controls>
      <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}