import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder?: string;
  multiSelect?: boolean;
  enableFilter?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  placeholder = "Select...",
  multiSelect = false,
  enableFilter = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option): void => {
    if (multiSelect) {
      const isAlreadySelected = selectedOptions.some(
        (selected) => selected.value === option.value
      );
      if (!isAlreadySelected) {
        setSelectedOptions((prevSelected) => [...prevSelected, option]);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  const deleteOption = (
    option: Option,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    e.stopPropagation(); // Prevent the dropdown from toggling
    setSelectedOptions(
      selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      )
    );
  };

  const filteredOptions = options.filter((option) => {
    const isOptionSelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );
    return (
      option.label.toLowerCase().includes(filterText.toLowerCase()) &&
      (!multiSelect || !isOptionSelected)
    );
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (wrapperRef.current && isOpen) {
      wrapperRef.current.getElementsByTagName("input")[0]?.focus();
    }
  }, [isOpen, selectedOptions]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={[
          "flex flex-wrap items-center gap-2 p-2 shadow-sm border rounded cursor-pointer",
          isOpen ? "bg-white border-indigo-500" : "bg-gray-50 border-gray-300",
        ].join(" ")}
        onClick={toggleDropdown}
      >
        {multiSelect &&
          selectedOptions.map((option) => (
            <span
              key={option.value}
              className="flex gap-1 items-center px-2 py-1 text-sm text-white bg-blue-500 rounded"
            >
              {option.label}
              <span
                onClick={(e) => deleteOption(option, e)}
                className="cursor-pointer"
              >
                &times;
              </span>
            </span>
          ))}
        {!multiSelect && selectedOptions.length > 0 && selectedOptions[0].label}
        {enableFilter ? (
          <div className="flex gap-1 w-full flex-1">
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="bg-transparent flex-1 px-2 py-1 text-sm border-none outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              placeholder={placeholder}
            />
            {filterText && (
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterText("");
                }}
              >
                &times;
              </span>
            )}
          </div>
        ) : (
          placeholder
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 max-h-60">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-2 text-sm text-gray-500 cursor-default select-none">
              No results...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
