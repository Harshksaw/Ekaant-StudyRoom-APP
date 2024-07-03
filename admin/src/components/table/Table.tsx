import {
  // @ts-ignore
  Table,
  TableBody,

  TableCell,
 
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dummyData = [
  {
    roomNo: "101",
    ac: "Yes",
    seatingCapacity: "50",
    availableSeat: "20",
    status: "Available",
    lastUploaded: "2023-04-01",
    manage: "Manage",
  },
  {
    roomNo: "102",
    ac: "No",
    seatingCapacity: "40",
    availableSeat: "5",
    status: "Full",
    lastUploaded: "2023-04-02",
    manage: "Manage",
  },
  {
    roomNo: "103",
    ac: "Yes",
    seatingCapacity: "60",
    availableSeat: "30",
    status: "Available",
    lastUploaded: "2023-04-03",
    manage: "Manage",
  },
  {
    roomNo: "104",
    ac: "No",
    seatingCapacity: "30",
    availableSeat: "0",
    status: "Full",
    lastUploaded: "2023-04-04",
    manage: "Manage",
  },
  {
    roomNo: "107",
    ac: "Yes",
    seatingCapacity: "80",
    availableSeat: "60",
    status: "Available",
    lastUploaded: "2023-04-07",
    manage: "Manage",
  },
  {
    roomNo: "108",
    ac: "No",
    seatingCapacity: "50",
    availableSeat: "0",
    status: "Full",
    lastUploaded: "2023-04-08",
    manage: "Manage",
  },
  {
    roomNo: "109",
    ac: "Yes",
    seatingCapacity: "90",
    availableSeat: "70",
    status: "Available",
    lastUploaded: "2023-04-09",
    manage: "Manage",
  },
  {
    roomNo: "110",
    ac: "No",
    seatingCapacity: "40",
    availableSeat: "20",
    status: "Available",
    lastUploaded: "2023-04-10",
    manage: "Manage",
  },
  {
    roomNo: "111",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
  {
    roomNo: "113",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
  {
    roomNo: "114",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
  {
    roomNo: "115",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
  {
    roomNo: "161",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
  {
    roomNo: "151",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
  {
    roomNo: "141",
    ac: "Yes",
    seatingCapacity: "100",
    availableSeat: "80",
    status: "Available",
    lastUploaded: "2023-04-11",
    manage: "Manage",
  },
];

export function TableRooms() {
  return (
    <div className="   max-h-[500px] overflow-y-scroll block ">
      <Table className="rounded-full border  border-gray-100  ">
        {/* <TableCaption>A list of your recent datas.</TableCaption> */}
        <TableHeader
        style={{
          backgroundColor: "red",
          color: "#6b7280",

          borderBottom: "1px solid #d1d5db",
        
        }}
        >
          <TableRow>
            <TableHead className="w-[100px]">ROOM NO</TableHead>
            <TableHead>AC</TableHead>
            <TableHead>SEATING CAPACITY</TableHead>
            <TableHead>AVAILABLE SEAT</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>LAST UPLOADED</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>


 
        <TableBody  >


        {dummyData.map((data, index) => (
          <TableRow key={data.roomNo || index}>
            <TableCell className="font-medium">{data.roomNo}</TableCell>
            <TableCell>{data.ac}</TableCell>
            <TableCell>{data.seatingCapacity}</TableCell>
            <TableCell>{data.availableSeat}</TableCell>
            <TableCell>{data.status}</TableCell>
            <TableCell>{data.lastUploaded}</TableCell>
            <TableCell className="text-center align-middle rounded-md">
              <div className="bg-black text-white p-2 inline-block rounded-full text-xs">
                {data.manage}
              </div>
            </TableCell>
          </TableRow>
        ))}


      </TableBody>


     
      </Table>
    </div>
  );
}
