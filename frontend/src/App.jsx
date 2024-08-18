/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Context from "./context";
import { useDispatch } from "react-redux";
import SummaryApi from "./common";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setCreatorsDetails, setCurrentCreator } from "./store/creatorReducer";
function App() {
  const dispatch = useDispatch();

  const fetchAllCreators = async () => {
    try {
      const response = await fetch(SummaryApi.getAllCreators.url, {
        method: SummaryApi.getAllCreators.method,
      });
      const responseData = await response.json();

      if (responseData.success) {
        dispatch(setCreatorsDetails(responseData.creators));
      }

      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchCurrentCreator = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.getCreator.url}/${id}`, {
        method: SummaryApi.getCreator.method,
      });

      const responseData = await response.json();

      if (responseData.success) {
        dispatch(setCurrentCreator(responseData.creator));
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllCreators();
  }, []);
  return (
    <Context.Provider value={{ fetchAllCreators, fetchCurrentCreator }}>
      <div className="w-full h-[100vh] max-h-screen">
        <Header />
        <main className="pt-20 bg-slate-200 w-full h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;
