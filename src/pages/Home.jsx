import Hero from "../components/Hero";
import Categories from "../components/Categories";
{/* import FeaturedProducts from "../components/FeaturedProducts"; */}
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import KPIStrip from "../components/KPIStrip";



const Home = () => {

  return (
      <>
      <Hero />
      <KPIStrip />
      <Categories />
      {/* <FeaturedProducts /> */}
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;