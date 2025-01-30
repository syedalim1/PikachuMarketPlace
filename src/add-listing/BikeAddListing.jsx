import React, { useState, useRef, useEffect } from "react";
import Header from "@/Common/Header";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import { Label } from "@radix-ui/react-label";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { db } from "../../configs";
import { CarImages, CarListing } from "../../configs/schema";
import UploadImages from "./components/UploadImages";
import IconField from "./components/IconField";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";
import Footer from "@/Common/Footer";
import { FaMobileAlt } from "react-icons/fa";

function BikeAddListing() {
  const [formData, setFormData] = useState({});
  const imageUploaderRef = useRef(null);
  const [triggerUpload, setTriggerUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const [bikeInfo, setBikeInfo] = useState(null);

  const mode = searchParams.get("mode");
  const listid = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit" && isLoaded) {
      GetListDetails();
    }
  }, [mode, listid, isLoaded]);

  const GetListDetails = async () => {
    try {
      const result = await db
        .select()
        .from(BikeListing)
        .innerJoin(BikeImages, eq(BikeListing.id, BikeImages.bikelistingId))
        .where(eq(BikeListing.id, listid));

      const resp = Service.FormatResult(result);
      setBikeInfo(resp[0]);
      setFormData(resp[0]);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  const handleInputChanges = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = bikeDetails.bikeDetails.filter(
      (item) => item.required
    );
    const isValid = requiredFields.every(
      (field) => formData[field.name] && formData[field.name].trim() !== ""
    );

    if (!isValid) {
      toast({ title: "Please fill in all required fields." });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    toast({ title: "Please Wait ......." });

    try {
      if (mode === "edit") {
        await db
          .update(BikeListing)
          .set({
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
            username: user?.username || "Anonymous",
            userImageUrl: user?.profileImageUrl || "",
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .where(eq(BikeListing.id, listid));
      } else {
        const result = await db
          .insert(BikeListing)
          .values({
            ...formData,
            username: user?.username,
            createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
            postedOn: moment().format("DD/MM/yyyy"),
            fullName: user?.fullName,
          })
          .returning({ id: BikeListing.id });

        if (result.length >= 0) {
          const bikeListingId = result[0].id;
          setTriggerUpload(bikeListingId);
          await imageUploaderRef.current.uploadFiles();
        }
      }

      toast({ title: "Successfully Uploaded" });
      navigate("/profile");
    } catch (error) {
      console.error("Error saving data:", error);
      toast({ title: "Error saving data", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <Header />
      <div className="px-4 sm:px-8 lg:px-10 mt-3">
        <form
          onSubmit={onSubmit}
          className="p-6 sm:p-10 border rounded-xl mt-3 shadow-lg bg-white"
        >
          <div>
            <h2 className="font-medium text-xl mb-6 text-gray-700">
              Bike Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {carDetails.bikeDetails.map((item, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="flex gap-1">
                    <IconField iconName={item.icon} />
                    <Label
                      htmlFor={item.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {item.label}
                      {item.required && (
                        <span className="text-red-500"> *</span>
                      )}
                    </Label>
                  </div>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      bikeInfo={bikeInfo}
                      handleInputChanges={handleInputChanges}
                    />
                  ) : item.fieldType === "dropdown" &&
                    Array.isArray(item.options) ? (
                    <DropdownField
                      item={item}
                      bikeInfo={bikeInfo}
                      handleInputChanges={handleInputChanges}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      bikeInfo={bikeInfo}
                      handleInputChanges={handleInputChanges}
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <Separator className="text-black pb-5" />
            <UploadImages
              ref={imageUploaderRef}
              triggerUpload={triggerUpload}
              bikeInfo={bikeInfo}
              mode={mode}
            />
            <Button
              type="submit"
              className="my-10 bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <AiOutlineLoading className="animate-spin" /> Uploading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default BikeAddListing;
