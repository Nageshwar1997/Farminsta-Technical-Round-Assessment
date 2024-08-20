import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import languagesList from "../helpers/languagesList";
import educationsList from "../helpers/educationsList";
import specializationsList from "../helpers/specializationsList";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Header = () => {
  // useLocation se current URL ka path aur search query ko fetch karte hain
  const { pathname, search } = useLocation();
  // Navigation ke liye navigate hook use karte hain
  const navigate = useNavigate();
  // URLSearchParams se search query ko parse karte hain
  const URLSearch = new URLSearchParams(search);

  // Search aur filter parameters ko get karte hain
  const searchQuery = URLSearch.get("q") || "";
  const languageQuery = URLSearch.get("language") || "";
  const educationQuery = URLSearch.get("education") || "";
  const specializationQuery = URLSearch.get("specialization") || "";

  // State hooks for search input aur filters
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedLanguage, setSelectedLanguage] = useState(languageQuery);
  const [selectedEducation, setSelectedEducation] = useState(educationQuery);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState(specializationQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
  const searchInputRef = useRef();
  const filterRef = useRef(); // Filter section ke liye ref

  // Jab search input ya filters change hote hain, URL ko update karte hain
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
      navigate("/");
    }
  }, [
    searchInput,
    selectedLanguage,
    selectedEducation,
    selectedSpecialization,
    navigate,
  ]);

  // Search input ke change ko handle karte hain
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter options ke change ko handle karte hain
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Search aur filters ko clear karne ka function
  const handleClearSearchAndFilter = () => {
    setSearchInput("");
    setSelectedLanguage("");
    setSelectedEducation("");
    setSelectedSpecialization("");
  };

  // Component mount hone par search input ko focus karte hain
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Window resize hone par screen size check karte hain
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Small screen hone par filters ko show ya hide karte hain
  useEffect(() => {
    if (isSmallScreen) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, [isSmallScreen]);

  // Filter section ke bahar click hone par filters ko hide karte hain
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full pt-2 h-16 z-10 shadow-md bg-gray-200 dark:bg-darkBackground dark:text-darkText flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Search Input Container */}
      <div className="w-full sm:w-1/2 flex items-center justify-between mb-2 sm:mb-0 sm:mr-5">
        <input
          type="text"
          ref={searchInputRef}
          value={pathname === "/search" && search ? searchInput : ""}
          onChange={handleSearchInput}
          disabled={
            pathname.includes("/view-creator-details") ||
            pathname.includes("/edit-creator")
          }
          placeholder="Search Creators..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-darkText rounded-md shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-darkText focus:outline-none focus:border-blue-500 dark:focus:border-blue-300 transition-colors duration-300 ease-in-out"
        />
        {showFilters ? (
          <button
            className="ml-2 p-2 sm:hidden rounded-full border border-gray-300 dark:border-darkText transition-colors duration-300 ease-in-out bg-gray-200 dark:bg-darkBackground text-gray-800 dark:text-darkText hover:bg-gray-300 dark:hover:bg-darkBackgroundDark focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            onClick={() => {
              setShowFilters(false);
            }}
          >
            <IoClose size={20} />
          </button>
        ) : (
          <button
            className="ml-2 p-2 sm:hidden rounded-full border border-gray-300 dark:border-darkText transition-colors duration-300 ease-in-out bg-gray-200 dark:bg-darkBackground text-gray-800 dark:text-darkText hover:bg-gray-300 dark:hover:bg-darkBackgroundDark focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            onClick={() => {
              setShowFilters(true);
            }}
          >
            <FaBars size={20} />
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div
        ref={filterRef} // Filter section ke liye ref
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
              disabled={
                pathname.includes("/view-creator-details") ||
                pathname.includes("/edit-creator")
              }
              className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 dark:border-darkText bg-slate-100 dark:bg-gray-700 dark:text-darkText shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out"
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
              disabled={
                pathname.includes("/view-creator-details") ||
                pathname.includes("/edit-creator")
              }
              onChange={handleFilterChange(setSelectedEducation)}
              className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 dark:border-darkText bg-slate-100 dark:bg-gray-700 dark:text-darkText shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out"
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
              disabled={
                pathname.includes("/view-creator-details") ||
                pathname.includes("/edit-creator")
              }
              className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 dark:border-darkText bg-slate-100 dark:bg-gray-700 dark:text-darkText shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out"
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
            {" "}
            {pathname === "/search" && search && (
              <button
                onClick={handleClearSearchAndFilter}
                className="min-w-[120px] w-full py-2 px-4 text-sm rounded-md text-center bg-blue-400 border border-blue-300 dark:border-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out truncate"
              >
                Clear
              </button>
            )}
            {pathname === "/" && (
              <Link
                to={"/add-creator"}
                className="min-w-[120px] w-full py-2 px-4 text-sm rounded-md text-center bg-blue-400 border border-blue-300 dark:border-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out truncate"
              >
                Add New
              </Link>
            )}
            {pathname === "/add-creator" && (
              <Link
                to={"/"}
                className="min-w-[120px] w-full py-2 px-4 text-sm rounded-md text-center bg-blue-400 border border-blue-300 dark:border-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out truncate"
              >
                Cancel
              </Link>
            )}
            {(pathname.includes("/view-creator-details") ||
              pathname.includes("/edit-creator")) && (
              <Link
                to={"/"}
                className="min-w-[120px] w-full py-2 px-4 text-sm rounded-md text-center bg-blue-400 border border-blue-300 dark:border-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-300 ease-in-out truncate"
              >
                Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
