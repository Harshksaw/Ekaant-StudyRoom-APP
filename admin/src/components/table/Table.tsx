import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
];

export function TableDemo() {
  return (
    <div className=" overflow-hidden">
      <Table className="rounded-full border  border-gray-100 ">
        <TableCaption>A list of your recent datas.</TableCaption>
        <TableHeader>
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

        <TableBody className="overflow-y-auto">
          {dummyData.map((data) => (
            <TableRow key={data.roomNo}>
              <TableCell className="font-medium">{data.roomNo}</TableCell>
              <TableCell>{data.ac}</TableCell>
              <TableCell>{data.seatingCapacity}</TableCell>
              <TableCell className="">{data.availableSeat}</TableCell>
              <TableCell className="">{data.status}</TableCell>
              <TableCell className="">{data.lastUploaded}</TableCell>

              <TableCell className=" text-center align-middle rounded-md ">
                <div className="bg-black text-white p-2 inline-block rounded-full text-xs">
                  {data.manage}
                </div>
                {/* {data.manage} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
