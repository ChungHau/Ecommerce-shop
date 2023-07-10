// type Props = {}

import Product from "../Product";

const DailyDiscover = () => {
  return (
    <section className="mt-5 sm:mt-5">
      <div className="w-full sm-w-11/12 lg:w-4/5 m-auto">
        <p className="mb-5 text-base uppercase md:text-2xl font-bold">Daily Discover</p>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </section>
  );
};

export default DailyDiscover;
