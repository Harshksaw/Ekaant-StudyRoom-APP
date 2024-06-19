import React, { useState } from 'react';

const Seat = ({ seatData, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(seatData);
  };

  return (
    <button
      className={`
        seat
        ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
        p-2 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      onClick={handleClick}
    >
      {seatData.label}
    </button>
  );
};

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (seatData) => {
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

  const seats = [];
  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 5; col++) {
      const seatData = { id: `${row}-${col}`, label: `${row}-${col}` };
      const isSelected = selectedSeats.some(
        (seat) => seat.id === seatData.id
      );
      seats.push(
        <Seat
          key={`${row}-${col}`}
          seatData={seatData}
          isSelected={isSelected}
          onSelect={handleSelect}
        />
      );
    }
  }

  const handleSave = () => {
    if (selectedSeats.length === 0) {
      console.log('No seats selected');
      return;
    }

    console.log('Selected Seats:');
    console.log(selectedSeats); // This stores the final data
  };

  return (
    <div className="seats-container 
    
    flex flex-col justify-center items-center w-full h-full border border-gray-200 rounded-md p-4">
      <div className="grid grid-cols-5 gap-2">
        {seats}
      </div>
      <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Save Selected Seats
      </button>
    </div>
  );
};

export default Seats;
