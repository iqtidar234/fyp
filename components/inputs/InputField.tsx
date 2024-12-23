'use client';
import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import ErrorText from '../errors/ErrotText';
import { BiSearch } from 'react-icons/bi';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string;
  error?: string;
  placeholder?: string;
  type?: string;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  value?: string | number;
  searchButton?: boolean;
  handleSearch?: () => void;
  // maxLength: number;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      type,
      inputClassName,
      wrapperClassName,
      labelClassName,
      placeholder,
      value,
      // maxLength,
      searchButton,
      handleSearch,
      ...inputParams
    },
    ref,
  ) => {
    const [passwordShow, setPasswordShow] = useState(false);
    return (
      <>
        <div className={`mb-3 min-w-full ${wrapperClassName}`}>
          <label
            htmlFor="name"
            className={`mb-1  block text-xs font-semibold ${labelClassName}`}
          >
            {label}
          </label>
          <div
            className={`${inputClassName} flex w-full items-center justify-between rounded-xl border-[1px] border-neutral-300 px-2 py-3 shadow`}
          >
            <input
              value={value}
              type={
                type === 'password' && passwordShow
                  ? 'text'
                  : type === 'password' && !passwordShow
                  ? 'password'
                  : type
              }
              ref={ref}
              {...inputParams}
              placeholder={placeholder}
              className={`  !focus:outline-none w-full text-xs  font-semibold  !outline-none  placeholder:text-neutral-400 ${
                label === 'Your Prestigue+ Number' && 'text-center'
              }`}
              // maxLength={maxLength}
            />
            {/* {- === "password" && passwordShow ? (
              <GoEye
                size={20}
                className="text-secondary"
                onClick={() => setPasswordShow(!passwordShow)}
              />
            ) : type === "password" && !passwordShow ? (
              <GoEyeClosed
                size={20}
                className="text-secondary"
                onClick={() => setPasswordShow(!passwordShow)}
              />
            ) : null} */}
            {searchButton && (
              <button onClick={handleSearch}>
                <BiSearch />
              </button>
            )}
          </div>
          <ErrorText>{error}</ErrorText>
        </div>
      </>
    );
  },
);

// InputField.displayName = 'InputField';

export default InputField;
