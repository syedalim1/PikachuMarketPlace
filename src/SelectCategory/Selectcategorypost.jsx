import React from 'react'
import Data from "@/Shared/Data";
import { Link } from 'react-router-dom';
import Header from '@/Common/Header';
import Footer from '@/Common/Footer';
import { SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
function Selectcategorypost() {
  const { user } = useUser();

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
  return (
    <div>
        <Header/>
      <div className="md:mt-[200px] bg-white">
        <h2 className=" p-5 text-2xl font-bold text-start  mb-6 text-gray-800">
          Select Category
        </h2>

        <div className="  px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col  gap-3">
            {Data.Categories1.map((category, index) => (
              <div
                key={index}
                className="w-13 h-15   hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer rounded-lg"
              >
                <Link to={`/add-listing/${category.name}`}>
                  <div className="flex flex-row items-center border p-2 ">
                    <div className="text-xl text-white bg-blue-500 p-2 rounded-full">
                      {category.icon}
                    </div>
                    <h2 className=" text-sm text-center items-center pl-5  text-gray-700 font-semibold">
                      {category.name}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  );
}

export default Selectcategorypost