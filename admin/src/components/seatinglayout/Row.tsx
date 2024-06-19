import React from 'react';
import Seat from './Seat';

const Row = ({ seats, onSelect }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> {/* Distribute seats evenly */}
    {seats.map((seat) => (
      <Seat key={seat.id} {...seat} onSelect={onSelect} /> // Pass all seat properties to Seat component
    ))}
  </div>
);

export default Row;
