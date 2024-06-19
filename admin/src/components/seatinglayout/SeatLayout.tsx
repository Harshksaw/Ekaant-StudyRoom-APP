import React, { useState, useEffect } from 'react';
import Row from './Row';

const SeatLayout = () => {
  const numRows = 5;
  const numCols = 5;

  const customLayout = [
    [true, false, true, false, true], // Row 1: Seats 1, 3, and 5 selected
    [false, true, false, true, false], // Row 2: Seats 2 and 4 selected
    [true, false, true, false, true], // Row 3: Seats 1, 3, and 5 selected
    [false, true, false, false, false], // Row 4: Only Seat 2 selected
    [true, false, false, false, true], // Row 5: Seats 1 and 5 selected
  ];

  const [seatData, setSeatData] = useState(
    Array(numRows)
    .fill(null)
    .map((_, rowIndex) =>
      Array(numCols)
        .fill(null)
        .map((_, colIndex) => ({ id: `${colIndex}-${rowIndex}`, selected: false }))
    )
  ); // Initialize 2D seat data with IDs and selection state

  useEffect(() => {
    // Create seat data with initial selection from customLayout
    setSeatData(
      customLayout.map((row, rowIndex) =>
        row.map((isSelected, colIndex) => ({ id: `${colIndex}-${rowIndex}`, selected: isSelected }))
      )
    );
  }, []); // Empty dependency array: Run only once on mount

  const handleSelect = (seatId, isSelected) => {
    setSeatData((prevData) =>
      prevData.map((row, rowIndex) => {
        return row.map((seat, colIndex) => {
          if (seat.id === seatId) {
            return { ...seat, selected: isSelected };
          }
          return seat;
        });
      })
    );
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {seatData.map((row, rowIndex) => (
        <Row
        key={rowIndex}
        rowData={row}
        onSelect={(seatId, isSelected) => handleSelect(seatId, isSelected)}
      />
      ))}
    </div>
  );
};

export default SeatLayout;
