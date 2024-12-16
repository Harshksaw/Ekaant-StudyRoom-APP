import React from 'react';
import { FaDoorOpen } from "react-icons/fa";

interface DoorLayoutProps {
  doorPositions: number[];
  onSelectPosition: (index: number) => void;
}

const DoorLayout: React.FC<DoorLayoutProps> = ({ doorPositions, onSelectPosition }) => {
  const handlePositionClick = (index: number) => {
    onSelectPosition(index);
  };

  return (
    <div className="door-layout flex space-x-4">
      {doorPositions.map((position, index) => (
        <button
          key={index}
          className={`door-position p-4 rounded-md ${position === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handlePositionClick(index)}
        >
          <FaDoorOpen className="inline-block mr-2" />
          {position === 1 ? 'Door' : 'No Door'}
        </button>
      ))}
    </div>
  );
};

export default DoorLayout;