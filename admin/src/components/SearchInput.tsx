

const SearchInput = () => {
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search"
        className="w-80 h-8 border-2 border-gray-200 rounded-full"
      /> */}
      <div className="w-[400px] mt-1">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M4 10a6 6 0 1112 0 6 6 0 01-12 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
