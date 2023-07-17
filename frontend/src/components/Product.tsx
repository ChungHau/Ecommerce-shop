import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className="w-full h-fit bg-main-gray ">
      <div className="p-2">
        <Link to="samsung " className="w-full group">
          <img
            src="https://w0.peakpx.com/wallpaper/448/590/HD-wallpaper-laptop-keyboard-glow-dark.jpg"
            alt=""
            className="group-hover:scale-110 transition-transform"
          />
          <div className="group-hover:scale-110 transition-transform text-sm mt-2">
            <p>Macbook Pro M1 (2021)</p>
            <p className="text-white text-xs font-bold">
              $2,245.90 <span className="ml-2 text-gray-400  line-through">$2,530.00</span>
            </p>
          </div>
        </Link>
        <div className="flex gap-3 text-sm mt-2">
          <button className="py-1 flex-1 hover:bg-cyan-500 transition-colors border rounded-md flex justify-center items-center   ">
            <AiOutlineShoppingCart />
          </button>
          <button className="py-1 flex-1 hover:bg-cyan-500 transition-colors  border rounded-md text-[0.7rem] sm:text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
