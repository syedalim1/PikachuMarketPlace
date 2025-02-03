
function ImageGallery({car}) {
  return (
    <div>
      <img src={car.carImages.imageUrl} alt="" srcset=""  className='w-full h-[250px] sm:h-[400px] sm:object-cover object-contain rounded-xl'/>
    </div>
  );
}

export default ImageGallery