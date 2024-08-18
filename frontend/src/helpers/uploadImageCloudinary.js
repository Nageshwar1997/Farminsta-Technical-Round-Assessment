const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;
const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

// console.log("cloudinaryURL", cloudinaryURL);
// console.log("cloudinaryName", cloudinaryName);

const uploadImageCloudinary = async (image) => {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "CreatorsList");
  formData.append("cloud_name", cloudinaryName);

  try {
    const response = await fetch(cloudinaryURL, {
      method: "post",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export default uploadImageCloudinary;
