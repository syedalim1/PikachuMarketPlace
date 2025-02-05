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
  ({ triggerUpload, carInfo, mode, mobileInfo, jobinfo }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const cld = new Cloudinary({ cloud: { cloudName: "dnfvdyqps" } });
    const [editUploadImage, setEditUploadImage] = useState([]);
    const [id, setId] = useState();

    useEffect(() => {
      if (mode === "edit" && carInfo?.images?.length > 0) {
        setEditUploadImage(carInfo.images);
      }
    }, [mode, carInfo]);

    useEffect(() => {
      if (mode === "edit" && jobinfo?.images?.length > 0) {
        setEditUploadImage(jobinfo.images);
      }
    }, [mode, jobinfo]);

    useEffect(() => {
      if (mode === "edit" && mobileInfo?.images?.length > 0) {
        setEditUploadImage(mobileInfo.images);
      }
    }, [mode, mobileInfo]);

    useEffect(() => {
      if (triggerUpload) {
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

    const onSubmit = async () => {
      if (!triggerUpload) return;

      const uploadedUrls = await uploadFiles();

      const location = window.location.pathname;

      try {
        if (location.includes("/add-listing/Mobiles")) {
          for (const url of uploadedUrls) {
            await db
              .insert(MobilesImages)
              .values({ imageUrl: url, mobileListingId: triggerUpload });
          }
        } else if (location.includes("/add-listing/Jobs")) {
          for (const url of uploadedUrls) {
            await db
              .insert(JobsImages)
              .values({ imageUrl: url, jobslistingId: triggerUpload });
          }
          
        } else if (location.includes("/add-listing/Cars")) {
          for (const url of uploadedUrls) {
            await db
              .insert(CarImages)
              .values({ imageUrl: url, carListingId: triggerUpload });
          }
        }
        console.log("Images uploaded successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
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
