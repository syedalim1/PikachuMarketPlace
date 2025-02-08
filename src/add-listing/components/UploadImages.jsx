import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { db } from "../../../configs"; // Firestore config
import { CarImages, JobsImages, MobilesImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";

const UploadImages = forwardRef(
  ({ triggerUpload, carInfo, mode, mobileInfo, jobinfo, trues }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const cld = new Cloudinary({ cloud: { cloudName: "dnfvdyqps" } });
    const [editUploadImage, setEditUploadImage] = useState([]);
    const [id, setId] = useState();

    useEffect(() => {
      if (mode === "edit") {
        if (carInfo?.images?.length > 0) {
          setEditUploadImage(carInfo.images);
        } else if (jobinfo?.images?.length > 0) {
          setEditUploadImage(jobinfo.images);
        } else if (mobileInfo?.images?.length > 0) {
          setEditUploadImage(mobileInfo.images);
        }
      }
    }, [mode, carInfo, jobinfo, mobileInfo]);
    useEffect(() => {
      onSubmit();
    }, []);
    useEffect(() => {
      if (triggerUpload) {
        console.log("Trigger Upload ID:", triggerUpload);
        setId(triggerUpload);
        onSubmit();
      }
    }, [triggerUpload]);

    const onFileSelected = (event) => {
      const files = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const uploadFiles = async () => {
      const uploadedUrls = [];
      try {
        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "pikachu-market");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dnfvdyqps/image/upload",
            { method: "POST", body: formData }
          );

          if (!response.ok)
            throw new Error(`Cloudinary upload failed: ${response.status}`);

          const data = await response.json();
          uploadedUrls.push(data.secure_url);
          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        }
        return uploadedUrls;
      } catch (error) {
        console.error("Upload error:", error);
        return [];
      }
    };

    const insertImage = async (url, table, listingIdField, triggerUpload) => {
      const result = await db
        .insert(table)
        .values({ imageUrl: url, [listingIdField]: triggerUpload });
      return result;
    };

    const onSubmit = async () => {
      if (!triggerUpload) {
        console.error("Listing ID is not defined.");
        return;
      }
      const uploadedUrls = await uploadFiles();

      if (uploadedUrls.length === 0) {
        console.error("No files were uploaded.");
        return;
      }
      try {
        const table =
          trues == "mobile"
            ? MobilesImages
            : trues == "job"
            ? JobsImages
            : CarImages;
        const listingIdField =
          trues == "mobile"
            ? "mobilelistingId"
            : trues == "job"
            ? "jobslistingId"
            : "carlistingId";

        for (const url of uploadedUrls) {
          const result = await insertImage(
            url,
            table,
            listingIdField,
            triggerUpload
          );
          if (result) {
            console.log("Data saved successfully:", result);
          } else {
            console.error("Failed to save data.");
          }
        }
        console.log("Images uploaded successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    const removeFile = async (index, isExistingImage) => {
      try {
        if (isExistingImage) {
          const imageToRemove = editUploadImage[index];

          if (!imageToRemove) {
            console.error("Image not found for the given index.");
            return;
          }

          const deleteResult = await db
            .delete(CarImages)
            .where(eq(CarImages.imageUrl, imageToRemove));

          if (deleteResult) {
            console.log("Image deleted from database:", imageToRemove);
            setEditUploadImage((prev) => prev.filter((_, i) => i !== index));
          } else {
            console.error("Failed to delete image from database.");
          }
        } else {
          setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        }
      } catch (error) {
        console.error("Error removing file:", error);
      }
    };

    useImperativeHandle(ref, () => ({ uploadFiles }));

    return (
      <div>
        <h2 className="font-medium text-xl my-3 text-gray-700">
          Upload Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mode === "edit" &&
            editUploadImage?.map((image, index) => (
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
                  onClick={() => removeFile(index, true)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}

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
                onClick={() => removeFile(index, false)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                aria-label="Remove image"
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
  }
);

export default UploadImages;
