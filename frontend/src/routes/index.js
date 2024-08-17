import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddCreator from "../pages/AddCreator";

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
    ],
  },
]);

export default router;
