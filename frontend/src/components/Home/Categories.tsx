import CategoryItem from "./CategoryItem";

import { Grid, Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

const items = Array.from(Array(35).keys());

const breakpointsOpt = {
  0: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  570: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  735: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  868: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  1280: {
    slidesPerView: 8,
    slidesPerGroup: 8,
  },
  1680: {
    slidesPerView: 10,
    slidesPerGroup: 10,
  },
};

const Categories = () => {
  console.log(11);

  return (
    <section className="categories mt-28 sm:mt-5">
      <div className="w-full sm-w-11/12 lg:w-4/5 m-auto">
        <p className="mb-5 text-base md:text-2xl font-bold">CATEGORIES</p>

        <Swiper
          // install Swiper modules
          modules={[Navigation, Grid]}
          spaceBetween={20}
          grid={{ rows: 2, fill: "row" }}
          navigation
          breakpoints={breakpointsOpt}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <CategoryItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
