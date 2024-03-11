import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";

function Home() {
  return (
    <div>
      <Banner />;
      <Categories />
      <SpecialDishes />
      <Testimonials />
    </div>
  );
}

export default Home;
