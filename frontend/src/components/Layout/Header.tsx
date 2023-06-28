import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import tailwind from "../../assets/images/tailwindcss.svg";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/loginStore";
import { RxAvatar } from "react-icons/rx";
const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: { text: string }) => {
    console.log(data, 23);
  };

  return (
    <header className="fixed z-10 top-0 left-0 bg-dark bg-opacity-80 justify-between w-full h-24 border-b-2 border-gray-600">
      <div className="h-full pt-3 w-11/12 lg:w-4/5 m-auto flex flex-col ">
        <div className="w-full h-2/6 flex justify-between">
          <Link to="/" className="hidden md:block md:text-lg xl:text-xl lg:text-2xl text-cyan-400">
            Tailwind
          </Link>
          <div className="block sm:hidden">
            <Link to="/">
              <img src={tailwind} width="50" height="50" className="" />
            </Link>
          </div>

          <nav className="hidden sm:flex text-sm md:text-base lg:text-lg xl:text-xl">
            <Link to="/" className="hover:text-cyan-400">
              Home
            </Link>
            <Link to="/best-selling" className="hover:text-cyan-400 sm:mx-4 lg:mx-6">
              Best Selling
            </Link>
            <Link to="/products" className="hover:text-cyan-400">
              Products
            </Link>
          </nav>
          <div className="flex gap-4">
            <div className="relative">
              <AiOutlineHeart className="hover:text-cyan-500 h-full w-5 lg:w-6 cursor-pointer" />
              <div className="absolute top-[-13px] right-[-13px] h-5 w-5 border-2 rounded-full border-purple-500 bg-purple-500 flex items-center justify-center ">
                23
              </div>
            </div>
            <div className="relative">
              <AiOutlineShoppingCart className="hover:text-cyan-500 h-full w-5 lg:w-6 cursor-pointer" />
              <div className="absolute top-[-13px] right-[-13px] h-5 w-5 border-2 rounded-full border-purple-500 bg-purple-500 flex items-center justify-center ">
                99
              </div>
            </div>
            {isLogin ? (
              <RxAvatar className="h-6 w-6 cursor-pointer" />
            ) : (
              <>
                <Link to="/login" className="text-sm md:text-base hover:text-cyan-500">
                  Login
                </Link>
                <Link to="/sign-up" className="text-sm md:text-base hover:text-cyan-500">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
        <form className="flex gap-5 justify-between self-center w-full mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden sm:block">
            <Link to="/">
              <img src={tailwind} width="50" height="50" className="" />
            </Link>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              {...register("text")}
              placeholder="Search"
              className="w-full border rounded-lg border-cyan-400 ring-1 focus:ring-cyan-400 focus:outline-none text-black indent-5"
            ></input>

            <button
              type="submit"
              className="bg-cyan-500 border border-cyan-500 rounded-lg w-16 flex items-center justify-center absolute right-0 top-0"
            >
              <AiOutlineSearch className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
