import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United States",
  "Canada",
  "United Kingdom",
  "UAE",
];

const Checkout = () => {
  const { cartItems, selectedIds, removeSelectedItems  } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const returnTo = location.state?.from || "/";

  /* 🔹 ONLY SELECTED CART ITEMS */
  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.includes(item.id)),
    [cartItems, selectedIds]
  );



  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // ✅ PRICE CALCULATIONS — VAT & Shipping removed
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );


  const shipping = 0; // no fee shown — replaced with text
  const total = subtotal; // total is subtotal only

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone", "address1", "city"];
    for (const key of required) {
      if (!form[key] || form[key].trim() === "") return false;
    }
    return true;
  };


  
  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }

    if (!validateForm()) {
      alert("Please complete required shipping fields (name, email, phone, address, city).");
      return;
    }

    // WhatsApp order message
    const whatsappNumber = "2348131316083";
    const lines = [];

    lines.push("ORDER REQUEST FROM KEDAR WATCHES WEBSITE");
    lines.push("");
    lines.push("My Details:");
    lines.push(`Name: ${form.firstName} ${form.lastName}`);
    lines.push(`Phone: ${form.phone}`);
    lines.push(`Email: ${form.email}`);
    lines.push(`Address: ${form.address1}${form.address2 ? ", " + form.address2 : ""}`);
    lines.push(`${form.city}${form.state ? ", " + form.state : ""}, ${form.country}`);
    lines.push(`Postal Code: ${form.postalCode || "-"}`);
    lines.push("");
    lines.push("ORDER SUMMARY:");

    selectedItems.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.name}`);
      lines.push(`   Quantity: ${item.quantity || 1}`);
      lines.push(`   Unit Price: ₦${Number(item.price).toLocaleString()}`);
      lines.push(
        `   Line Total: ₦${(
          Number(item.price) * (item.quantity || 1)
        ).toLocaleString()}`
      );
      if (item.mainImage || item.image) {
        lines.push(`   Image: ${item.mainImage || item.image}`);
      }
      lines.push("");
    });

    lines.push(`Subtotal: ₦${subtotal.toLocaleString()}`);
    lines.push(
      `Shipping: To be determined after confirming your delivery address and dispatch fee.`
    );
    lines.push("");
    lines.push(`TOTAL (excluding shipping): ₦${total.toLocaleString()}`);
    lines.push("");
    lines.push("Please confirm my order and send payment/delivery instructions.");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    window.open(url, "_blank");
    removeSelectedItems();

    setTimeout(() => {
      navigate(returnTo, { replace: true });
    }, 300);
  };

  return (
    <section className="max-w-6xl mx-auto py-2 px-4 bg-gray-50 dark:bg-brand-dark transition-colors">
      <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-12">Checkout</h1>

      {/* Shipping Information */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
        <h2 className="text-xl font-semibold mb-1">Shipping Information</h2>
        <p className="text-sm text-gray-500 mb-6">Please provide your contact and shipping details.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
              type="text"
              placeholder="First name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
              type="text"
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
            type="tel"
            placeholder="+2348012345678"
            required
          />
        </div>

        {/* Address */}
        <div className="mt-10">
          <h3 className="text-lg font-medium">Shipping Address</h3>

          <div className="mt-4 space-y-6">
            <div>
              <label className="block text-sm mb-1">Address Line 1</label>
              <input
                name="address1"
                value={form.address1}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
                type="text"
                placeholder="Street address, P.O. box"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Address Line 2 (Optional)</label>
              <input
                name="address2"
                value={form.address2}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
                type="text"
                placeholder="Apartment, suite, unit, building"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
                  type="text"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">State / Province</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
                  type="text"
                  placeholder="State / Province"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">Postal Code</label>
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6431] dark:bg-gray-700"
                  type="text"
                  placeholder="Postal code"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B6431]"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
        <h2 className="text-xl font-semibold mb-1">Payment Method</h2>
        <p className="text-sm text-gray-500 mb-4">
          Payment gateway integration is coming soon. Currently, checkout is completed via WhatsApp.
        </p>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          Our support team will confirm your order and provide next steps after you send the WhatsApp message.
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        <div className="space-y-6">
          {selectedItems.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300">No items selected for checkout.</p>
          )}

          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700"
            >
              <img
                src={item.mainImage || item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">
                ₦{(Number(item.price) * (item.quantity || 1)).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>₦{subtotal.toLocaleString()}</p>
          </div>

          <div className="flex justify-between text-xs">
            <p>Shipping:</p>
            <p className="text-gray-500 text-xs">
              Will be determined after confirming your address and dispatch fee.
            </p>
          </div>

          {/* No VAT anymore */}

          <div className="flex justify-between font-semibold text-lg pt-4 border-t dark:border-gray-700">
            <p>Total:</p>
            <p className="text-[#8B6431]">₦{total.toLocaleString()}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Total excludes shipping. Final delivery cost will be confirmed on WhatsApp.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Link
            to="/cart"
            className="px-6 py-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition text-center"
          >
            Back to Cart
          </Link>

          <button
            onClick={handlePlaceOrder}
            className="px-8 py-3 bg-[#8B6431] hover:bg-[#a0743b] text-white rounded-md transition"
          >
            Place Order via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;