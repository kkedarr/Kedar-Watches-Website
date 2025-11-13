import { useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    const phoneNumber = "2348012345678"; // 💬 Your WhatsApp number

    if (!form.name || !form.phone || !form.address) {
      alert("Please complete all details.");
      return;
    }

    const messageLines = [
      `🛍 *New Order Request*`,
      `--------------------------------`,
      `👤 *Name:* ${form.name}`,
      `📍 *Address:* ${form.address}`,
      `📞 *Phone:* ${form.phone}`,
      `--------------------------------`,
      `🧾 *Order Details:*`,
      ...cart.map(
        (item) =>
          `• ${item.name} (${item.color ?? "N/A"}) x${item.qty}  – ₦${(
            item.price * item.qty
          ).toLocaleString()}
Image: ${item.image}`
      ),
      `--------------------------------`,
      `💰 *Total:* ₦${total.toLocaleString()}`,
      `--------------------------------`,
      `✅ Please confirm order.`,
    ];

    const finalMsg = encodeURIComponent(messageLines.join("\n"));

    window.open(`https://wa.me/${phoneNumber}?text=${finalMsg}`, "_blank");

    // Optionally clear cart
    // clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-serif font-bold mb-8">Checkout</h2>

      {/* User Inputs */}
      <div className="space-y-6">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 border rounded"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          className="w-full p-3 border rounded"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {/* Summary */}
      <h3 className="text-xl font-semibold mt-10">Order Summary</h3>

      <div className="space-y-4 mt-4">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 items-center border p-3 rounded">
            <img src={item.image} alt="" className="w-20 h-20 object-cover rounded" />
            <div>
              <p className="font-medium">{item.name}</p>
              {item.color && <p className="text-gray-500 text-sm">Color: {item.color}</p>}
              <p className="text-brand-gold text-sm">
                ₦{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout Button */}
      <div className="flex justify-between items-center mt-10">
        <h3 className="text-xl font-semibold">
          Total: ₦{total.toLocaleString()}
        </h3>

        <button
          onClick={handleCheckout}
          className="px-8 py-3 bg-brand-gold text-white rounded-md hover:bg-brand-darkgold transition"
        >
          Checkout on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Checkout;
