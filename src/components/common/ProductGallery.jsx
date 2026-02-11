import { useState, useMemo } from "react";

export default function ProductGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState("");

  // Memoize the selected image to avoid unnecessary state sync in effects
  const selectedImage = useMemo(() => {
    if (activeImage && images.includes(activeImage)) {
      return activeImage;
    }
    return images[0] || "";
  }, [activeImage, images]);

  if (!images.length) {
    return (
      <div className="flex-1 aspect-square rounded-xl bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-400">No Image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px]">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === img
                ? "border-primary"
                : "border-transparent hover:border-neutral-300"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square rounded-xl overflow-hidden bg-neutral-100 group">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
