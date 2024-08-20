/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaTiktok, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Context from "../context";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import LoadingHome from "../components/loadingIndicators/LoadingHome";

// Helper function to get social media icons
const getIconForLabel = (label, socialMediaIcons) => {
  const iconObj = socialMediaIcons.find((icon) => icon.label === label);
  return iconObj ? iconObj.icon : null;
};

// Social media icons configuration
const socialMediaIcons = [
  { icon: <FaTiktok />, label: "TikTok" },
  { icon: <FaTwitter />, label: "Twitter" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaYoutube />, label: "Youtube" },
];

const SearchCreators = () => {
  // Hooks
  const [searchCreators, setSearchCreators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetchCurrentCreator } = useContext(Context);
  const query = useLocation().search;

  // Fetch functions
  const fetchAllCreators = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getAllCreators.url, {
        method: SummaryApi.getAllCreators.method,
      });
      const responseData = await response.json();
      if (responseData.success) {
        setLoading(false);
        setSearchCreators(responseData.creators);
      }
      if (responseData.error) {
        setLoading(false);
        setError(true);
        toast.error(responseData.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error fetching all creators:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.searchCreators.url}${query}`, {
        method: SummaryApi.searchCreators.method,
      });
      const responseData = await response.json();

      if (responseData.success) {
        setLoading(false);
        setSearchCreators(responseData.creators);
      }
      if (responseData.error) {
        setLoading(false);
        setError(true);
        toast.error(responseData.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error fetching search results:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  // Event handlers
  const handleSeeMoreDetails = async (id) => {
    await fetchCurrentCreator(id);
  };

  // Effect
  useEffect(() => {
    if (query) {
      fetchSearchResults();
    } else {
      fetchAllCreators();
    }
  }, [query]);

  // Render
  const filters = query
    .split("=")
    .slice(1)
    .map((item) => item.split("&").splice(0, 1))
    .map((item) =>
      typeof item[0] === "string" ? item[0].replace(/\+/g, " ") : item
    )
    .join(", ");

  return loading && !error ? (
    <LoadingHome />
  ) : (
    <>
      <div className="w-full h-full max-h-[100vh-80px] px-4 sm:px-6 md:px-8 lg:px-10 overflow-y-scroll scrollbar-none">
        {query && (
          <div className="w-full flex flex-col gap-1 mb-1">
            <h1 className="text-xl text-left font-semibold capitalize text-slate-800 dark:text-darkText">
              You are searching: <span className="font-normal">{filters}</span>
            </h1>
            <h1 className="text-xl text-left mb-2 font-semibold text-slate-800 dark:text-darkText">
              Results Found:{" "}
              <span className="font-normal">{searchCreators.length}</span>
            </h1>
          </div>
        )}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5">
          {searchCreators.map((creator) => (
            <div
              key={creator?._id}
              className="w-full h-full grid items-center p-4 sm:p-5 md:p-6 shadow-lg rounded-lg bg-slate-100 dark:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
            >
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-lg">
                <img
                  src={creator?.bannerImageUrl}
                  alt={creator?.name}
                  className="w-full h-full object-cover rounded-t-lg transition-transform transform hover:scale-110 duration-300 ease-in-out"
                />
              </div>
              <div className="w-full h-auto p-4 flex flex-col gap-3 bg-white dark:bg-gray-900 rounded-b-lg shadow-inner">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 line-clamp-1 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  {creator?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm sm:text-base">
                  {creator?.description}
                </p>
                <p className="text-gray-800 dark:text-gray-300 line-clamp-1 font-semibold text-sm sm:text-base mt-1">
                  {creator?.education}
                </p>
                {creator?.email && (
                  <Link
                    to={`mailto:${creator?.email}`}
                    className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 mt-1 font-semibold text-sm sm:text-base"
                    target="_blank"
                  >
                    <MdOutlineMail />
                    {creator?.email}
                  </Link>
                )}
                <div className="w-full flex flex-wrap items-center gap-2 mt-1 py-1 bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
                  <GrUserExpert className="text-gray-800 dark:text-gray-300" />
                  {creator?.specializations.map((specialization) => (
                    <p
                      key={specialization}
                      className="px-2 py-1 rounded-full bg-blue-200 dark:bg-blue-600 text-xs sm:text-sm"
                    >
                      {specialization}
                    </p>
                  ))}
                </div>
                <div className="w-full flex flex-wrap items-center justify-around gap-3 mt-2 py-1 bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
                  {creator?.socialMediaLinks.map((socialMediaLink, index) => (
                    <Link
                      key={index + "socialMediaLink"}
                      to={socialMediaLink.url}
                      target="_blank"
                      className={`flex items-center gap-2 bg-white dark:bg-gray-800 p-2 sm:p-3 text-lg sm:text-xl rounded-full transition-colors duration-300 ${
                        socialMediaLink.platform === "Youtube"
                          ? "text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400"
                          : socialMediaLink.platform === "Instagram"
                          ? "text-pink-700 dark:text-pink-400 hover:text-pink-900 dark:hover:text-pink-300"
                          : socialMediaLink.platform === "Twitter"
                          ? "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400"
                      }`}
                    >
                      {getIconForLabel(
                        socialMediaLink.platform,
                        socialMediaIcons
                      )}
                    </Link>
                  ))}
                </div>
                <div className="w-full flex justify-end mt-2">
                  <Link
                    to={`/view-creator-details/${creator?._id}`}
                    onClick={() => handleSeeMoreDetails(creator?._id)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm lg:text-lg cursor-pointer underline transition-colors duration-300"
                  >
                    See More Details...
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchCreators;
