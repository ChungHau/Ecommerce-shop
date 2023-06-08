import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <section className="relative h-[706px] w-full hidden sm:block">
      <div className="h-full w-full relative bg-black after:content-[''] after:bg-[url('src/assets/images/mountain.jpg')] after:bg-cover after:bg-center after:absolute after:inset-0 after:opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 w-11/12 lg:w-4/5 m-auto">
        <div className="text-2xl lg:text-3xl flex flex-col gap-4 items-center">
          <p className="text-5xl lg:text-6xl">
            Welcome to <span className="text-cyan-400 hover:text-purple-400 transition-all">Tailwind</span>
          </p>
          <p className="">Your One-Stop Shop for Quality Products!</p>
        </div>
        <Link to="/products" className="p-2 bg-cyan-500 hover:bg-purple-500 transition-colors duration-300 rounded-md">
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default Intro;
