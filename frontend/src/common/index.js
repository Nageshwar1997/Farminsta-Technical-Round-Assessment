const BackendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
const SummaryApi = {
  addCreator: {
    url: `${BackendURL}/add_creator`,
    method: "POST",
  },
  getAllCreators: {
    url: `${BackendURL}/creators`,
    method: "GET",
  },

  getCreator: {
    url: `${BackendURL}/creator`,
    method: "GET",
  },
  updateCreator: {
    url: `${BackendURL}/update_creator`,
    method: "PATCH",
  },
  searchCreators: {
    url: `${BackendURL}/search`,
    method: "GET",
  },
};

export default SummaryApi;
