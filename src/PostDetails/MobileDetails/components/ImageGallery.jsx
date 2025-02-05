
function ImageGallery({ mobile, job }) {
  return (
    <div>
      <img
        src={
          mobile?.mobilesImages?.imageUrl ||
          job?.JobsImages?.imageUrl ||
          "default-image-url.jpg"
        }
        alt="Listing Image"
        className="w-full h-[250px] sm:h-[400px] sm:object-cover object-contain rounded-xl"
      />
    </div>
  );
}

export default ImageGallery