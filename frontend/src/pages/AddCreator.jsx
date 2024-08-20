import React, { useState } from "react";
import uploadImageCloudinary from "../helpers/uploadImageCloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdAddLink, MdModeEdit, MdDeleteOutline } from "react-icons/md";
import socialMediaPlatforms from "../helpers/socialMediaPlatforms";

import toast from "react-hot-toast";
import SummaryApi from "../common";

const AddCreator = () => {
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
  const handleBannerFileUpload = async (e) => {
    const { files, type, name } = e.target;

    if (type === "file" && files.length > 0) {
      const imageFile = files[0];
      try {
        const cloudinaryImageUrl = await uploadImageCloudinary(imageFile);
        if (cloudinaryImageUrl.url) {
          setCreatorData((prev) => ({
            ...prev,
            [name]: cloudinaryImageUrl.url,
          }));
        }

        if (cloudinaryImageUrl.url) {
          toast.success("Banner uploaded successfully");
        }

        if (!cloudinaryImageUrl.url) {
          toast.error("Banner upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Banner upload failed");
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
      // Add new link
      setCreatorData((prev) => ({
        ...prev,
        socialMediaLinks: [...prev.socialMediaLinks, socialMediaData],
      }));
    }
    setSocialMediaData({
      platform: "",
      url: "",
    });
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
      setSocialMediaData({
        platform: "",
        url: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreatorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCreatorSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryApi.addCreator.url, {
        method: SummaryApi.addCreator.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...creatorData,
        }),
      });

      const responseData = await response.json();

      // console.log("responseData", responseData);

      if (responseData.success) {
        toast.success(responseData.message);
        setCreatorData({
          bannerImageUrl: "",
          name: "",
          email: "",
          description: "",
          education: "",
          languages: [],
          specializations: [],
          socialMediaLinks: [],
        });
      }

      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("Failed to add creator:", error);
      toast.error("Failed to add creator");
    }
  };

  return (
    <form className="w-full min-h-screen flex flex-col gap-8 bg-slate-200 dark:bg-darkBackground px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 overflow-y-auto pb-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-slate-800 dark:text-slate-200">
            Add Creator
          </h2>

          {/* Name */}
          <div className="grid gap-4 mb-4">
            <label
              htmlFor="name"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Full Name"
              className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              value={creatorData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="grid gap-4 mb-4">
            <label
              htmlFor="email"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              value={creatorData.email.toLowerCase()}
              onChange={handleInputChange}
            />
          </div>

          {/* Education */}
          <div className="grid gap-4 mb-4">
            <label
              htmlFor="education"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Education:
            </label>
            <input
              type="text"
              name="education"
              id="education"
              placeholder="Enter Education"
              className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              value={creatorData.education}
              onChange={handleInputChange}
            />
          </div>

          {/* Banner Image */}
          {creatorData?.bannerImageUrl && (
            <div className="mb-4">
              <label className="block text-lg font-medium text-slate-700 dark:text-slate-300">
                Banner Image:
              </label>
              <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md flex justify-center items-center bg-white dark:bg-gray-800">
                <img
                  src={creatorData.bannerImageUrl}
                  alt={creatorData.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          )}

          {/* Banner Image Upload/URL */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-slate-700 dark:text-slate-300">
              Change Banner:
            </label>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4"
                  checked={!isURL}
                  onChange={() => setIsURL(false)}
                />
                <span className="ml-2 text-slate-800 dark:text-slate-200">
                  File
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4"
                  checked={isURL}
                  onChange={() => setIsURL(true)}
                />
                <span className="ml-2 text-slate-800 dark:text-slate-200">
                  URL
                </span>
              </div>
            </div>
            {isURL ? (
              <input
                type="text"
                name="bannerImageUrl"
                id="bannerImageUrl"
                placeholder="Enter Banner Image URL"
                className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 mt-2"
                value={creatorData.bannerImageUrl}
                onChange={handleInputChange}
              />
            ) : (
              <label htmlFor="bannerImageUrl" className="block cursor-pointer">
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md h-36 flex justify-center items-center bg-white dark:bg-gray-800">
                  <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center gap-2">
                    <span className="text-4xl">
                      <FaCloudUploadAlt />
                    </span>
                    <p className="text-sm">Upload Banner Image</p>
                    <input
                      type="file"
                      name="bannerImageUrl"
                      id="bannerImageUrl"
                      className="hidden"
                      onChange={handleBannerFileUpload}
                    />
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Social Media Links */}
          <div className="mb-4">
            <label
              htmlFor="url"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Social Media Links:
            </label>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-2">
                <select
                  name="platform"
                  id="platform"
                  value={socialMediaData.platform}
                  onChange={handleSocialMediaInputChange}
                  className="rounded-md border border-gray-300 dark:text-slate-700 dark:border-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-gray-400"
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
                  placeholder="Enter URL"
                  className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                  value={socialMediaData.url}
                  onChange={handleSocialMediaInputChange}
                />
                <button
                  type="button"
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500 text-white text-3xl hover:bg-blue-600"
                  onClick={handleAddSocialMediaLink}
                >
                  <MdAddLink />
                </button>
              </div>

              {/* Display Social Media Links */}
              {creatorData.socialMediaLinks.length > 0 && (
                <div>
                  {creatorData.socialMediaLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md mt-2"
                    >
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {link.platform}
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600"
                          onClick={() => handleEditSocialMediaLink(index)}
                        >
                          <MdModeEdit />
                        </button>
                        <button
                          className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                          onClick={() => handleDeleteSocialMediaLink(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full h-36 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 mt-2 resize-none"
              placeholder="Enter description"
              rows={3}
              onChange={handleInputChange}
              value={creatorData.description}
            />
          </div>

          {/* Languages */}
          <div className="mb-4">
            <label
              htmlFor="languages"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Languages:
              <span className="text-red-700 text-xs">
                {" "}
                Press Enter key after each language*
              </span>
            </label>
            <textarea
              name="languages"
              id="languages"
              className="w-full h-36 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 mt-2 resize-none"
              placeholder="Enter Languages"
              rows={3}
              onChange={(e) =>
                setCreatorData((prev) => ({
                  ...prev,
                  languages: e.target.value
                    .split(", ")
                    .map((lang) => lang.trim())
                    .filter(Boolean),
                }))
              }
              value={creatorData.languages.join(", ")}
            />
          </div>

          {/* Specialization */}
          <div className="mb-4">
            <label
              htmlFor="specialization"
              className="text-lg font-medium text-slate-700 dark:text-slate-300"
            >
              Specialization:
              <span className="text-red-700 text-xs">
                {" "}
                Press Enter key after each specialization*
              </span>
            </label>
            <textarea
              name="specialization"
              id="specialization"
              className="w-full h-36 px-3 border border-gray-300 dark:border-gray-600 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 mt-2 resize-none"
              placeholder="Enter Specializations"
              rows={3}
              onChange={(e) =>
                setCreatorData((prev) => ({
                  ...prev,
                  specializations: e.target.value
                    .split(", ")
                    .map((spec) => spec.trim())
                    .filter(Boolean),
                }))
              }
              value={creatorData.specializations.join(", ")}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-md px-8 py-2 rounded-full"
              onClick={handleAddCreatorSubmit}
            >
              Add Creator
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCreator;
