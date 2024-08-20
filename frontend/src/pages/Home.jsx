/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { FaTiktok, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Context from "../context";

const Home = () => {
  const { fetchCurrentCreator } = useContext(Context);

  const creators = useSelector((state) => state?.creators?.creators);
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

  const handleSeeMoreDetails = async (id) => {
    await fetchCurrentCreator(id);
  };

  // console.log("creators", creators);
  return (
  <div className="w-full h-full px-4 sm:px-6 md:px-8 lg:px-10">
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {creators?.map((creator) => (
        <div
          key={creator?._id}
          className="w-full h-full grid items-center p-3 sm:p-4 md:p-5 shadow-xl rounded-md bg-slate-100"
        >
          <div className="w-full h-auto p-2">
            <img
              src={creator?.bannerImageUrl}
              alt={creator?.name}
              className="w-full h-full rounded-sm object-cover"
            />
          </div>
          <div className="w-full h-auto p-2 grid gap-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold line-clamp-1 text-center">
              {creator?.name}
            </h3>
            <p className="text-gray-700 line-clamp-2 text-sm sm:text-base">
              {creator?.description}
            </p>
            <p className="text-gray-700 line-clamp-1 font-semibold text-sm sm:text-base mt-1">
              {creator?.education}
            </p>
            {creator?.email && (
              <Link
                to={`mailto:${creator?.email}`}
                className="text-blue-700 line-clamp-1 mt-1 font-semibold text-sm sm:text-lg flex items-center gap-2 hover:text-blue-900 transition-all"
                target="_blank"
              >
                <MdOutlineMail />
                {creator?.email}
              </Link>
            )}
            <div className="w-full h-auto flex flex-wrap items-center gap-2 mt-1 py-1 bg-gray-200 px-2">
              <GrUserExpert />
              {creator?.specializations.map((specialization, index) => (
                <p
                  key={index + specialization}
                  className="px-2 py-1 rounded-sm bg-blue-200 text-xs sm:text-sm"
                >
                  {specialization}
                </p>
              ))}
            </div>
            <div className="w-full h-auto flex flex-wrap items-center justify-around gap-3 mt-2 py-1 bg-gray-200 px-2">
              {creator?.socialMediaLinks.map((socialMediaLink, index) => (
                <Link
                  key={index}
                  to={socialMediaLink.url}
                  target="_blank"
                  className={`flex items-center gap-2 bg-white p-2 sm:p-3 text-lg sm:text-xl rounded-full ${
                    socialMediaLink.platform === "Youtube"
                      ? "text-red-600"
                      : socialMediaLink.platform === "Instagram"
                      ? "text-pink-700"
                      : socialMediaLink.platform === "Twitter"
                      ? "text-blue-600"
                      : "text-black"
                  }`}
                >
                  {getIconForLabel(socialMediaLink.platform)}
                </Link>
              ))}
            </div>
            <div className="w-full h-auto mt-2 flex justify-end">
              <Link
                to={`/view-creator-details/${creator?._id}`}
                onClick={() => handleSeeMoreDetails(creator?._id)}
                className="text-blue-600 hover:underline font-semibold text-sm sm:text-lg hover:text-blue-800 cursor-pointer"
              >
                See More Details...
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Home;

