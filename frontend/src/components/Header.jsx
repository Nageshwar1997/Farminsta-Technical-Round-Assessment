import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import languagesList from "../helpers/languagesList";
import educationsList from "../helpers/educationsList";
import specializationsList from "../helpers/specializationsList";

const Header = () => {
  const searchInputRef = useRef();
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

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchInput) params.append("q", searchInput);
    if (selectedLanguage) params.append("language", selectedLanguage);
    if (selectedEducation) params.append("education", selectedEducation);
    if (selectedSpecialization)
      params.append("specialization", selectedSpecialization);

    const newUrl = `/search?${params.toString()}`;
    navigate(newUrl);
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
    navigate("/search");
  };

  useEffect(() => {
    // if (searchInputRef.current) {
    //   searchInputRef.current.focus();
    // }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-10 shadow-md bg-gray-200 flex justify-between items-center px-10">
      <div className="w-1/2 h-12 flex items-center justify-center">
        <input
          type="text"
          ref={searchInputRef}
          value={pathname === "/search" && search ? searchInput : ""}
          onChange={handleSearchInput}
          placeholder="Search Creators..."
          className="w-full h-full px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
        />
      </div>
      <div className="flex justify-between items-center w-full h-full ml-10">
        <div className="max-w-[200px] w-full h-full flex items-center justify-center">
          <select
            value={pathname === "/search" ? selectedLanguage : ""}
            onChange={handleFilterChange(setSelectedLanguage)}
            className="w-full p-3 rounded-md bg-slate-100 shadow-md"
          >
            <option value="">Select Language</option>
            {languagesList &&
              languagesList.map((language) => (
                <option key={language.id} value={language.value}>
                  {language.name}
                </option>
              ))}
          </select>
        </div>
        <div className="max-w-[200px] w-full h-full flex items-center justify-center">
          <select
            value={pathname === "/search" ? selectedEducation : ""}
            onChange={handleFilterChange(setSelectedEducation)}
            className="w-full p-3 rounded-md bg-slate-100 shadow-md"
          >
            <option value="">Select Education</option>
            {educationsList &&
              educationsList.map((education) => (
                <option key={education.id} value={education.value}>
                  {education.name}
                </option>
              ))}
          </select>
        </div>
        <div className="max-w-[200px] w-full h-full flex items-center justify-center">
          <select
            value={pathname === "/search" ? selectedSpecialization : ""}
            onChange={handleFilterChange(setSelectedSpecialization)}
            className="w-full p-3 rounded-md bg-slate-100 shadow-md"
          >
            <option value="">Select Specialization</option>
            {specializationsList &&
              specializationsList.map((specialization) => (
                <option key={specialization.id} value={specialization.value}>
                  {specialization.name}
                </option>
              ))}
          </select>
        </div>

        <div className="max-w-[120px] w-full h-full flex items-center justify-center">
          {/* {pathname === "/search" && !search ? (
            <Link
              to="/add-creator"
              className="w-full p-3 text-center rounded-md bg-blue-400 hover:bg-blue-600 shadow-lg"
            >
              Add Creator
            </Link>
          ) : pathname === "/search" && search ? (
            <button
              className="w-full p-3 text-center rounded-md bg-blue-400 hover:bg-blue-600 shadow-lg"
              onClick={() => handleClearSearchAndFilter()}
            >
              Clear Filters
            </button>
          ) : (
            <Link
              to="/"
              className="w-full p-3 text-center rounded-md bg-blue-400 hover:bg-blue-600 shadow-lg"
            >
              Home
            </Link>
          )} */}
          <button
            className="w-full p-3 text-center rounded-md bg-blue-400 hover:bg-blue-600 shadow-lg"
            // onClick={() => handleClearSearchAndFilter()}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
