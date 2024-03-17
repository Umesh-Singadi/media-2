import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
/* eslint-disable react/prop-types */

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-2 border rounded m-5">
      <div className="flex p-2 justify-between items-center bg-gray-100 hover:bg-gray-200">
        <div className="flex flex-row items-center justify-between ">
          {header}
        </div>
        <div
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer hover:bg-gray-300 p-2 rounded-full"
        >
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
