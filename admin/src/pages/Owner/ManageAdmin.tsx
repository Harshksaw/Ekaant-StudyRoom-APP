import { useState, useEffect } from "react";
import { BASEURL } from "../../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type LibraryOwner = {
  username: string;
  email: string;
  phoneNumber: string;
};

type Address = {
  city: string;
  state: string;
};

type Lib = {
  id: string;
  name: string;
  cardimage?: string;
  images?: string[];
  libraryOwner: LibraryOwner;
  address: Address;
  approved: boolean;
};

const ManageAdmin = () => {
  const navigate = useNavigate();
  const [libraries, setLibraries] = useState<Lib[]>([]);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/v1/library/getLibrary`);
        if (res.data.success) {
          setLibraries(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching libraries:", error);
      }
    };
    fetchLibraries();
  }, []);

  return (

    <div className="p-3 bg-slate-300 min-h-screen">
      <div className="overflow-auto max-h-[calc(100vh-100px)]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white text-sm md:text-base w-full">
                <th className="py-3 px-6 border w-5/12">Library Card Image</th>
                <th className="py-3 px-6 border w-2/12">Library Name</th>
                <th className="py-3 px-6 border w-1/12">Owner Name</th>
                <th className="py-3 px-6 border w-2/12">Location</th>
                <th className="py-3 px-6 border w-2/12">Approved Status</th>
            </tr>
          </thead>

          <tbody className="bg-gray-100 text-sm md:text-base">
            {libraries.map((lib) => (
              <tr
                key={lib._id}
                className="cursor-pointer hover:bg-gray-200 transition duration-300 text-center"
                onClick={() => navigate(`/admin/manage-rooms/${lib.id}`)}
              >
                <td className="py-3 px-2 border flex justify-center items-center">
                  <img
                    src={lib.cardimage || lib.images?.[0] || "https://via.placeholder.com/300"}
                    alt={lib.name}
                    className="h-32 w-full object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-6 border">{lib.name}</td>
                <td className="py-3 px-6 border">{lib.libraryOwner.username.split(" ")[0]}</td>
                <td className="py-3 px-6 border text-wrap">{`${lib.address.city}, ${lib.address.state}`}</td>
                <td className="py-3 px-6 border">
                  <span className={`px-3 py-1 rounded-md text-white text-sm ${lib.approved ? "bg-green-500" : "bg-red-500"}`}>
                    {lib.approved ? "Approved" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdmin;
