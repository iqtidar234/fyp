'use client';
import InputField from '@/components/inputs/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorType } from '@/types/errorTypes';
import Showpassword from '@/components/inputs/ShowPassword';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginField = z.infer<typeof formSchema>;
const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginField>({ resolver: zodResolver(formSchema) });
  const [showPass, setShowpass] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginField> = async (data) => {
    try {
      toast.success('Login successful');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <AuthHeader /> */}
      <div className="flex items-center justify-center">
        <div className="hidden w-1/2  items-center sm:flex sm:justify-center sm:pr-0 md:justify-end md:pr-10 lg:justify-center lg:pr-0">
          <Image
            src="/login.webp"
            alt="hello"
            width={300}
            height={250}
            className="h-[70%] w-[70%]  "
          />
        </div>
        <div className="w-full sm:w-1/2">
          <div className="rounded-md pt-6 sm:w-[90%] sm:shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] md:w-[80%] lg:w-[55%]">
            <div className="mb-10 px-6 ">
              <div className=" flex flex-col items-center justify-center sm:border-b sm:pb-3 ">
                <h1 className="text-heading text-headingColor mb-2 font-semibold">
                  Log In To Your Account
                </h1>
                <p className="text-lightxs w-[60%] text-center text-xs ">
                  Login and Discover a Great Amount of Opportunities
                </p>
              </div>
              <div className="flex flex-col items-center justify-between  pt-6  ">
                <InputField
                  label="Email"
                  type="text"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="Email or Mobile Number"
                  maxLength={40}
                />

                <InputField
                  label="Password"
                  type={`${showPass ? 'text' : 'password'}`}
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="password"
                  maxLength={20}
                />
                <div className="flex w-[100%] items-center justify-between">
                  <div className="w-[70%]   ">
                    <Showpassword
                      label="Show Password"
                      checked={showPass}
                      onChange={() => setShowpass(!showPass)}
                      name="showPass"
                    />
                  </div>
                  <p className="w-[35%] self-end text-xs font-bold text-primary">
                    <Link href="/forgot">forgot password</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="ms:shadow-2xl rounded-md px-6 pt-3 pb-4">
              <button
                className="w-full rounded-2xl bg-[#034542] p-2  text-xs text-white "
                onClick={isSubmitting ? () => {} : handleSubmit(onSubmit)}
              >
                {isSubmitting ? ' Signing In' : 'Sign In'}
              </button>
              <p className="mt-2 text-center text-xs font-semibold">
                Don&apos;t have an account?
                <Link href="/signup" className="text-[#00B585]">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
