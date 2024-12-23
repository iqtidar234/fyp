'use client';
import InputField from '@/components/inputs/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
// import Cookies from "js-cookie";
import { z } from 'zod';
import Image from 'next/image';
// import FileInput from "@/components/inputs/FileInput";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import FileInput from "@/components/inputs/FileInput";
// import { vendorSignUp } from "@/services/auth/AuthApis";
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorType } from '@/types/errorTypes';
import Showpassword from '@/components/inputs/ShowPassword';

const formSchema = z
  .object({
    name: z.string().nonempty({ message: 'Please enter your name' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'password must contain at least 8 character(s)' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'password must contain at least 8 character(s)' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormField = z.infer<typeof formSchema>;

const Register = () => {
  const router = useRouter();
  const [imagePreviews, setImagePreviews] = useState<string>();
  const [showPass, setShowpass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmpass] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({ resolver: zodResolver(formSchema) });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagePreviews(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', 'vendor');
    // if (image) {
    //   formData.append('image', image);
    // }
    try {
      toast.success('Your account created successfully');
      router.push('/login');
    } catch (error) {
      console.log(error);
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
    <div className="flex items-center justify-center  rounded-md">
      {/* LEFT SIDE  */}
      <div className=" hidden w-1/2  items-center sm:justify-center sm:pr-0 md:justify-end md:pr-10 lg:flex lg:justify-center lg:pr-0">
        <Image
          src="/SignUp.webp"
          alt="hello"
          width={300}
          height={250}
          className="md:h-[100%] md:w-[100%] lg:h-[70%] lg:w-[70%] "
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full justify-center lg:w-1/2 lg:justify-start">
        <div className="w-full rounded-md pt-8 sm:w-[90%]  md:w-[80%] lg:w-[70%]  lg:shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)]">
          {/* STEPS DETAILS */}

          {/* <div className="border-gray2 mx-6 mb-3 pb-1 text-center sm:border-b">
            <p className="text-xs font-semibold text-secondary">Step 1 of 4</p>
          </div> */}

          {/* USER IMAGE */}
          <div className="sm:border-gray2 mx-6 flex flex-col items-center justify-center sm:border-b sm:pb-3">
            <h1 className="text-heading text-headingColor mb-1 font-semibold">
              Register To Your Account
            </h1>
            <p className="text-lightxs w-[70%] text-center text-xs ">
              Register and Discover a Great Amount of Opportunities
            </p>
          </div>
          {/* INPUT FIELDS */}
          <div className="flex flex-col items-end justify-between px-6 py-6">
            <InputField
              label="Name"
              type="text"
              {...register('name')}
              error={errors.name?.message}
              placeholder="full name"
              maxLength={40}
            />
            <InputField
              label="Email"
              type="text"
              {...register('email')}
              error={errors.email?.message}
              placeholder="example@gmail.com"
              maxLength={40}
            />
            <InputField
              label="Password"
              type={`${showPass ? 'text' : 'password'}`}
              {...register('password')}
              error={errors.password?.message}
              placeholder="********"
              maxLength={20}
            />
            <InputField
              label="Confirm Password "
              type={`${showConfirmPass ? 'text' : 'password'}`}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="********"
              maxLength={20}
            />
            <Showpassword
              label="Show Password"
              checked={showPass}
              onChange={() => {
                setShowpass(!showPass), setShowConfirmpass(!showConfirmPass);
              }}
              name="showPass"
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div className="flex flex-col gap-4 py-4  px-6 lg:shadow-2xl">
            <button
              className="w-full rounded-2xl bg-[#034542] p-2 text-xs text-white "
              onClick={isSubmitting ? () => {} : handleSubmit(onSubmit)}
            >
              {isSubmitting ? 'Next Step...' : 'Next Step'}
            </button>

            <p className="text-center  text-xs font-semibold">
              already have an account?
              <Link href="/login" className="text-[#00B585]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
