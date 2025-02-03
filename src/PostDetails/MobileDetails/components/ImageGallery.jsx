
function ImageGallery({ mobile }) {
  return (
    <div>
      <img
        src={mobile.mobilesImages.imageUrl }
        alt=""
        srcset=""
        className="w-full h-[250px] sm:h-[400px] sm:object-cover object-contain rounded-xl"
      />
    </div>
  );
}

export default ImageGallery