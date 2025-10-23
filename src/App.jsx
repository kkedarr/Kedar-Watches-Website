import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Learn from "./pages/Learn";
import Shipping from "./pages/Shipping";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Router>
      <div className="font-sans bg-white dark:bg-brand-dark min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* ✅ Shop Pages (general + category specific) */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:categoryId" element={<Shop />} />

          {/* Learn Page */}
          <Route path="/learn" element={<Learn />} />

          {/* Shipping Page */}
          <Route path="/shipping" element={<Shipping />} />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* ✅ Product Details Page */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
