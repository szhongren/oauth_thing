import { useEffect, useRef, useState } from "react";

export default function Dropdown({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        Download
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1 z-20">
            {item.exportLinks ? (
              Object.keys(item.exportLinks).map((key) => (
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  href={item.exportLinks[key] ?? "/#"}
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  key={item.id}
                >
                  {truncate(key.split("/")[1], 20)}
                </a>
              ))
            ) : (
              <a
                href={item.webContentLink ?? "/#"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                {truncate(item.mimeType?.split("/")[1] || "unknown", 20)}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}
