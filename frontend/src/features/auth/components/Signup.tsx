import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { signupInputSchema, useCreateUser } from "../../../libs/auth";
import styles from "../../../styles/styles";
import { SignupFormValues } from "../../../types/type";
// const formData = new FormData();

const Signup = () => {
  // const [avatar, setAvatar] = useState<File | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const createUserMutation = useCreateUser();

  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // avatar: null,
    },
    resolver: zodResolver(signupInputSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // const convertFormDataToSignupFormValues = (
  //   formData: FormData
  // ): SignupFormValues => {
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const values: any = {};
  //   formData.forEach((value, key) => {
  //     values[key] = value;
  //   });
  //   return values as SignupFormValues;
  // };

  const onSubmit = async (formValues: SignupFormValues) => {
    // if (data.avatar !== null && data.avatar !== undefined)

      try {
        await createUserMutation.mutateAsync(formValues)
        reset()
      } catch (error) {
        console.error(error)
      } 
  };

  // const handleFileInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement> | null
  // ) => {
  //   if (!e?.target.files) return;
  //   const file = e.target.files[0];
  //   formData.set("avatar", file);
  //   setAvatar(file);
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            // encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  autoComplete="name"
                  {...register("name")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="mt-2 text-red-500">{errors.name?.message}</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="mt-2 text-red-500">{errors.email?.message}</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <p className="mt-2 text-red-500">{errors.password?.message}</p>
            </div>

            {/* <div>
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
                  htmlFor="avatar"
                  className="ml-5 flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    id="avatar"
                    {...register("avatar")}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
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
