import { Swiper, SwiperSlide } from "swiper/react";

const items = Array.from(Array(8).keys());
import { Navigation } from "swiper";
import Product from "../Product";
const breakpointsOpt = {
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  785: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  1280: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1536: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
};
const BestSelling = () => {
  return (
    <section className="mt-5 sm:mt-5">
      <div className="w-full sm-w-11/12 lg:w-4/5 m-auto">
        <p className="mb-5 text-base uppercase md:text-2xl font-bold">Best Selling</p>
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={20}
          breakpoints={breakpointsOpt}
          navigation
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <Product />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSelling;
