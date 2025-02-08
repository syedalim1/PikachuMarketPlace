import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { db } from "../../../configs";
import {
  CarImages,
  CarListing,
  MobilesListing,
  MobilesImages,
  JobsListing,
  JobsImages,
} from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { FaTrashArrowUp } from "react-icons/fa6";
import Service from "@/Shared/Service"; // For default export
import CarItem from "@/Items/CarItem";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Footer from "@/Common/Footer";
import CarItemSearch from "@/search/[category]/CarItemSearch";
import Header from "@/Common/Header";
import MobileItem from "@/Items/MobileItem";
import MobileSearch from "@/search/[category]/MobileSearch";
import JobItemSearch from "@/search/[category]/JobItemSearch";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [mobileList, setMobileList] = useState([]);
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [DeleteJobId, setDeleteJobId] = useState(null);
  const [deleteMobileId, setDeleteMobileId] = useState(null);

  useEffect(() => {
    if (user) {
      getUserCarListing();
      GetUserMobileList();
      GetUserjobList();
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <Header />
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
            Not Registered
          </h1>
          <p className="text-center text-gray-700">
            Please register an account to view or edit your profile.
          </p>
          <div className="flex items-center justify-center mt-5">
            <SignedOut>
              <SignInButton>
                <Button className="hover:scale-110 text-center hover:text-black hover:bg-white transition-transform text-white bg-black">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  const getUserCarListing = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carlistingId))
        .where(
          eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CarListing.id));

      const formattedResult = Service.CarFormatResult(result);
      setCarList(formattedResult);
    } catch (error) {
      console.error("Error fetching user car listings:", error);
    }
  };
  const GetUserMobileList = async () => {
    try {
      const result1 = await db
        .select()
        .from(MobilesListing)
        .leftJoin(
          MobilesImages,
          eq(MobilesListing.id, MobilesImages.mobilelistingId)
        )
        .where(
          eq(MobilesListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MobilesListing.id));

      const formattedResult = Service.MobileFormatResult(result1);
      setMobileList(formattedResult);
      console.log("User Mobile Listings:", formattedResult); // Log formatted result
    } catch (err) {
      console.error("Error fetching mobile listings:", err);
    }
  };
  const GetUserjobList = async () => {
    try {
      const result1 = await db
        .select()
        .from(JobsListing)
        .leftJoin(JobsImages, eq(JobsListing.id, JobsImages.jobslistingId))
        .where(
          eq(JobsListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(JobsListing.id));

      const formattedResult = Service.JobsFormatResult(result1);
      setJobList(formattedResult);
      console.log("Job log ", formattedResult);
      console.log("Job list ", jobList);

      console.log("User job Listings:", formattedResult); // Log formatted result
    } catch (err) {
      console.error("Error fetching job listings:", err);
    }
  };
  const deleteMobileListing = async (id) => {
    try {
      // Delete from CarImages table
      await db
        .delete(MobilesImages)
        .where(eq(MobilesImages.mobilelistingId, id));

      // Delete from CarListing table
      await db.delete(MobilesListing).where(eq(MobilesListing.id, id));

      // Refresh the list after deletion
      GetUserMobileList();
    } catch (error) {
      console.error("Error deleting Mobile listing:", error);
    }
  };
  const deleteJobListing = async (id) => {
    try {
      // Delete from JobImages table
      await db.delete(JobsImages).where(eq(JobsImages.jobslistingId, id));

      // Delete from JobsListing table
      await db.delete(JobsListing).where(eq(JobsListing.id, id));

      // Refresh the list after deletion
      GetUserjobList();
    } catch (error) {
      console.error("Error deleting car listing:", error);
    }
  };
  const deleteCarListing = async (id) => {
    try {
      // Delete from CarImages table
      await db.delete(CarImages).where(eq(CarImages.carlistingId, id));

      // Delete from CarListing table
      await db.delete(CarListing).where(eq(CarListing.id, id));

      // Refresh the list after deletion
      getUserCarListing();
    } catch (error) {
      console.error("Error deleting car listing:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-4 h-full sm:px-10 md:px-20 py-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            My Listings
          </h2>
        </div>

        {/* Listings Grid */}
        <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {carList.length > 0 ? (
            carList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-white p-2 rounded-lg"
              >
                {/* Show "New" badge for the latest listing */}
                <CarItemSearch car={item} />

                {/* Action Buttons */}
                <div className="p-2 bg-gray-50 rounded-lg flex justify-between items-center gap-3">
                  <Link
                    to={`/add-listing/Cars?mode=edit&id=${item.id}`}
                    className="w-full"
                  >
                    <Button className="w-full" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog className="bg-white">
                    <AlertDialogTrigger>
                      <Button
                        variant="destructive"
                        className="bg-red-500 text-white rounded"
                        onClick={() => setDeleteCarId(item.id)} // Set car ID for deletion
                      >
                        <FaTrashArrowUp />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your listing.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCarListing(deleteCarId)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
          {mobileList.length > 0 ? (
            mobileList.map((mobile) => (
              <div
                key={mobile.id}
                className="flex flex-col bg-white p-2 rounded-lg"
              >
                {/* Show "New" badge for the latest listing */}
                <MobileSearch mobile={mobile} />

                {/* Action Buttons */}
                <div className="p-2 bg-gray-50 rounded-lg flex justify-between items-center gap-3">
                  <Link
                    to={`/add-listing/Mobiles?mode=edit&id=${mobile.id}`}
                    className="w-full"
                  >
                    <Button className="w-full" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog className="bg-white">
                    <AlertDialogTrigger>
                      <Button
                        variant="destructive"
                        className="bg-red-500 text-white rounded"
                        onClick={() => setDeleteMobileId(mobile.id)} // Set mobile ID for deletion
                      >
                        <FaTrashArrowUp />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your listing.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMobileListing(deleteMobileId)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
          {mobileList.length == 0 && carList.length == 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No listings available. Click "+ Add New Listing" to create one.
            </div>
          ) : (
            <div></div>
          )}{" "}
          {jobList.length > 0 ? (
            jobList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-white p-2 rounded-lg"
              >
                {/* Show "New" badge for the latest listing */}
                <JobItemSearch job={item} />

                {/* Action Buttons */}
                <div className="p-2 bg-gray-50 rounded-lg flex justify-between items-center gap-3">
                  <Link
                    to={`/add-listing/Cars?mode=edit&id=${item.id}`}
                    className="w-full"
                  >
                    <Button className="w-full" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog className="bg-white">
                    <AlertDialogTrigger>
                      <Button
                        variant="destructive"
                        className="bg-red-500 text-white rounded"
                        onClick={() => setDeleteJobId(item.id)} // Set car ID for deletion
                      >
                        <FaTrashArrowUp />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your listing.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteJobListing(DeleteJobId)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default MyListing;
