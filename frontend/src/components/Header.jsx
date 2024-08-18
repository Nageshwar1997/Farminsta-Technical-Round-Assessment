import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-10 shadow-md bg-gray-200 flex justify-between items-center px-10">
      <div className="w-1/2 h-12 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Creators..."
          className="w-full h-full px-3 border shadow-md border-gray-300 rounded-md focus-within:outline-none focus-within:border-blue-500"
        />
      </div>
      <div className="flex justify-between items-center w-full h-full ml-10">
        <div className="max-w-[200px] w-full h-full flex items-center justify-center">
          <select className="w-full p-3 rounded-md bg-slate-100 shadow-md">
            <option value="">Select Language</option>
          </select>
        </div>
        <div className="max-w-[200px] w-full h-full flex items-center justify-center">
          <select className="w-full p-3 rounded-md bg-slate-100 shadow-md">
            <option value="">Select Education</option>
          </select>
        </div>
        <div className="max-w-[200px] w-full h-full flex items-center justify-center">
          <select className="w-full p-3 rounded-md bg-slate-100 shadow-md">
            <option value="">Select Specialization</option>
          </select>
        </div>

        <div className="max-w-[120px] w-full h-full flex items-center justify-center">
          {pathname === "/add-creator" ? (
            <Link
              to="/"
              className="w-full p-3 text-center rounded-md bg-blue-400 hover:bg-blue-600 shadow-lg"
            >
              Home
            </Link>
          ) : (
            <Link
              to="/add-creator"
              className="w-full p-3 text-center rounded-md bg-blue-400 hover:bg-blue-600 shadow-lg"
            >
              Add Creator
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
