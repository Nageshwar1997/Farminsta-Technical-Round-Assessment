import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import languagesList from "../helpers/languagesList";
import educationsList from "../helpers/educationsList";
import specializationsList from "../helpers/specializationsList";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const URLSearch = new URLSearchParams(search);

  const searchQuery = URLSearch.get("q") || "";
  const languageQuery = URLSearch.get("language") || "";
  const educationQuery = URLSearch.get("education") || "";
  const specializationQuery = URLSearch.get("specialization") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedLanguage, setSelectedLanguage] = useState(languageQuery);
  const [selectedEducation, setSelectedEducation] = useState(educationQuery);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState(specializationQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
  const searchInputRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchInput) params.append("q", searchInput);
    if (selectedLanguage) params.append("language", selectedLanguage);
    if (selectedEducation) params.append("education", selectedEducation);
    if (selectedSpecialization)
      params.append("specialization", selectedSpecialization);

    const newUrl = `/search?${params.toString()}`;
    if (
      searchInput ||
      selectedLanguage ||
      selectedEducation ||
      selectedSpecialization
    ) {
      navigate(newUrl);
    } else {
      // Redirect to the home page if all filters are cleared
      navigate("/");
    }
  }, [
    searchInput,
    selectedLanguage,
    selectedEducation,
    selectedSpecialization,
    navigate,
  ]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleClearSearchAndFilter = () => {
    setSearchInput("");
    setSelectedLanguage("");
    setSelectedEducation("");
    setSelectedSpecialization("");
  };

  useEffect(() => {
    // Focus on the search input when the component mounts
    // if (searchInputRef.current) {
    //   searchInputRef.current.focus();
    // }
  }, []);

  console.log("pathname", pathname);
  console.log("search", search);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, [isSmallScreen]);
  return (
    <header className="fixed top-0 left-0 w-full pt-2 h-16 z-10 shadow-md bg-gray-200 dark:bg-darkBackground dark:text-darkText flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Search Input Container */}
      <div className="w-full sm:w-1/2 flex items-center justify-between mb-2 sm:mb-0 sm:mr-5">
        <input
          type="text"
          ref={searchInputRef}
          value={pathname === "/search" && search ? searchInput : ""}
          onChange={handleSearchInput}
          placeholder="Search Creators..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-darkText rounded-md shadow-md focus:outline-none focus:border-blue-500 dark:bg-whiteText dark:focus:border-blue-300 transition-colors duration-300"
        />
        <button
          className="ml-2 p-2 sm:hidden rounded-full border border-gray-300 dark:border-darkText transition-colors duration-300 ease-in-out bg-gray-200 dark:bg-darkBackground text-gray-800 dark:text-darkText hover:bg-gray-300 dark:hover:bg-darkBackgroundDark focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Filter Options */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          !isSmallScreen
            ? "block"
            : isSmallScreen && !showFilters
            ? "hidden"
            : ""
        } sm:block`}
      >
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between sm:items-start w-full max-w-5xl gap-2 sm:gap-4 mx-auto">
          {/* Language Filter */}
          <div className="w-full max-w-[250px] flex items-center justify-center">
            <select
              value={pathname === "/search" ? selectedLanguage : ""}
              onChange={handleFilterChange(setSelectedLanguage)}
              className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 dark:border-darkText bg-slate-100 dark:bg-whiteText dark:text-darkText shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300"
            >
              <option value="">Language</option>
              {languagesList &&
                languagesList.map((language) => (
                  <option key={language.id} value={language.value}>
                    {language.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Education Filter */}
          <div className="w-full max-w-[250px] flex items-center justify-center">
            <select
              value={pathname === "/search" ? selectedEducation : ""}
              onChange={handleFilterChange(setSelectedEducation)}
              className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 dark:border-darkText bg-slate-100 dark:bg-whiteText dark:text-darkText shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300"
            >
              <option value="">Education</option>
              {educationsList &&
                educationsList.map((education) => (
                  <option key={education.id} value={education.value}>
                    {education.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Specialization Filter */}
          <div className="w-full max-w-[250px] flex items-center justify-center">
            <select
              value={pathname === "/search" ? selectedSpecialization : ""}
              onChange={handleFilterChange(setSelectedSpecialization)}
              className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 dark:border-darkText bg-slate-100 dark:bg-whiteText dark:text-darkText shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300"
            >
              <option value="">Specialization</option>
              {specializationsList &&
                specializationsList.map((specialization) => (
                  <option key={specialization.id} value={specialization.value}>
                    {specialization.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Action Button */}
          <div className="w-full max-w-[250px] flex items-center justify-center">
            <button
              onClick={handleClearSearchAndFilter}
              className="w-full py-2 px-4 text-sm rounded-md bg-blue-400 border border-blue-300 dark:border-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
