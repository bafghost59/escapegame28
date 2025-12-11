import React from "react";

export default function Example({ src }) {
  return (
    <video className="h-80 w-full object-cover rounded-lg" controls>
      <source src={src} type="video/mp4" />
      Votre navigateur ne supporte pas la vidéo.
    </video>
  );
}
