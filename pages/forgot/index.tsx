'use client';
import InputField from '@/components/inputs/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
// import AuthHeader from "@/components/common/AuthHeader";
import { AxiosError } from 'axios';
import { ErrorType } from '@/types/errorTypes';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotField = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotField>({ resolver: zodResolver(formSchema) });
  const onSubmit: SubmitHandler<ForgotField> = async (data) => {
    try {
      //   const response = await forgotPassword(
      //     JSON.stringify({ email: data.email }),
      //   );

      toast.success(`forgot password detail send to your email address`);
      router.push('/reset');
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
    <div>
      {/* <AuthHeader /> */}

      <div className=" flex items-center justify-center">
        <div className="hidden w-1/2  items-center sm:flex sm:justify-center sm:pr-0 md:justify-end md:pr-10 lg:justify-center lg:pr-0">
          <Image
            src="/ForgotPassword.webp"
            alt="hello"
            width={300}
            height={250}
            className="h-[70%] w-[70%]  "
          />
        </div>
        <div className="w-full sm:w-1/2">
          <div className="rounded-md pt-6 sm:w-[90%] sm:shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] md:w-[80%] lg:w-[70%] ">
            <div className="mb-14 px-6">
              <div className=" flex flex-col items-center justify-center sm:border-b sm:pb-3 ">
                <h1 className="text-heading text-headingColor mb-2 font-semibold">
                  Forgot Password
                </h1>
                <p className="text-lightxs w-[60%] text-center text-xs ">
                  Please type your email or mobile number below and we can help
                  you rest password by SMS.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center pt-6  ">
                <InputField
                  label="Email"
                  type="text"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="Email Address"
                  maxLength={40}
                />
              </div>
            </div>
            <div className="rounded-md px-6 py-3 sm:shadow-2xl ">
              <button
                className="mb-8 w-full rounded-2xl bg-[#034542] p-2 text-xs text-white"
                onClick={isSubmitting ? () => {} : handleSubmit(onSubmit)}
              >
                {isSubmitting ? ' Sending' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
