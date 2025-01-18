import { useState } from "react";
import { RiArmchairLine } from "react-icons/ri";
import { MdRotateLeft } from "react-icons/md";
import { HiOutlineSave } from "react-icons/hi";
import Desk from "../Desk";
import { CiDesktop } from "react-icons/ci";
const Seat = ({
  seatData,
  isSelected,
  onSelect,
  onRotate,
  onNameChange,
  style,
}: any) => {
  const handleClick = () => {
    onSelect(seatData);
  };
  const handleRotateClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the seat selection when rotating
    onRotate(seatData);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(seatData.id, e.target.value);
  };

  return (
    <div className="flex flex-col items-center rounded-full">
      <button
        className={`
        mx-5 mt-5 w-28
        p-3 text-md font-bold
        transition-all
        ${isSelected ? "bg-blue-200 text-blue-600" : "bg-white text-gray-800"}
        p-2 rounded-md hover:bg-blue-200 
      `}
        onClick={handleClick}
      >
        <div style={isSelected ? style : null} >
         <div className="m-auto">
          <Desk/>
         </div>

         
        </div>
      </button>
      {isSelected && (
        <div className="flex items-center justify-center w-28 h-7 mt-1 gap-3">
          <input
            type="text"
            value={seatData.seatName}
            onChange={handleNameChange}
            className="!rounded outline-none border border-black w-16 h-full"
          />

          <button
            onClick={handleRotateClick}
            className="bg-blue-400 rounded w-16 h-full justify-center items-center text-center flex"
          >
            <MdRotateLeft />
          </button>
        </div>
      )}
    </div>
  );
};
type SeatData = {
  id: string;
  label: string;
};
interface SeatLayoutData {
  rows: number;
  columns: number;
  selectedSeats: SeatData[];
  rotationAngles: { [key: string]: number };
}
interface SeatsProps {
  onSeatSelect: (seatLayoutData: SeatLayoutData) => void;
  seatLayout?: any;
}
const Seats = ({ onSeatSelect, seatLayout }: SeatsProps) => {
  const [rows, setRows] = useState<string>("");
  const [columns, setColumns] = useState<string>("");
  // const [showGrid, setShowGrid] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);
  const [rotationAngles, setRotationAngles] = useState<{
    [key: string]: number;
  }>({});
  const [seatNames, setSeatNames] = useState<{ [key: string]: string }>({});
  console.log("🚀 ~ Seats ~ seatName:", seatLayout);

  const handleRotate = (seatData: SeatData) => {
    const seatKey = seatData.id;
    setRotationAngles((prevAngles) => ({
      ...prevAngles,
      [seatKey]: (prevAngles[seatKey] || 0) + 45,
    }));
  };

  const handleSelect = (seatData: SeatData) => {
    const newSelectedSeats = [...selectedSeats];
    const seatIndex = newSelectedSeats.findIndex(
      (seat) => seat.id === seatData.id
    );

    if (seatIndex !== -1) {
      // Deselect the seat if it's already selected
      newSelectedSeats.splice(seatIndex, 1);
    } else {
      // Select the seat if it's not already selected
      newSelectedSeats.push(seatData);
    }

    setSelectedSeats(newSelectedSeats);
  };

  const handleSeatNameChange = (seatId: string, newName: string) => {
    setSeatNames((prevNames) => ({
      ...prevNames,
      [seatId]: newName ?? "",
    }));
  };

  const seatRows = []; // This will store rows of seats

  let seatNumber = 1;
  for (let row = 0; row < +rows; row++) {
    const seatRow = []; // This will store each seat in the current row
    for (let col = 0; col < +columns; col++) {
      const seatId = `${row}-${col}`;
      const seatName = seatNames[seatId] || `${seatNumber}`;
      const seatData = {
        id: `${row}-${col}`,
        label: `${seatNumber}`,
        seatName,
      };
      const isSelected = selectedSeats.some((seat) => seat?.id === seatData.id);
      const rotationAngle = rotationAngles[seatData.id] || 0;
      seatRow.push(
        <Seat
          key={`${row}-${col}`}
          seatId={seatId}
          seatData={seatData}
          isSelected={isSelected}
          onSelect={handleSelect}
          onRotate={handleRotate}
          onNameChange={handleSeatNameChange}
          style={{
            transform: `rotate(${rotationAngle}deg)`,
          }}
        />
      );
      seatNumber++;
    }
    seatRows.push(
      <div key={row} style={{ display: "flex", flexDirection: "row" }}>
        {seatRow}
      </div>
    );
  }

  // interface SeatsProps {
  //   onSeatSelect: (seatLayoutData: SeatLayoutData) => void;
  // }

  const handleSave = () => {
    if (selectedSeats.length === 0) {
      return;
    }
    const seatLayoutData = {
      rows,
      columns,
      selectedSeats,
      rotationAngles,
      seatNames,
    };

    onSeatSelect(seatLayoutData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page
    // setShowGrid(true); // Show the grid with the specified rows and columns
  };
  const matrixSize = 4;
  const matrix = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => null)
  );
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full mt-8">
        <h2 className="text-xl font-semibold mb-4">Create Seating Layout</h2>

        <div className="flex flex-wrap -mx-3 mb-6 gap-[3rem] items-end ml-5">
          <div className="w-full md:w-1/3">
            <label
              htmlFor="rows"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Rows:
            </label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              placeholder="Rows"
              className="block !rounded w-full text-gray-700 border border-gray-500 py-3 px-4 leading-tight focus:outline-none focus:bg-white "
            />
          </div>
          <div className="w-full md:w-1/3">
            <label
              htmlFor="columns"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Columns:
            </label>
            <input
              type="number"
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              placeholder="Columns"
              className="block !rounded w-full text-gray-700 border border-gray-500 py-3 px-4 leading-tight focus:outline-none focus:bg-white "
            />
          </div>
          {/* <button
            disabled={!rows || !columns}
            type="submit"
            className="bg-blue-500  hover:bg-blue-70570 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button> */}
        </div>
      </form>
      {rows && columns && (
        <div className="seats-container overflow-auto h-[100vh] w-full relative">
          <div>
            {seatRows.length === 0 && (
              <div>
                {matrix.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className={`
                    
              m-4 text-lg font-bold p-10   rounded-md bg-gray-400 hover:bg-blue-900 focus:outline-none
               focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors duration-1500 ease-in-out bg-slide
            `}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {seatRows}
          </div>

          <button
            disabled={!selectedSeats.length}
            onClick={handleSave}
            className={`mt-4 bg-blue-500 flex items-center gap-4 rounded text-white px-4 py-2
              disabled:cursor-not-allowed disabled:opacity-80
              `}
          >
            <HiOutlineSave /> Save Seats
          </button>
        </div>
      )}
    </div>
  );
};

export default Seats;
