import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddCreator from "../pages/AddCreator";
import ViewCreatorDetails from "../pages/ViewCreatorDetails";
import EditCreator from "../pages/EditCreator";
import SearchCreators from "../pages/SearchCreators";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchCreators />,
      },
      {
        path: "add-creator",
        element: <AddCreator />,
      },
      {
        path: "view-creator-details/:id",
        element: <ViewCreatorDetails />,
      },
      {
        path: "edit-creator/:id",
        element: <EditCreator />,
      },
    ],
  },
]);

export default router;
