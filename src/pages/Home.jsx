import Hero from "../components/Hero";
import Categories from "../components/Categories";
{/* import FeaturedProducts from "../components/FeaturedProducts"; */}
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      {/* <FeaturedProducts /> */}
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;