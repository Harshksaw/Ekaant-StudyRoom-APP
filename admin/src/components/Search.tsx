import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const Search = () => {
  const [search, setSearch] = React.useState("search");
  React.useEffect(() => {
    console.log(search);
    setSearch("search");
  }, [search]);

  return (
    <div>
      <div className="h-[60px] w-full border-b">
        <Navbar />
      </div>
      <div className="flex">
        <div className="basis-[15%] h-100vh">
          <Sidebar />
        </div>
        <div className="basis-[80%]">d</div>
      </div>
    </div>
  );
};

export default Search;
