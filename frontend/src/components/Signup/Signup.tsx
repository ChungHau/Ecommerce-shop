import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxAvatar } from "react-icons/rx";
import {server} from '../../server'
import { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";

const formData = new FormData();

type FormValues = {
  name: string;
  email: string;
  password: string;
  avatar?: FileList | null;
};

const schema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(4, "Name should have at least 4 characters")
    .max(15, "Name should have at most 15 characters"),
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
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate()


  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: null ,
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    if (data.avatar !== null && data.avatar !== undefined) {
      console.log(data);
    }
    formData.set("name", data.name)
    formData.set("email", data.email)
    formData.set("password", data.password)
    try {
      const res = await axios(`${server}/user/create-user`, {
        method: "POST",
        data: formData,
        headers: {"Content-Type": "multipart/form-data"}
      })
      console.log(res.data);
      
      if(res.data.success === true) navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e?.target.files) return;
    const file = e.target.files[0]
    formData.set('avatar', file);
    console.log(formData.get('avatar'));
    
    setAvatar(file);
  };

  return (
     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-md">
       <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
         Register as a new user
       </h2>
     </div>
     <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
       <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
               htmlFor="avatar"
                 className="ml-5 flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
           </div>

           <div>
             <button
               type="submit"
               className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
             >
               Submit
             </button>
           </div>
           <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
         </form>
       </div>
     </div>
   </div>

     // <div className="min-h-screen bg-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-white">Register as a new user</h2>
    //   </div>
    //   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="bg-main-gray py-8 px-6 shadow sm:rounded-lg sm:px-10">
    //       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
    //         <div>
    //           <label htmlFor="name" className="block text-sm font-medium text-white">
    //             Name
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="name"
    //               autoComplete="name"
    //               {...register("name")}
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- focus:border-cyan-500 sm:text-sm text-black"
    //             />
    //             <p className="mt-2 text-red-500">{errors.name?.message}</p>
    //           </div>
    //         </div>
    //         <div>
    //           <label htmlFor="email" className="block text-sm font-medium text-white">
    //             Email address
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="email"
    //               type="email"
    //               autoComplete="email"
    //               {...register("email")}
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
    //             />
    //             <p className="mt-2 text-red-500">{errors.email?.message}</p>
    //           </div>
    //         </div>
    //         <div>
    //           <label htmlFor="password" className="block text-sm font-medium text-white">
    //             Password
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="password"
    //               type="password"
    //               {...register("password")}
    //               autoComplete="current-password"
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-black"
    //             />
    //             <p className="mt-2 text-red-500">{errors.password?.message}</p>
    //           </div>
    //         </div>

    //         <div>
    //           <div className="mt-2 flex items-center justify-between gap-5">
    //             <span className="self-center h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden shrink-0">
    //               {avatar ? (
    //                 <img
    //                   src={URL.createObjectURL(avatar)}
    //                   alt="avatar"
    //                   className="h-full w-full object-cover rounded-full"
    //                 />
    //               ) : (
    //                 <RxAvatar className="h-full w-full" />
    //               )}
    //             </span>
    //             <label
    //               htmlFor="file-input"
    //               className="w-full flex items-center justify-center py-3 sm:py-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-white bg-dark hover:bg-cyan-500 cursor-pointer"
    //             >
    //               <span>Upload a file</span>
    //               <input
    //                 type="file"
    //                 id="file-input"
    //                 {...register("avatar")}
    //                 accept=".jpg,.jpeg,.png"
    //                 onChange={handleFileInputChange}
    //                 className="sr-only"
    //               />
    //             </label>
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-400 hover:bg-cyan-700 cursor-pointer"
    //           >
    //             Submit
    //           </button>
    //         </div>
    //         <div className="flex items-center text-white w-full">
    //           <h4>Already have an account?</h4>
    //           <Link to="/login" className="text-cyan-500 hover:text-cyan-700 pl-2">
    //             Sign In
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
