/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCurrentCreator } from "../store/creatorReducer";
import uploadImageCloudinary from "../helpers/uploadImageCloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdAddLink, MdDeleteOutline, MdModeEdit } from "react-icons/md";
import socialMediaPlatforms from "../helpers/socialMediaPlatforms";
import Context from "../context";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCreator = useSelector(
    (state) => state?.creators?.currentCreator
  );
  const { fetchCurrentCreator } = useContext(Context);

  const [isURL, setIsURL] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [socialMediaData, setSocialMediaData] = useState({
    platform: "",
    url: "",
  });

  const [creatorData, setCreatorData] = useState({
    bannerImageUrl: "",
    name: "",
    email: "",
    description: "",
    education: "",
    languages: [],
    specializations: [],
    socialMediaLinks: [],
  });

  useEffect(() => {
    if (currentCreator) {
      setCreatorData({
        bannerImageUrl: currentCreator.bannerImageUrl || "",
        name: currentCreator.name || "",
        email: currentCreator.email || "",
        description: currentCreator.description || "",
        education: currentCreator.education || "",
        languages: currentCreator.languages || [],
        specializations: currentCreator.specializations || [],
        socialMediaLinks: currentCreator.socialMediaLinks || [],
      });
    }
  }, [currentCreator]);

  useEffect(() => {
    fetchCurrentCreator(id);
  }, [id]);

  const handleBannerFileUpdate = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const imageFile = files[0];
      try {
        const cloudinaryImage = await uploadImageCloudinary(imageFile);
        if (cloudinaryImage.url) {
          setCreatorData((prev) => ({
            ...prev,
            bannerImageUrl: cloudinaryImage.url,
          }));
          toast.success("Banner Updated Successfully");
        } else {
          toast.error("Banner Update Failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Banner Update Failed");
      }
    }
  };

  const handleSocialMediaInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSocialMediaLink = () => {
    if (!socialMediaData.platform || !socialMediaData.url) return;

    if (editIndex !== null) {
      setCreatorData((prev) => {
        const updatedLinks = [...prev.socialMediaLinks];
        updatedLinks[editIndex] = socialMediaData;
        return { ...prev, socialMediaLinks: updatedLinks };
      });
      setEditIndex(null);
    } else {
      setCreatorData((prev) => ({
        ...prev,
        socialMediaLinks: [...prev.socialMediaLinks, socialMediaData],
      }));
    }

    setSocialMediaData({ platform: "", url: "" });
  };

  const handleEditSocialMediaLink = (index) => {
    setSocialMediaData(creatorData.socialMediaLinks[index]);
    setEditIndex(index);
  };

  const handleDeleteSocialMediaLink = (index) => {
    setCreatorData((prev) => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.filter((_, i) => i !== index),
    }));
    if (editIndex === index) {
      setEditIndex(null);
      setSocialMediaData({ platform: "", url: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SummaryApi.updateCreator.url}/${id}`, {
        method: SummaryApi.updateCreator.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creatorData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        dispatch(setCurrentCreator(responseData.creator));
        toast.success(responseData.message);
        setTimeout(() => {
          navigate(`/view-creator-details/${id}`);
        }, 2000);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form className="w-full h-full gap-8 flex pb-2 bg-slate-200 px-10">
      <div className="w-full h-full overflow-y-auto py-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Update Creator
        </h2>
        <div className="grid gap-2 mt-2">
          <label htmlFor="name" className="text-lg">
            Name :{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Full Name"
            className="w-full h-12 px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
            value={creatorData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="email" className="text-lg">
            Email :{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="w-full h-12 px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
            value={creatorData.email.toLowerCase()}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="education" className="text-lg">
            Education :{" "}
          </label>
          <input
            type="text"
            name="education"
            id="education"
            placeholder="Enter Education"
            className="w-full h-12 px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
            value={creatorData.education}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2 mt-2">
          <label
            htmlFor="bannerImageUrl"
            className="cursor-pointer w-fit mt-3 flex gap-4"
          >
            Banner Image :
            <div className="flex gap-2 items-center">
              <p>File</p>
              <input
                type="radio"
                className="w-4 h-4"
                checked={!isURL}
                onChange={() => setIsURL(false)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>URL</p>
              <input
                type="radio"
                className="w-4 h-4"
                checked={isURL}
                onChange={() => setIsURL(true)}
              />
            </div>
          </label>
          {isURL ? (
            <input
              type="text"
              name="bannerImageUrl"
              id="bannerImageUrl"
              placeholder="Enter Banner Image Url"
              className="w-full h-12 px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
              value={creatorData.bannerImageUrl}
              onChange={handleInputChange}
            />
          ) : (
            <label htmlFor="bannerImageUrl" className="cursor-grab">
              <div className="p-2 border rounded-md h-36 w-full flex justify-center items-center bg-white">
                <div className="text-slate-500 flex flex-col gap-2 justify-center items-center">
                  <span className="text-4xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Banner Image</p>
                  <input
                    type="file"
                    name="bannerImageUrl"
                    id="bannerImageUrl"
                    className="hidden"
                    onChange={handleBannerFileUpdate}
                  />
                </div>
              </div>
            </label>
          )}
        </div>
      </div>
      <div className="w-full h-full overflow-y-auto p-4">
        <div className="grid gap-2 mt-2">
          <label htmlFor="url" className="text-lg">
            Social Media Links :{" "}
          </label>
          <div className="w-full flex gap-2">
            <select
              name="platform"
              id="platform"
              value={socialMediaData.platform}
              onChange={handleSocialMediaInputChange}
              className="rounded-md focus-within:outline-none border border-gray-300 focus-within:border-gray-400"
            >
              <option value="">Select Platform</option>
              {socialMediaPlatforms.map((platform) => (
                <option key={platform.id} value={platform.label}>
                  {platform.value}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="url"
              id="url"
              placeholder="Enter Full Name"
              className="w-full h-12 px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
              value={socialMediaData.url}
              onChange={handleSocialMediaInputChange}
            />
            <span
              className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500 text-white text-3xl px-1"
              onClick={handleAddSocialMediaLink}
            >
              <MdAddLink />
            </span>
          </div>
        </div>
        {creatorData.socialMediaLinks.length > 0 && (
          <div className="grid gap-2 mt-2">
            {creatorData.socialMediaLinks.map((link, index) => (
              <div
                key={index}
                className="max-w-[200px] w-full flex justify-between items-center"
              >
                <p className="text-lg font-semibold">{link.platform}</p>
                <div className="flex gap-2">
                  <span
                    className="p-2 bg-green-500 rounded-full hover:bg-green-600 text-white"
                    onClick={() => handleEditSocialMediaLink(index)}
                  >
                    <MdModeEdit />
                  </span>
                  <span
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 hover:text-white"
                    onClick={() => handleDeleteSocialMediaLink(index)}
                  >
                    <MdDeleteOutline />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="grid gap-2 mt-2">
          <label htmlFor="description" className="text-lg">
            Description :{" "}
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full max-h-36 h-full shadow-md rounded-md focus-within:outline-none border border-gray-300 focus-within:border-blue-500 p-2"
            placeholder="Enter description"
            rows={3}
            onChange={handleInputChange}
            value={creatorData.description}
          />
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="languages" className="text-lg">
            Languages :{" "}
            <span className="text-red-700 text-xs">
              Press Enter key after each language*
            </span>
          </label>
          <textarea
            name="languages"
            id="languages"
            className="w-full max-h-36 h-full shadow-md rounded-md focus-within:outline-none border border-gray-300 focus-within:border-blue-500 p-2"
            placeholder="Enter Languages"
            rows={3}
            onChange={(e) =>
              setCreatorData((prev) => ({
                ...prev,
                languages: e.target.value.split(", "),
              }))
            }
            value={creatorData.languages.join(", ")}
          />
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="specialization" className="text-lg">
            Specialization :{" "}
            <span className="text-red-700 text-xs">
              Press Enter key after each specialization*
            </span>
          </label>
          <textarea
            name="specialization"
            id="specialization"
            className="w-full max-h-36 h-full shadow-md rounded-md focus-within:outline-none border border-gray-300 focus-within:border-blue-500 p-2"
            placeholder="Enter Specializations"
            rows={3}
            onChange={(e) =>
              setCreatorData((prev) => ({
                ...prev,
                specializations: e.target.value.split(", "),
              }))
            }
            value={creatorData.specializations.join(", ")}
          />
        </div>
        <div className="w-full h-12 flex justify-center items-center mt-4 text-lg font-semibold">
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-md px-14 py-2 rounded-full"
            onClick={handleSubmit}
          >
            Update Creator
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditCreator;
