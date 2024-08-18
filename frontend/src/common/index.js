const BackendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
const SummaryApi = {
  addCreator: {
    url: `${BackendURL}/api/add-creator`,
    method: "POST",
  },
  getAllCreators: {
    url: `${BackendURL}/api/all-creators`,
    method: "GET",
  },

  getCreator: {
    url: `${BackendURL}/api/creators`,
    method: "GET",
  },
  updateCreator: {
    url: `${BackendURL}/api/update-creator`,
    method: "PATCH",
  },
};

export default SummaryApi;
