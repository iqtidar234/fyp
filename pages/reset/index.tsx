'use client';
import InputField from '@/components/inputs/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
// import AuthHeader from "@/components/common/AuthHeader";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import Showpassword from '@/components/inputs/ShowPassword';
import { useState } from 'react';
// import { baseUrl } from "@/services";

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type ResetField = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetField>({ resolver: zodResolver(formSchema) });

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const onSubmit: SubmitHandler<ResetField> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('passwords do not match');
      return;
    }

    try {
      // const response = await axios.post(
      //   `${baseUrl}/auth/resetpassword/${token}`,
      //   { password: data.password }
      // );
      toast.success(`password updated successfully`);
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error occurred (e.g., network error)
        toast.error(
          'An error occurred while processing your request. Please try again later.',
        );
      } else {
        // Non-Axios error occurred
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };
  return (
    <div>
      {/* <AuthHeader /> */}

      <div className="flex items-center justify-center">
        <div className="hidden w-1/2  items-center sm:flex sm:justify-center sm:pr-0 md:justify-end md:pr-10 lg:justify-center lg:pr-0">
          <Image
            src="/ForgotPassword.webp"
            alt="hello"
            priority
            width={300}
            height={250}
            className="h-[70%] w-[70%]  "
          />
        </div>
        <div className="w-full sm:w-1/2">
          <div className="rounded-md pt-6 sm:w-[90%] sm:shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] md:w-[80%] lg:w-[70%]">
            <div className="mb-10 px-6 ">
              <div className=" flex flex-col items-center justify-center sm:border-b sm:pb-3 ">
                <h1 className="text-heading text-headingColor mb-2 font-semibold">
                  New Password
                </h1>
                <p className="text-paragraph text-lightParagraph w-[70%] text-center ">
                  Now you can type your reset password and confirm it below
                </p>
              </div>
              <div className="flex flex-col items-center justify-between  pt-6  ">
                <InputField
                  label="New Password"
                  type={`${showPass ? 'text' : 'password'}`}
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="New Password"
                  maxLength={20}
                />

                <InputField
                  label="Confirm Password"
                  type={`${showPass ? 'text' : 'password'}`}
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  placeholder="confirm password"
                  maxLength={20}
                />
              </div>
              <Showpassword
                label="Show Password"
                checked={showPass}
                onChange={() => setShowPass(!showPass)}
                name="showPass"
              />
            </div>
            <div className="rounded-md px-6 py-3 sm:shadow-2xl">
              <button
                className="w-full rounded-2xl bg-[#034542] p-2 text-xs text-white "
                onClick={isSubmitting ? () => {} : handleSubmit(onSubmit)}
              >
                {isSubmitting ? 'Reseting' : 'Reset Password'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
