import { useRef } from "react";
import CategoryItem from "./CategoryItem";
import { GrNext, GrPrevious } from "react-icons/gr";
const Categories = () => {
  const number = 27;
  const slideProductRef = useRef<HTMLDivElement>(null);
  const nextProduct = () => {
    console.log(window.innerWidth);
    if (slideProductRef.current)
      slideProductRef.current.scrollLeft = slideProductRef.current.scrollLeft + window.innerWidth - 80;
  };
  const prevProduct = () => {
    if (slideProductRef.current)
      slideProductRef.current.scrollLeft = slideProductRef.current.scrollLeft - window.innerWidth + 80;
  };
  return (
    <section className="mt-28 sm:mt-5">
      <div className="w-11/12 lg:w-4/5 m-auto">
        <p className="text-base md:text-2xl font-bold">CATEGORIES</p>
        <div className="mt-3 flex gap-4">
          <button onClick={prevProduct} className="bg-cyan-500 hover:bg-cyan-600 text-lg  p-1 rounded">
            <GrPrevious />
          </button>
          <button onClick={nextProduct} className="bg-cyan-500 hover:bg-cyan-600 text-lg p-1 rounded ">
            <GrNext />
          </button>
        </div>
        <div
          className="grid grid-rows-2 grid-flow-col gap-4 overflow-scroll scrollbar-none scrollbar-hide scroll-smooth py-1 mt-5"
          ref={slideProductRef}>
          <CategoryItem number={number} />
        </div>
      </div>
    </section>
  );
};

export default Categories;
