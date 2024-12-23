'use client';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import React from 'react';

const SuccessText = () => {
  return (
    <div className="text-center md:text-start">
      <h2 className="relative my-2 inline-block pb-1  text-center text-xl font-semibold">
        Successfully Updated!
      </h2>
      <p className="text-gray my-4 text-xs font-semibold md:text-sm lg:my-6">
        Password updated! You&apos;re all set with your new password.
      </p>

      <Link href={'/login'}>
        <Button label="Back to Sign In" onClick={() => {}} />
      </Link>
      <div className="mt-4">
        <Link href={'/register'}>
          <Button label="Sign Up" outline onClick={() => {}} />
        </Link>
      </div>
    </div>
  );
};

export default SuccessText;
