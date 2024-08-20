import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import languagesList from "../helpers/languagesList";
import educationsList from "../helpers/educationsList";
import specializationsList from "../helpers/specializationsList";

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
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-10 shadow-md bg-gray-200 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 dark:bg-darkBackground dark:text-darkText">
      {/* Search Input Container */}
      <div className="w-full sm:w-1/2 h-12 flex items-center justify-center mb-2 sm:mb-0 sm:mr-5">
        <input
          type="text"
          ref={searchInputRef}
          value={pathname === "/search" && search ? searchInput : ""}
          onChange={handleSearchInput}
          placeholder="Search Creators..."
          className="w-full h-full px-3 base:py-2 sm:py-0  border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500 dark:bg-whiteText dark:border-darkText"
        />
      </div>

      {/* Filter Options */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between sm:items-start w-full max-w-5xl gap-2 sm:gap-4 mx-auto">
          {/* Language Filter */}
          <div className="w-full max-w-[200px] flex items-center justify-center">
            <select
              value={pathname === "/search" ? selectedLanguage : ""}
              onChange={handleFilterChange(setSelectedLanguage)}
              className="w-full p-2 text-sm rounded-md bg-slate-100 shadow-md dark:bg-gray-800 sm:h-12 dark:text-darkText dark:border-darkText"
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
          <div className="w-full max-w-[200px] flex items-center justify-center">
            <select
              value={pathname === "/search" ? selectedEducation : ""}
              onChange={handleFilterChange(setSelectedEducation)}
              className="w-full p-2 text-sm rounded-md bg-slate-100 shadow-md dark:bg-gray-800 sm:h-12 dark:text-darkText dark:border-darkText"
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
          <div className="w-full max-w-[200px] flex items-center justify-center">
            <select
              value={pathname === "/search" ? selectedSpecialization : ""}
              onChange={handleFilterChange(setSelectedSpecialization)}
              className="w-full p-2 text-sm rounded-md bg-slate-100 shadow-md dark:bg-gray-800 sm:h-12 dark:text-darkText dark:border-darkText"
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
          <div className="w-full max-w-[200px] flex items-center justify-center">
            <button
              onClick={handleClearSearchAndFilter}
              className="w-full p-2 text-sm text-center rounded-md bg-blue-400 hover:bg-blue-600 sm:h-12 shadow-lg dark:bg-blue-500 dark:hover:bg-blue-700"
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
