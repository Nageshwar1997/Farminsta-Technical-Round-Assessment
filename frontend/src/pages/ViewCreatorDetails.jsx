/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common";

const ViewCreatorDetails = () => {
  const [currentCreator, setCurrentCreator] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCurrentCreator = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.getCreator.url}/${id}`, {
        method: SummaryApi.getCreator.method,
      });

      const responseData = await response.json();

      if (responseData.success) {
        setCurrentCreator(responseData.creator);
        toast.success(responseData.message);
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchCurrentCreator(id);
  }, []);

  const socialMediaIcons = [
    {
      icon: <FaTiktok />,
      label: "TikTok",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
    },
    {
      icon: <FaYoutube />,
      label: "Youtube",
    },
  ];

  const getIconForLabel = (label) => {
    const iconObj = socialMediaIcons.find((icon) => icon.label === label);
    return iconObj ? iconObj.icon : null;
  };

  if (!currentCreator) {
    return <div>Loading...</div>; // Handle loading state or null creator state
  }

  const handleHire = (name) => {
    toast.success(`${name} hired successfully`);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="w-full h-fit flex flex-col lg:flex-row gap-5 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="w-full flex-1 h-full grid gap-4">
        <div className="w-full h-fit rounded-lg overflow-hidden">
          <img
            src={currentCreator?.bannerImageUrl}
            alt={currentCreator?.name}
            className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
          />
        </div>

        <div className="w-full h-fit flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-200">
          <span className="text-xs sm:text-sm md:text-lg">Languages:</span>
          {currentCreator?.languages?.map((language) => (
            <div
              className="border border-gray-500 px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm md:text-lg rounded-md bg-blue-300 dark:bg-blue-600 text-gray-900 dark:text-gray-100 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              key={language}
            >
              {language}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/3 h-full flex flex-col gap-2 sm:gap-4 md:gap-5">
        <h1 className="text-slate-950 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          {currentCreator?.name}
        </h1>
        <p className="text-xl text-slate-700 dark:text-gray-300 transition-transform transform hover:scale-105 duration-300 ease-in-out">
          {currentCreator?.description}
        </p>
        <div className="w-full h-fit flex flex-wrap items-center gap-4 font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-200">
          <span className="text-sm sm:text-lg">
            Specializations:
          </span>
          {currentCreator?.specializations?.map((specialization) => (
            <div
              className="border border-gray-500 px-1 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-lg rounded-md bg-green-300 dark:bg-green-600 text-gray-900 dark:text-gray-100 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              key={specialization}
            >
              {specialization}
            </div>
          ))}
        </div>
        <label className="text-lg sm:text-xl text-gray-800 dark:text-gray-200">
          Email:{" "}
          <Link
            to={`mailto:${currentCreator?.email}`}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-300 ease-in-out"
          >
            {currentCreator?.email}
          </Link>
        </label>
        <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200">
          Education: {currentCreator?.education}
        </p>
        <div className="w-full h-auto flex flex-wrap items-center justify-start gap-4 mt-2 py-1 bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
          {currentCreator?.socialMediaLinks?.map((socialMediaLink, index) => (
            <Link
              key={index}
              to={socialMediaLink.url}
              target="_blank"
              className={`flex items-center gap-2 bg-white dark:bg-gray-800 p-3 sm:p-4 text-2xl sm:text-3xl rounded-full transition-transform transform hover:scale-110 duration-300 ease-in-out ${
                socialMediaLink.platform === "Youtube"
                  ? "text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  : socialMediaLink.platform === "Instagram"
                  ? "text-pink-700 dark:text-pink-400 hover:text-pink-900 dark:hover:text-pink-300"
                  : socialMediaLink.platform === "Twitter"
                  ? "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  : socialMediaLink.platform === "TikTok"
                  ? "text-black dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200"
                  : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400"
              }`}
            >
              {getIconForLabel(socialMediaLink.platform)}
            </Link>
          ))}
        </div>
        <div className="w-full px-2 py-2 flex justify-center items-center gap-4">
          <Link
            to={`/edit-creator/${currentCreator?._id}`}
            className="text-center px-4 py-2 bg-green-600 text-white transition-transform transform hover:scale-105 max-w-[200px] w-full text-lg font-semibold hover:bg-green-500 dark:hover:bg-green-700 rounded-full duration-300 ease-in-out"
          >
            Edit Details
          </Link>
          <Link
            to={"/"}
            onClick={() => handleHire(currentCreator?.name)}
            className="text-center px-4 py-2 bg-red-600 text-white transition-transform transform hover:scale-105 max-w-[200px] w-full text-lg font-semibold hover:bg-red-500 dark:hover:bg-red-700 rounded-full duration-300 ease-in-out"
          >
            Hire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCreatorDetails;
