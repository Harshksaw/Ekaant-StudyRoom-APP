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
      <div className="basis-[80%]">d</div>
    </div>
  );
};

export default Search;
