import { useState } from "react";
import { MdEventSeat } from "react-icons/md";
const Seat = ({ seatData, isSelected, onSelect, onRotate,onNameChange, style }: any) => {
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
        style={isSelected ? style : null}
        className={`

        w-20
        m-5 text-md font-bold
        ${isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
        p-2 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        justify-center items-center
      `}
        onClick={handleClick}
      >
        <MdEventSeat size={32} className="m-auto" />

    

      </button>
          <div className="w-16 ">

      {isSelected && (
        <input
        type="text"
        value={seatData.seatName}
        onChange={handleNameChange}
        className="seat-name-input"
        />
      )}
      </div>
      <button
        onClick={handleRotateClick}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Rotate
      </button>
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
  seatLayout: any;
}
const Seats = ({ onSeatSelect ,seatLayout }: SeatsProps) => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  // const [showGrid, setShowGrid] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);
  const [rotationAngles, setRotationAngles] = useState<{
    [key: string]: number;
  }>({});
  const [seatNames, setSeatNames] = useState<{[key: string]: string }>({});
  console.log("🚀 ~ Seats ~ seatName:", seatLayout)

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
      [seatId]: newName,
    }));
  };

  const seatRows = []; // This will store rows of seats

  let seatNumber = 1;
  for (let row = 0; row < rows; row++) {
    const seatRow = []; // This will store each seat in the current row
    for (let col = 0; col < columns; col++) {
      const seatId = `${row}-${col}`;
      const seatName = seatNames[seatId] || `${seatNumber}`;
      const seatData = { id: `${row}-${col}`, label:`${seatNumber}`, seatName };
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
      console.log("No seats selected");
      return;
    }
    const seatLayoutData = {
      rows,
      columns,
      selectedSeats,
      rotationAngles,
      seatNames,
    };
    console.log("Seat Layout Data:", seatLayoutData);


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
    <div className="flex-col gap-10 mb-20  h-[90%]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full max-w-md mx-auto my-8 border-2 border-gray-300 rounded-lg p-6 shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Create Seating Layout</h2>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="rows"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Rows:
            </label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value))}
              placeholder="Rows"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="columns"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Columns:
            </label>
            <input
              type="number"
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value))}
              placeholder="Columns"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-70570 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>

      <div>
        <p className="text-lg font-bold text-center text-red-500">
          Above 5 columns , is not recommended as wont fit on Mobile screen
          properly
        </p>
      </div>
      <div
        className="seats-container 
        bg-blue-100
        
        flex flex-col justify-center items-center w-full h-full border border-gray-200 rounded-md p-4"
      >
        <div
          className="flex-col justify-center px-auto h-auto max-h-[60vh]
         w-auto max-w-[60vw] pb-20  px-10 pr-10 overflow-auto 
         border border-gray-800   "
        >
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
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {seatRows}
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Selected Seats
        </button>
      </div>
    </div>
  );
};

export default Seats;
