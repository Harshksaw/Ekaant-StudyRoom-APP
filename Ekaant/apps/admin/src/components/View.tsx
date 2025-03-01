//to see approved libraries 
// @ts-ignore
import { getApprovedLibraries } from "@/hooks/libraryData";

import { useEffect } from "react";

const View = () => {

  // const [data, setData] = useState([]);

  useEffect(()=>{

    const getLibraries = async () => {

      // const res = await getApprovedLibraries();
      // console.log(res.data, "res44");
      // setData(res.data.data);
    }

    getLibraries();
  },[])

  return (

    <div>
      libraries
    </div>
  )
};

export default View;
