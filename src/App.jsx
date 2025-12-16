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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TermsAndConditions from "./pages/TermsandConditions";
import Warranty from "./pages/Warranty";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import  AdminDashboard from "./pages/admin/AdminDashboard";
import AddNewProduct from "./pages/admin/AddNewProduct";
import AddToCartModal from "./components/AddToCartModal";


// ✅ import provider
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="font-sans bg-white dark:bg-brand-dark min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:categoryId" element={<Shop />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/admin/login" element={ <AdminLogin /> } />
            
            <Route 
              path="/admin/dashboard" 
              element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>} 
            />

            <Route 
              path="/admin/products" 
              element={
              <ProtectedAdminRoute>
                <AdminProducts />
              </ProtectedAdminRoute>} 
            />

            <Route 
              path="/admin/products/addnewproduct" 
              element={
              <ProtectedAdminRoute>
                <AddNewProduct />
              </ProtectedAdminRoute>}
            />     

            <Route 
              path="/admin/products/:id"
              element={
                <ProtectedAdminRoute>
                  <AddNewProduct />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
          < AddToCartModal />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
