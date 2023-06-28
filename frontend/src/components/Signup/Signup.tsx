import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxAvatar } from "react-icons/rx";

import { useState } from "react";
import axios from "axios";
const formData = new FormData();

type FormValues = {
  username: string;
  email: string;
  password: string;
  avatar?: FileList | null;
};

const schema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(4, "Username should have at least 6 characters")
    .max(15, "Username should have at most 15 characters"),
  email: z.string().nonempty("Email is required").email("Email format is not valid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password should have at least 6 characters")
    .max(15, "Password should have at most 15 characters"),
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

  const onSubmit = async (data: FormValues) => {
    // if (data.avatar !== null && data.avatar !== undefined) {
    //   newData.append("password", data.avatar[0]);
    //   console.log(data.avatar[0]);
    // }
    try {
      const res = await axios("http://localhost:8000/user/create-user", {
        method: "POST",
        data: data,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e?.target.files) return;
    const file = e.target.files[0];

    formData.append("avatar", file);
    console.log(formData.get("avatar"));

    setAvatar(file);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/create-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(formData.get("avatar")))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input type="file" name="avatar" onChange={handleFileInputChange} />
        <button className="" type="submit">
          Submit
        </button>
      </form>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-white">Register as a new user</h2>
        form
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-main-gray py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  autoComplete="username"
                  {...register("username")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- focus:border-cyan-500 sm:text-sm text-black"
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
              <div className="mt-2 flex items-center justify-between gap-5">
                <span className="inline-block self-center h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-full w-full" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="w-full flex items-center justify-center py-3 sm:py-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-white bg-dark hover:bg-cyan-500 cursor-pointer"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    id="file-input"
                    {...register("avatar")}
                    accept=".jpg,.jpeg,.png"
                    // onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-400 hover:bg-cyan-700 cursor-pointer"
              >
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
