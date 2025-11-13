import { useState } from "react";
import products from "../data/products"; // ← update to your source

const SearchFilter = () => {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState([0, 200000]);

  const brands = ["all", "Rolex", "AP", "Cartier", "Omega", "Patek"];

  const filtered = products.filter((p) => {
    const matchesBrand = brand === "all" || p.brand === brand;
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesPrice = p.price >= price[0] && p.price <= price[1];
    return matchesBrand && matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif font-bold mb-6">Search & Filter</h2>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <input
          type="text"
          placeholder="Search watch..."
          className="p-3 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="p-3 border rounded"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <div>
          <label className="text-sm font-semibold">Max Price</label>
          <input
            type="range"
            min="10000"
            max="200000"
            className="w-full"
            value={price[1]}
            onChange={(e) =>
              setPrice([0, Number(e.target.value)])
            }
          />
          <p>₦{price[1].toLocaleString()}</p>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 text-center">
            <img src={p.image} alt="" className="h-40 w-full object-cover rounded" />
            <p className="mt-3 font-medium">{p.name}</p>
            <p className="text-brand-gold">₦{p.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
