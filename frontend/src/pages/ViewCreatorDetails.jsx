/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../context";
import toast from "react-hot-toast";

const ViewCreatorDetails = () => {
  const { fetchCurrentCreator } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentCreator(id);
  }, []);

  const currentCreator = useSelector(
    (state) => state?.creators?.currentCreator
  );

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
    <div className="w-full h-full flex justify-between gap-5 px-10">
      <div className="w-[calc(100%-33%)] h-full grid gap-4">
        <div className="w-full h-fit">
          <img
            src={currentCreator?.bannerImageUrl}
            alt={currentCreator?.name}
            className="w-full h-full rounded-lg"
          />
        </div>

        <div className="w-full h-fit flex items-center gap-4 font-semibold text-xl">
          <span>Languages : </span>
          {currentCreator?.languages?.map((language) => (
            <div
              className="border border-gray-500 px-2 py-1 rounded-md bg-blue-300"
              key={language}
            >
              {language}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 h-full flex flex-col gap-4">
        <h1 className="text-slate-950 text-7xl text-center">
          {currentCreator?.name}
        </h1>
        <p className="text-xl text-slate-700">{currentCreator?.description}</p>
        <div className="w-full h-fit flex items-center flex-wrap gap-4 font-semibold text-xl">
          <span>Specializations : </span>
          {currentCreator?.specializations?.map((specialization) => (
            <div
              className="border border-gray-500 px-2 py-1 rounded-md bg-green-300"
              key={specialization}
            >
              {specialization}
            </div>
          ))}
        </div>
        <label className="text-xl">
          Email :{" "}
          <Link
            to={`mailto:${currentCreator?.email}`}
            target="_blank"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            {currentCreator?.email}
          </Link>
        </label>
        <p className="text-xl">Education : {currentCreator?.education}</p>
        <div className="w-full h-auto flex items-center justify-start gap-10 mt-2 py-1 bg-gray-200 px-2">
          {currentCreator?.socialMediaLinks?.map((socialMediaLink, index) => (
            <Link
              key={index}
              to={socialMediaLink.url}
              target="_blank"
              className={`flex items-center gap-2 bg-white hover:bg-slate-300 p-5 text-4xl rounded-full ${
                socialMediaLink.platform === "Youtube"
                  ? "text-red-600"
                  : socialMediaLink.platform === "Instagram"
                  ? "text-pink-700"
                  : socialMediaLink.platform === "Twitter"
                  ? "text-blue-600"
                  : socialMediaLink.platform === "TikTok"
                  ? "text-black"
                  : ""
              }`}
            >
              {getIconForLabel(socialMediaLink.platform)}
            </Link>
          ))}
        </div>
        <div className="w-full px-2 py-2 flex justify-center items-center gap-10">
          <Link
            to={`/edit-creator/${currentCreator?._id}`}
            className=" text-center px-4 py-2 bg-green-600 text-white transition-all max-w-[200px] w-full text-xl font-semibold hover:bg-white hover:text-black rounded-full"
          >
            Edit Details
          </Link>
          <Link
            to={"/"}
            onClick={() => handleHire(currentCreator?.name)}
            className="text-center px-4 py-2 bg-red-600 text-white transition-all max-w-[200px] w-full text-xl font-semibold hover:bg-white hover:text-black rounded-full"
          >
            Hire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCreatorDetails;
