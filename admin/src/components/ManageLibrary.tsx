import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
const ManageLibrary = () => {
  return (
    <div>
      {" "}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Manage Library</AccordionTrigger>
          <AccordionContent>
            <Link
              to="/manage-library/create-library"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Create Library
            </Link>
            <Link
              to="/manage-library/my-library"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            >
              My Libraries
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ManageLibrary;
