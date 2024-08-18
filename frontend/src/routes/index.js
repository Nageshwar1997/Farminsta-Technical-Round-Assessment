import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddCreator from "../pages/AddCreator";
import ViewCreatorDetails from "../pages/ViewCreatorDetails";
import EditCreator from "../pages/EditCreator";

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
      }
    ],
  },
]);

export default router;
