
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { FaRegSun } from "react-icons/fa";

const ManageBookings = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="flex-row ">

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Manage Bookings</AccordionTrigger>
            <AccordionContent>

              
              <Link
                to="/manage-booking/view"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                View
              </Link>
            </AccordionContent>
    
            <AccordionContent>
              <Link
                to="/manage-booking/adminbookings"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
               Book Seat
              </Link>
            </AccordionContent>
    
            <AccordionContent>
              <Link
                to="/manage-booking/OfflineBooking"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
              Offline Booking
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
      </div>
      {/* 
      {isOpen && (
        <div
          className="origin-top-right absolute right--1 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          // tabIndex={1}
        >
          <div className="py-1" role="none">
            <Link
              to="/view"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              // tabIndex={-1}
              id="menu-item-0"
              onClick={() => setIsOpen(false)}
            >
              View
            </Link>
            <Link
              to="/permission"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              // tabIndex={-1}
              id="menu-item-1"
              onClick={() => setIsOpen(false)}
            >
              permission
            </Link>
            <Link
              to="/search"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              // tabIndex={-1}
              id="menu-item-1"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
          </div>
        </div> 
      )}
        */}
    </div>
  );
};

export default ManageBookings;
