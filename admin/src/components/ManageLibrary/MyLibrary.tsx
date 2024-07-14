import { getLibraryDataById } from "@/hooks/libraryData";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface LibraryItem {
  images: string[];
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  // Add other properties as needed

}
interface LibraryItem {
  // other properties
  approved?: boolean;
}
export function BadgeDestructive() {
  return (
    <Badge className="bg-red-600" variant="destructive">
      Destructive
    </Badge>
  );
}
export default function MyLibrary() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LibraryItem[]>([]);
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically fetch your data
    }, 2000); // 2 seconds delay
  };

  

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data in MYLIBRARY")
      const res = await getLibraryDataById();
      console.log(res.data, "res44");
      setData(res.data.data);
      // console.log(res.data.data);
    };
    fetchData();
  }, [isLoading]);

  // const location = getLocationName(item.location[0], item.location[1])

  return (
    <div className="flex flex-col gap-20 p-5 w-full h-full bg-gray-200 rounded-lg shadow-md">
      <div
        className="flex flex-col gap-5 w-full h-full
      "
      >

      {data.length === 0 && (
           <button
           className="bg-blue-200 text-white p-2 rounded-lg shadow-md hover:bg-blue-300 flex justify-center items-center h-20"
           onClick={handleRefresh}
           disabled={isLoading}
         >
           {isLoading ? <div className="loader"></div> : "Refresh"}
         </button>
      ) }
     

        {Array.isArray(data) &&
          data?.map((item: LibraryItem, index: number) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg shadow-md bg-white flex flex-row justify-between gap-5 items-center"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                width={200}
                height={200}
              />
              <div>
                <h3>{item.name}</h3>
                <p>{item?.longDescription.split("").slice(0, 50)}</p>
                <p>Pricing: {item.price}/month</p>
              </div>

              <div>
                <div>
                  <div>
                    <p></p>
                  </div>

                  {item?.approved ? (
                    <Badge className="bg-red-600" variant="destructive">
                      Approved
                    </Badge>
                  ) : (
                    <Badge className="bg-red-600" variant="destructive">
                      NotApproved
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
