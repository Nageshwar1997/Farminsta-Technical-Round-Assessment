/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import CreatorCard from "../components/CreatorCard";
import toast from "react-hot-toast";

const SearchCreators = () => {
  const query = useLocation().search;
  const filters = query
    .split("=")
    .slice(1)
    .map((item) => item.split("&").splice(0, 1))
    .map((item) => {
      if (typeof item[0] === "string") {
        return item[0].includes("+")
          ? item[0].split("+").join(" ")
          : item.join("");
      } else {
        return item;
      }
    })
    .join(", ");
  const [searchCreators, setSearchCreators] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCreators = async () => {
    try {
      const response = await fetch(SummaryApi.getAllCreators.url, {
        method: SummaryApi.getAllCreators.method,
      });

      const responseData = await response.json();

      if (responseData.success) {
        setSearchCreators(responseData.creators);
      }

      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Something went wrong");
    }
  };
  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.searchCreators.url}${query}`, {
        method: SummaryApi.searchCreators.method,
      });
      const responseData = await response.json();
      setSearchCreators(responseData.creators);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    } else {
      fetchAllCreators();
    }
  }, [query]);

  return (
    <div className="container mx-auto p-3">
      {loading ? (
        <h1 className="text-center text-xl">Loading...</h1>
      ) : searchCreators.length === 0 ? (
        <h1 className="text-4xl text-center bg-white w-full p-4 font-bold">
          No Creators Found...
        </h1>
      ) : (
        <>
          <div className="w-full h-full px-10">
            {query && (
              <>
                <h1 className="text-xl text-left w-full p-1 font-semibold capitalize">
                  You are searching : {filters}
                </h1>
                <h1 className="text-xl text-left w-full p-1 mb-1 font-semibold">
                  Results found: {searchCreators.length}
                </h1>
              </>
            )}

            <div className="w-full h-full grid grid-cols-3 gap-5">
              {searchCreators.map((creator) => (
                <CreatorCard key={creator._id} creator={creator} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchCreators;
