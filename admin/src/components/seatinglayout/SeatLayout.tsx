import { useState } from "react";

const Seat = ({ seatData, isSelected, onSelect }: any) => {
  const handleClick = () => {
    onSelect(seatData);
  };

  return (
    <button
      className={`
        m-5 text-lg font-bold
        ${isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
        p-2 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      onClick={handleClick}
    >
      {seatData.label}
    </button>
  );
};
type SeatData = {
  id: string;
  label: string;
  // include other properties if there are any
};
interface SeatsProps {
  onSeatSelect: (seatData: SeatData[]) => void;
}
const Seats = ({ onSeatSelect }: SeatsProps) => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);

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
  const seatRows = []; // This will store rows of seats
  for (let row = 0; row < rows; row++) {
    const seatRow = []; // This will store each seat in the current row
    for (let col = 0; col < columns; col++) {
      const seatData = { id: `${row}-${col}`, label: `${row}-${col}` };
      const isSelected = selectedSeats.some((seat) => seat?.id === seatData.id);
      seatRow.push(
        <Seat
          key={`${row}-${col}`}
          seatData={seatData}
          isSelected={isSelected}
          onSelect={handleSelect}
        />
      );
    }
    seatRows.push(
      <div key={row} style={{ display: "flex", flexDirection: "row" }}>
        {seatRow}
      </div>
    );
  }

  const handleSave = () => {
    if (selectedSeats.length === 0) {
      console.log("No seats selected");
      return;
    }

    console.log("Selected Seats:");
    onSeatSelect(selectedSeats);
    console.log(selectedSeats);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setShowGrid(true); // Show the grid with the specified rows and columns
  };
  const matrixSize = 4;
  const matrix = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => null)
  );
  return (
    <div className="flex-col gap-10 mb-20">
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>

      <div
        className="seats-container 
        bg-blue-100
        
        flex flex-col justify-center items-center w-full h-full border border-gray-200 rounded-md p-4"
      >
        <div className="flex-col justify-center h-60">
          {seatRows.length === 0 && (

            <div>
            {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
            {row.map((_, colIndex) => (
            <div key={colIndex} className={`
              m-2 text-lg font-bold p-5 rounded-md bg-gray-400 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors duration-1500 ease-in-out bg-slide
            `}></div>
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
