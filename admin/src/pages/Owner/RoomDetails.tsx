import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';


interface RoomDetailsProps {
  roomData: any[];
  expandedRoom: string | null;
  toggleRoomExpansion: (roomId: string) => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ roomData, expandedRoom, toggleRoomExpansion }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleBookClick = (slot: any) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleModalSubmit = (date: string) => {
    // Call API to book the slot
    console.log('Booking slot:', selectedSlot, 'for date:', date);
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Room Details</h2>
      {roomData.length > 0 ? (
        roomData.map((roomDetail: any, index: React.Key | null | undefined) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleRoomExpansion(roomDetail._id)}
            >
              <p className="text-gray-600">Room No: {roomDetail.roomNo}</p>
              {expandedRoom === roomDetail._id ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expandedRoom === roomDetail._id && (
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-4">
                  {roomDetail.seats.map((seat: any, seatIndex: React.Key | null | undefined) => (
                    <div key={seatIndex} className="border p-2 rounded-lg border-blue-500 border-dashed">
                      <p className="text-gray-600 mb-2 text-2xl text-center">SeatId: {seat.seatId} | SeatLabel: {seat.seatLabel}</p>
                      {seat.timeSlots.map((slot: any, slotIndex: React.Key | null | undefined) => (
                        <div key={slotIndex} className="ml-4 mb-2 border p-2 rounded-lg border-gray-300 text-left flex   flex-col  ">
                          <p className="text-gray-600 text-left ">Time Slot: {slot.from} - {slot.to}</p>
                          <p className="text-gray-600 text-left">Booked: {slot.booked ? "Yes" : "No"}</p>
                          {slot.booked && (
                            <p className="text-gray-600">
                              Booking End Date: {new Date(slot.bookingEndDate!).toLocaleDateString()}
                            </p>
                          )}
                          {!slot.booked && (
                            <button
                              onClick={() => handleBookClick(slot)}
                              className="px-4 py-2 bg-green-500 text-white rounded mt-4 w-32 text-center mx-auto "
                            >
                              Book
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No room details available.</p>
      )}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default RoomDetails;



const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Book Time Slot</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(date)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

