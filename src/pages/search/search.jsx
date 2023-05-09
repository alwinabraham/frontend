import React, { useState } from "react";
import axios from "axios";
import NameComponent from "../mainPage/NameComponent";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/search`,{value:query});
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <form className="mb-4 w-full" onSubmit={handleSearch}>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="w-full py-3 pl-12 pr-4 dark:text-gray-800 border dark:border-gray-800 rounded-md outline-none dark:bg-gray-800 focus:bg-white focus:border-emerald-700"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {results.length > 0 && (
        <ul className="mt-2">
          {results.map((member) => (
            <>
            <div className="flex items-center">
                <img className="w-8 h-8 sm:w-10 sm:h-10 md:h-12 md:w-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full m-2 shadow-lg" src={member.imageName} />
                <div className="w-full p-3 bg-white rounded flex" key={member._id}>
                    <NameComponent userId={member._id}/>
                </div>
            </div>
            </>
          ))}
        </ul>
      )}
    </form>

  );
}