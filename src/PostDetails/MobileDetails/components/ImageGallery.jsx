
function ImageGallery({ mobile, job,bike }) {
  return (
    <div>
      <img
        src={
          mobile?.mobilesImages?.imageUrl ||
          job?.JobsImages?.imageUrl || bike?.BikesImages?.imageUrl||
          "default-image-url.jpg"
        }
        alt="Listing Image"
        className="w-full h-[250px]  sm:h-[400px] sm:object-cover object-contain rounded-xl my-2"
      />
    </div>
  );
}

export default ImageGallery