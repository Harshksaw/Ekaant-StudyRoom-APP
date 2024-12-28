import { getLibraryDataById } from "@/hooks/libraryData";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface LibraryItem {
  images: string[];
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  _id: string;
  // Add other properties as needed

}
interface LibraryItem {
  // other properties
  approved?: boolean;
  id: string;
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

  const navigate = useNavigate();
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
              className="border-1 border-gray-400 p-4 rounded-lg shadow-md bg-gray-50 flex flex-row justify-between gap-5 items-center"
              onClick={()=> navigate(`/manage-library/edit-library/${item?.id}`)}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                width={200}
                height={200}
              />
          <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '12px 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <h3 style={{ color: '#333', marginBottom: '8px' }}>{item.name}</h3>
    <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>
        {item?.longDescription.split("").slice(0, 50).join("")}...
    </p>
    <p style={{ fontWeight: 'bold', marginTop: '8px' }}>
        Pricing: <span style={{ color: '#007bff' }}>{item.price}</span>/month
    </p>
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
