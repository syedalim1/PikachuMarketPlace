import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { db } from "../../../configs"; // Firestore config
import { CarImages } from "../../../configs/schema";
import { useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";

const UploadImages = forwardRef(({ triggerUpload, carInfo, mode }, ref) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const cld = new Cloudinary({ cloud: { cloudName: "dnfvdyqps" } });
  const [EditUploadImage, setEditUploadImage] = useState([]);

  const [id, setId] = useState();

  // Handle file selection
  const onFileSelected = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  useEffect(() => {
    if (mode === "edit" && carInfo?.images?.length > 0) {
      setEditUploadImage(carInfo.images);
      console.log("Images loaded for edit:", carInfo.images);
    }
  }, [mode, carInfo]);

  useEffect(() => {
    if (triggerUpload) {
      console.log("Trigger Upload ID:", triggerUpload);
      setId(triggerUpload);
      onSubmit();
    }
  }, [triggerUpload]);

  // Upload files to Cloudinary
  const uploadFiles = async () => {
    const uploadedUrls = [];
    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pikachu-market");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnfvdyqps/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Cloudinary upload failed with status ${response.status}`
          );
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);

        // Update progress state
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: 100,
        }));
      }
      return uploadedUrls;
    } catch (error) {
      console.error("Error during upload process:", error);
      return [];
    }
  };

  // Save image URLs to the database
  const onSubmit = async () => {
    try {
      if (!triggerUpload) {
        console.error("CarListing ID is not defined.");
        return;
      }

      const uploadedUrls = await uploadFiles();

      if (uploadedUrls.length === 0) {
        console.error("No files were uploaded.");
        return;
      }

      // Loop through uploaded URLs and save them to the database with the correct CarListing ID
      for (const url of uploadedUrls) {
        const result = await db.insert(CarImages).values({
          imageUrl: url, // Save the imageUrl (from Cloudinary)
          carlistingId: triggerUpload, // Use triggerUpload as the CarListing ID
        });

        if (result) {
          console.log("Data saved successfully:", result);
        } else {
          console.error("Failed to save data.");
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    uploadFiles,
  }));

  const removeFile = async (index, isExistingImage) => {
    try {
      if (isExistingImage) {
        // Get the image to be removed
        const imageToRemove = EditUploadImage[index];

        if (!imageToRemove) {
          console.error("Image not found for the given index.");
          return;
        }

        // Delete the image from the database
        const deleteResult = await db
          .delete(CarImages)
          .where(eq(CarImages.imageUrl, imageToRemove));

        if (deleteResult) {
          console.log("Image deleted from database:", imageToRemove);
        } else {
          console.error("Failed to delete image from database.");
        }

        // Update the state to remove the image from the UI
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3 text-gray-700">
        Upload Car Images
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Display existing images in "edit" mode */}
        {mode === "edit" &&
          EditUploadImage?.map((image, index) => (
            <div
              key={`edit-${index}`}
              className="relative group border rounded-xl"
            >
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="h-32 w-full object-cover"
              />
              <button
                onClick={() => removeFile(index, true)} // Pass true to indicate it's an existing image
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}

        {/* Display newly selected files */}
        {selectedFiles.map((file, index) => (
          <div
            key={`new-${index}`}
            className="relative group border rounded-xl"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="h-32 w-full object-cover"
            />
            <button
              onClick={() => removeFile(index, false)} // Pass false for newly selected files
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
            >
              ✕
            </button>
            {uploadProgress[file.name] && (
              <div className="absolute bottom-0 left-0 right-0 bg-purple-500 text-white text-xs text-center">
                {uploadProgress[file.name]}%
              </div>
            )}
          </div>
        ))}

        <label htmlFor="upload-images" className="border-dotted border">
          <div className="p-10">Add Images</div>
        </label>
        <input
          type="file"
          multiple
          id="upload-images"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
});

export default UploadImages;
