import React, { useState } from 'react';

const Seat = ({ id, selected, onSelect }) => {
  const [isSelectedLocal, setIsSelectedLocal] = useState(selected); // Maintain local state for better control

  const handleClick = () => {
    setIsSelectedLocal(!isSelectedLocal);
    onSelect(id, !isSelectedLocal); // Pass seat ID and new selection state
  };

  return (
    <button
      style={{
        backgroundColor: isSelectedLocal ? 'blue' : 'white',
        border: '1px solid black',
        margin: 5,
        padding: 10,
        width: 50,
        height: 50,
      }}
      onClick={handleClick}
    >
      {id}
    </button>
  );
};

export default Seat;
