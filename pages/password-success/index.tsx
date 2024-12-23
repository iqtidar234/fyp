import Image from 'next/image';
import React from 'react';
import SuccessText from './SuccessText';
// import AuthHeader from "@/components/common/AuthHeader";

const PasswordSuccessPage = () => {
  return (
    <div>
      {/* <AuthHeader /> */}
      <div className="parent flex min-h-screen w-full items-end justify-center md:items-center ">
        <div className="flex w-11/12 flex-col items-center justify-center gap-1 md:w-4/5 md:flex-row md:gap-5 lg:w-[65%] lg:gap-20 xl:w-3/5">
          {/* image */}
          <div>
            <div className="relative my-5 h-[15rem] w-[16rem] flex-grow-0 md:h-[15rem] md:w-[18rem] xl:h-[18rem] xl:w-[22rem]">
              <Image
                src="/success.webp"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="logo"
              />
            </div>
          </div>
          <SuccessText />
        </div>
      </div>
    </div>
  );
};

export default PasswordSuccessPage;
