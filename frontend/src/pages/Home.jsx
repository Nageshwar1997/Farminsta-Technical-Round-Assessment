import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { FaTiktok, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Home = () => {
  const creators = useSelector((state) => state?.creators?.creators);

  console.log("creators", creators);
  return (
    <div className="w-full h-full px-10">
      <div className="w-full h-full grid grid-cols-3 gap-5">
        {creators?.map((creator) => (
          <div
            key={creator?._id}
            className="w-full h-full grid items-center p-2 shadow-xl rounded-md bg-slate-100"
          >
            <div className="w-full h-auto p-2">
              <img
                src={creator?.bannerImageUrl}
                alt={creator?.name}
                className="w-full h-full rounded-sm"
              />
            </div>
            <div className="w-full h-auto p-2 grid">
              <h3 className="text-2xl font-semibold line-clamp-1 text-center">
                {creator?.name}
              </h3>
              <p className="text-gray-700 line-clamp-2">
                {creator?.description}
              </p>
              <p className="text-gray-700 line-clamp-1 font-semibold mt-1">
                {creator?.education}
              </p>
              {creator?.email && (
                <Link
                  to={`mailto:${creator?.email}`}
                  className="text-blue-700 line-clamp-1 mt-1 font-semibold text-lg flex items-center gap-2 hover:text-blue-900 transition-all"
                  target="_blank"
                >
                  <MdOutlineMail />
                  {creator?.email}
                </Link>
              )}
              <div className="w-full h-auto flex items-center gap-3 mt-2">
                <GrUserExpert/>
                {creator?.specializations.map((specialization, index) => (
                  <p
                    key={index + specialization}
                    className="px-2 py-1 rounded-sm bg-slate-200"
                  >
                    {specialization}
                  </p>
                ))}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
// import { FaTiktok, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
