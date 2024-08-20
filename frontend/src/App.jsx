/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Context from "./context";
import { useDispatch } from "react-redux";
import SummaryApi from "./common";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { setCreatorsDetails, setCurrentCreator } from "./store/creatorReducer";
import { ThemeContext } from "./context/theme.context";
import { FaSun, FaMoon } from "react-icons/fa";
function App() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);

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
      <div className="w-full h-full min-h-screen max-h-screen overflow-scroll scrollbar-none bg-slate-200">
        <Header />
        <main className="pt-16 base:pt-16 sm:pt-16 md:pt-20 lg:pt-24 w-full h-full dark:bg-darkBackground dark:text-darkText">
          <Outlet />
          <button
            onClick={toggleTheme}
            className={`fixed bottom-4 right-4 p-3 transition-transform duration-300 ease-in-out rounded-full shadow-2xl transform ${
              theme === "white"
                ? "bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-600"
                : "bg-slate-200 text-black hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            } z-50 focus:outline-none`}
          >
            {theme === "white" ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;
