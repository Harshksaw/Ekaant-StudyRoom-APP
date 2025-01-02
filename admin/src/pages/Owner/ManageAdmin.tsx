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
  _id: string;
  name: string;
  cardimage?: string;
  images?: string[];
  libraryOwner: LibraryOwner;
  address: Address;
  approved: boolean;
};

const ManageAdmin = () => {
  const navigate = useNavigate();
  const [library, setLibrary] = useState<Lib[]>([]);
  useEffect(() => {
    const func = async () => {
      const res = await axios.get(`${BASEURL}/api/v1/library/getLibrary`);
      if (res.data.success) {
        setLibrary(res?.data?.data);
      }
    };
    func();
  }, []);
  console.log(library, "------------------");
  return (
    <div className="p-3 bg-slate-300 h-full ">
      <div className="overflow-auto max-h-[calc(100vh-100px)]">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border-b">Library Card Image</th>
              <th className="py-2 px-4 border-b">Library Name</th>
              <th className="py-2 px-4 border-b">Owner Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Approved Status</th>
            </tr>
          </thead>

          <tbody className=" bg-gray-100">
            {library?.map((lib: Lib) => (
              <tr
                key={lib?.id}
                className="cursor-pointer hover:bg-gray-100 transition duration-300 justify-center text-center"
                onClick={() => navigate(`/admin/manage-rooms/${lib.id}`)}
              >
                <td className="py-2 px-4 border-b align-center ">
                  <img
                    src={lib.cardimage ? lib.cardimage : lib?.images?.[0]}
                    // alt={lib?.name}
                    className="h-36 w-52 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4 border-b">{lib?.name.split(" ")[0]}</td>
                <td className="py-2 px-4 border-b">
                  {lib?.libraryOwner?.username.split(" ")[0]}
                </td>
                <td className="py-2 px-4 border-b text-wrap">{`${lib?.address?.city}, ${lib.address?.state}`}</td>
                <td className="py-2 px-4 border-b">
                  {lib?.approved ? "Approved" : "Pending"}
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
