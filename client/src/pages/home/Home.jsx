import Banner from "../../components/Banner";
import Categories from "./Categories";
import OurServices from "./OurServices";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";

function Home() {
  return (
    <div>
      <Banner />;
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OurServices />
    </div>
  );
}

export default Home;
