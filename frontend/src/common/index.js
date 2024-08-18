const BackendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
const SummaryApi = {
  addCreator: {
    url: `${BackendURL}/add-creator`,
    method: "POST",
  },
  getAllCreators: {
    url: `${BackendURL}/all-creators`,
    method: "GET",
  },
};

export default SummaryApi;
