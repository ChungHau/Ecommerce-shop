import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(4, "Username should have at least 6 characters")
    .max(15, "Username should have at most 15 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password should have at least 6 characters")
    .max(15, "Password should have at most 15 characters"),
});

const Login = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
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

  return (
    <div className="min-h-screen bg-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-white">Login to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-main-gray py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
                />
                <p className="mt-2 text-red-500">{errors.username?.message}</p>
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
                />
                <p className="mt-2 text-red-500">{errors.password?.message}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700">
                Submit
              </button>
            </div>
            <div className="flex items-center">
              <h4 className="text-white">Not have any account?</h4>
              <Link to="/sign-up" className="text-cyan-500 hover:text-cyan-700 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
