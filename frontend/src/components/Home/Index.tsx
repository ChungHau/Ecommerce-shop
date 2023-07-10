import BestSelling from "./BestSelling";
import Categories from "./Categories";
import DailyDiscover from "./DailyDiscover";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <BestSelling />
      <DailyDiscover />
    </>
  );
};

export default Home;
