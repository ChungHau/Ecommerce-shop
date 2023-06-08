import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxAvatar } from "react-icons/rx";

import { useState } from "react";

type FormValues = {
  username: string;
  email: string;
  password: string;
  avatar?: FileList | null;
};

const schema = z.object({
  username: z.string().nonempty("Username is required").min(4, ""),
  email: z.string().nonempty("Email is required").email("Email format is not valid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password should have at least 6 characters ")
    .max(12, "Password should have at most 12 characters"),
  avatar: z.instanceof(FileList).optional(),
});

const Signup = () => {
  const [avatar, setAvatar] = useState<File | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      avatar: null,
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e?.target.files) return;
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Register as a new user</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  autoComplete="username"
                  {...register("username")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
                />
                <p className="mt-2 text-red-500">{errors.username?.message}</p>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
                />
                <p className="mt-2 text-red-500">{errors.email?.message}</p>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
                />
                <p className="mt-2 text-red-500">{errors.password?.message}</p>
              </div>
            </div>

            <div>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-sm font-medium text-white bg-slate-900 hover:bg-slate-800">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    id="file-input"
                    {...register("avatar")}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-400 hover:bg-cyan-700 cursor-pointer">
                Submit
              </button>
            </div>
            <div className="flex items-center text-white w-full">
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-cyan-500 hover:text-cyan-700 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
