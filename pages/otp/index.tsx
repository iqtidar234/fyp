'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
// import AuthHeader from "@/components/common/AuthHeader";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorType } from '@/types/errorTypes';

const OtpInput = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
    Array.from({ length: 6 }, () => React.createRef()),
  );
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const handleChange = (index: number, value: string): void => {
    const newOtp: string[] = [...otp];

    if (/^\d+$/.test(value)) {
      newOtp[index] = value.substring(0, 1); // Fix: Set value from the beginning

      if (index < otp.length - 1) {
        setActiveOtpIndex(index + 1);
      }
    }

    setOtp(newOtp);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('Text');

    if (/^\d+$/.test(pastedData) && pastedData.length === otp.length) {
      const newOtp: string[] = pastedData.split('');
      setOtp(newOtp);
      setActiveOtpIndex(otp.length - 1);
    }
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (key === 'Backspace') {
      const newOtp: string[] = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      setActiveOtpIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      if (index > 0) {
        inputRefs.current[index - 1].current?.focus();
      }
    }
  };

  useEffect(() => {
    inputRefs.current[activeOtpIndex].current?.focus();
  }, [activeOtpIndex]);

  // EMAIL VERIFY API CALL
  const handleVerfiy = async () => {
    // const data = {
    //   email: Cookies.get('userEmail'),
    //   otp: parseInt(otp.join('')),
    // };
    // Cookies.get('userEmail');
    try {
      //   const res = await verifyEmailbyOTP(JSON.stringify(data));
      toast.success('Complete Your Profile');
      router.push('/register/step-3');
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as ErrorType;
      if (errorResponse.message) {
        toast.error(`${errorResponse.message}`);
      } else {
        toast.error(`${errorResponse}`);
      }
    }
  };

  const generateOTP = async () => {
    try {
      //   await regenerateOTP(JSON.stringify({ email: Cookies.get('userEmail') }));
      toast.success('OTP has been sent to your email');
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as ErrorType;
      if (errorResponse.message) {
        toast.error(`${errorResponse.message}`);
      } else {
        toast.error(`${errorResponse}`);
      }
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="hidden w-1/2  items-center sm:flex sm:justify-center sm:pr-0 md:justify-end md:pr-10 lg:justify-center lg:pr-0">
        <Image
          src="/OTP.webp"
          alt="hello"
          width={300}
          height={250}
          className="h-[70%] w-[70%]  "
        />
      </div>
      <div className="w-full sm:w-1/2">
        <div className="rounded-md pt-6 sm:w-[90%] sm:shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] md:w-[80%] lg:w-[70%] ">
          {/* STEPS DETAILS */}

          <div className="border-gray2 mx-6 mb-4 pb-1 text-center sm:border-b">
            <p className="text-xs font-semibold text-secondary">Step 2 of 4</p>
          </div>
          <div className="mb-10 px-6">
            <div className=" mb-6 flex w-full flex-col items-center justify-center sm:border-b sm:pb-4 ">
              <h1 className="text-heading text-headingColor mb-2 font-semibold">
                Enter The Verification Code
              </h1>
              <p className="text-lightxs  mb-2 text-center text-xs ">
                A six-digitsverification code has been sent to your email
                address iqtidar@gmail.com
              </p>
              <p className="text-center  text-[15px] font-bold text-black ">
                +10 876 777 3898
              </p>
            </div>

            <div className=" mb-8 flex items-center justify-center gap-3">
              {otp.map((_, index) => (
                <React.Fragment key={index}>
                  <input
                    ref={inputRefs.current[index]}
                    type="text"
                    // maxLength={1}
                    className={`spin-button-none h-10 w-5  rounded border-b-2 border-b-gray-400 bg-transparent from-cyan-100 text-center text-sm font-semibold text-black outline-none transition focus:border-b-black focus:text-gray-700 md:w-10 lg:w-12 ${
                      otp[index] ? 'border-b-black' : ''
                    }`}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onPaste={handlePaste}
                    value={otp[index]}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </React.Fragment>
              ))}
            </div>
            <p
              onClick={generateOTP}
              className="mb-1  cursor-pointer text-center text-xs font-black hover:text-primary"
            >
              Resend a new Code
            </p>
            <p className="text-center  text-xs  text-primary">
              Available in 10 Second
            </p>
          </div>
          <div className="rounded-md px-6 py-3 sm:shadow-2xl">
            <button
              onClick={handleVerfiy}
              className="w-full rounded-2xl bg-[#034542] p-2 text-xs text-white "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
