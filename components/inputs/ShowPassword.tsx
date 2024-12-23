import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';

interface checkboxType {
  label: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean | undefined;
}
const Showpassword: React.FC<checkboxType> = ({
  label,
  name,
  value,
  onChange,
  checked,
}) => {
  return (
    <div>
      <div className=" flex items-center justify-start gap-4">
        <label className="relative text-white">
          <input
            className="dark:border-white-400/20 hidden h-6 w-6 transition-all duration-500 ease-in-out checked:scale-100 dark:scale-100 dark:hover:scale-110"
            type="checkbox"
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
          />

          <div className="block h-4 w-4 ">
            {checked ? (
              <FaCheckSquare className="text-lg text-black  " />
            ) : (
              <span
                className={` block h-4 w-4 border-[2px] border-black bg-white
              `}
              ></span>
            )}
          </div>
        </label>
        <p className="small-text text-xs "> {label}</p>
      </div>
    </div>
  );
};

export default Showpassword;
