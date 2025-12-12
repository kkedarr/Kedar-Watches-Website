// src/pages/admin/AddNewProduct.jsx
// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUpload, FiTrash2, FiCheckCircle, FiXCircle } from "react-icons/fi";

/**
 * AddNewProduct - improved version
 * - unique slug handling
 * - robust image upload (unique filenames + metadata insertion)
 * - inline brand creation when "Add new brand" selected
 * - light/dark friendly UI consistent with site styles
 *
 * IMPORTANT: set BUCKET to your Supabase storage bucket name.
 */
const BUCKET = "products"; // <-- change this if your bucket is named "product-images" or something else

const AddNewProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null); // { type, text }

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [addingBrandName, setAddingBrandName] = useState(""); // value for "Other" brand entry
  const [showAddBrandInput, setShowAddBrandInput] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    sku: "",
    price: "",
    short_description: "",
    description: "",
    brand_id: "",
    category_ids: [],
    stock: 0,
    visible: true,
    images: [], // File[]
    details: {
      movement: "",
      strap_material: "",
      water_resistance: "",
      display: "", // smartwatch
      battery_life: "",
      compatibility: "",
    },
    type: "normal", // normal | smartwatch
  });

  // previewFiles: { file, previewUrl, status, error, row }
  const [previewFiles, setPreviewFiles] = useState([]);

  // load brands & categories
  useEffect(() => {
    async function loadLookups() {
      try {
        const { data: brandData, error: brandErr } = await supabase
          .from("brands")
          .select("id,name,slug")
          .order("name");
        const { data: categoryData, error: catErr } = await supabase
          .from("categories")
          .select("id,name,slug")
          .order("name");
        if (brandErr) throw brandErr;
        if (catErr) throw catErr;
        setBrands(brandData || []);
        setCategories(categoryData || []);
      } catch (err) {
        console.error("Lookup load error", err);
        setMessage({ type: "error", text: "Could not load brands or categories." });
      }
    }
    loadLookups();
  }, []);

  useEffect(() => {
    return () => {
      previewFiles.forEach((p) => {
        try {
          URL.revokeObjectURL(p.previewUrl);
        } catch {}
      });
    };
  }, [previewFiles]);

  const slugify = (text) =>
    text
      .toString()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const timestamp = () =>
    new Date().toISOString().replace(/[-:.TZ]/g, "") + Math.floor(Math.random() * 9000 + 1000); // add randomness

  // unique filename generator
  function makeFileKey(productId, file, index, type = "original") {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();

  // Remove the extension from the safe name
  const baseName = file.name.replace(/\.[^/.]+$/, ""); 

  const safeName = baseName
    .replace(/[^a-zA-Z0-9_\-]/g, "_")
    .slice(0, 50);

  return `${productId}/${type}/${productId}_${type}_${timestamp()}_${index}_${safeName}.${ext}`;

}


  // create brand inline if admin typed one
  async function createBrandIfNeeded() {
    if (showAddBrandInput && addingBrandName?.trim()) {
      const name = addingBrandName.trim();
      const slug = slugify(name);
      const { data: existing } = await supabase.from("brands").select("id").eq("slug", slug).maybeSingle();
      if (existing) return existing.id;
      const { data, error } = await supabase.from("brands").insert({ name, slug }).select("id").single();
      if (error) throw error;
      setBrands((b) => [...b, { id: data.id, name }]);
      return data.id;
    }
    return form.brand_id || null;
  }

  const handleFiles = (files) => {
    const arr = Array.from(files || []);
    const newPreviews = arr.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: "idle",
      error: null,
      row: null,
    }));

    setPreviewFiles((prev) => {
      const existingKeys = new Set(prev.map((p) => `${p.file.name}-${p.file.size}`));
      const filtered = newPreviews.filter((p) => !existingKeys.has(`${p.file.name}-${p.file.size}`));
      return [...prev, ...filtered];
    });

    setForm((f) => ({ ...f, images: [...(f.images || []), ...arr] }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dtFiles = e.dataTransfer?.files;
    if (dtFiles?.length) handleFiles(dtFiles);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const removePreview = (index) => {
    const removed = previewFiles[index];
    if (removed) try { URL.revokeObjectURL(removed.previewUrl); } catch {}
    setPreviewFiles((p) => p.filter((_, i) => i !== index));
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const setPreviewState = (index, patch) =>
    setPreviewFiles((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));

  function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        try { URL.revokeObjectURL(img.src); } catch {}
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  // generate slug candidate quickly
  async function generateUniqueSlug(base) {
    let candidate = slugify(base || Date.now().toString());
    // quick check
    const { data: existing } = await supabase.from("products").select("id").eq("slug", candidate).limit(1).maybeSingle();
    if (!existing) return candidate;
    const suffix = `-${Date.now().toString().slice(-6)}`;
    return `${candidate}${suffix}`;
  }

  // insert product with retry on unique constraint (slug)
  async function insertProductWithUniqueSlug(payload, maxRetries = 4) {
    let attempts = 0;
    let localPayload = { ...payload };
    while (attempts <= maxRetries) {
      if (!localPayload.slug) {
        localPayload.slug = await generateUniqueSlug(localPayload.name || "");
      }
      const { data, error } = await supabase.from("products").insert(localPayload).select("id").single();
      if (!error && data) return data;
      // if unique constraint error on slug
      const msg = (error && String(error.message || "").toLowerCase()) || "";
      const isConflict = msg.includes("duplicate") || msg.includes("unique");
      if (isConflict) {
        const suffix = `-${Date.now().toString().slice(-6)}`;
        localPayload.slug = `${slugify(localPayload.slug)}${suffix}`;
        attempts++;
        continue;
      }
      throw error || new Error("Insert failed");
    }
    throw new Error("Could not create unique slug after retries");
  }

  // upload single file and insert product_images row
  async function uploadFileForProduct(productId, file, index) {
    const key = makeFileKey(productId, file, index);
    setPreviewState(index, { status: "uploading", error: null });

    // upload (use upsert:false because keys are unique; upsert true is also ok if you want overwrite)
    const { data: uploadData, error: uploadErr } = await supabase.storage.from(BUCKET).upload(key, file, { cacheControl: "3600", upsert: false });

    if (uploadErr) {
      // if 409 (already exists) happens, we can retry different name — but our key is unique, so unlikely
      setPreviewState(index, { status: "error", error: uploadErr.message || String(uploadErr) });
      throw uploadErr;
    }

    // get public url
    const { data: urlData, error: urlErr } = await supabase.storage.from(BUCKET).getPublicUrl(key);
    if (urlErr) {
      setPreviewState(index, { status: "error", error: urlErr.message || String(urlErr) });
      throw urlErr;
    }
    const publicUrl = urlData?.publicUrl || null;

    // dims
    const dims = await getImageDimensions(file).catch(() => ({ width: null, height: null }));

    // insert product_images row
    const insertImg = {
      product_id: productId,
      key,
      url: publicUrl,
      is_main: index === 0,
      width: dims.width,
      height: dims.height,
      mime: file.type,
      size_bytes: file.size,
    };

    const { data: imgRow, error: imgErr } = await supabase.from("product_images").insert(insertImg).select().single();
    if (imgErr) {
      setPreviewState(index, { status: "error", error: imgErr.message || String(imgErr) });
      throw imgErr;
    }

    setPreviewState(index, { status: "done", row: imgRow, error: null });
    return imgRow;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name?.trim()) {
      setMessage({ type: "error", text: "Product name is required." });
      return;
    }
    if (!form.price || Number(form.price) < 0) {
      setMessage({ type: "error", text: "Please enter a valid price." });
      return;
    }

    setMessage(null);
    setLoading(true);

    try {
      // create brand if admin typed a new one
      let brandId = form.brand_id;
      if (showAddBrandInput && addingBrandName.trim()) {
        brandId = await createBrandIfNeeded();
      }

      // payload
      const payload = {
        name: form.name.trim(),
        sku: form.sku || null,
        slug: await generateUniqueSlug(form.slug || form.name),
        short_description: form.short_description || null,
        description: form.description || null,
        price: form.price ? Number(form.price) : 0,
        visible: !!form.visible,
        stock: form.stock ? Number(form.stock) : 0,
        brand_id: brandId || null,
        metadata: {
          details: form.details || {},
        },
      };

      // insert product (handle slug unique)
      const productData = await insertProductWithUniqueSlug(payload, 4);
      const productId = productData.id;

      // product categories
      if (form.category_ids && form.category_ids.length > 0) {
        const catRows = form.category_ids.map((catId) => ({ product_id: productId, category_id: catId }));
        const { error: catErr } = await supabase.from("product_categories").insert(catRows);
        if (catErr) console.warn("product_categories insert error:", catErr);
      }

      // upload images
      const files = form.images || [];
      const uploadedRows = [];
      if (files.length > 0) {
        setUploading(true);
        for (let i = 0; i < files.length; i++) {
          try {
            const row = await uploadFileForProduct(productId, files[i], i);
            uploadedRows.push(row);
          } catch (err) {
            console.error("uploadFileForProduct error", err);
            setMessage({ type: "error", text: `Failed to upload ${files[i].name}. Check console.` });
            // continue uploading others
          }
        }
      }

      // update metadata with image keys & save main image column if you use it
      const imagesKeys = uploadedRows.map((r) => r.key);
      const imagesUrls = uploadedRows.map((r) => r.url);
      const mainImageUrl = uploadedRows.find((r) => r.is_main)?.url || imagesUrls[0] || null;

      const { error: updErr } = await supabase
        .from("products")
        .update({
          metadata: { ...payload.metadata, images: imagesKeys },
          // mainimage: mainImageUrl, // uncomment if you have a mainimage column
        })
        .eq("id", productId);

      if (updErr) console.warn("Could not update product metadata:", updErr);

      setMessage({ type: "success", text: "Product created successfully." });
      setUploading(false);
      setLoading(false);

      // cleanup previews
      previewFiles.forEach((p) => {
        try {
          URL.revokeObjectURL(p.previewUrl);
        } catch {}
      });

      setTimeout(() => navigate("/admin/products"), 700);
    } catch (err) {
      console.error("Add product error:", err);
      setMessage({ type: "error", text: `Failed to add product: ${err?.message || err}` });
      setUploading(false);
      setLoading(false);
    }
  };

  const onNameChange = (value) => {
    const s = slugify(value);
    setForm((f) => ({ ...f, name: value, slug: s }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-[#F8F5F0] dark:bg-brand-dark min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">Add New Product</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate("/admin/products")} className="px-4 py-2 border rounded-md bg-white/60 dark:bg-slate-800 text-sm">
              Back to Products
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-md px-4 py-3 text-sm flex items-center gap-3 ${
              message.type === "success" ? "bg-green-50 text-green-800" : message.type === "error" ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"
            }`}
            role="status"
            aria-live="polite"
          >
            {message.type === "success" ? <FiCheckCircle /> : message.type === "error" ? <FiXCircle /> : <FiUpload />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Product name</label>
                <input type="text" value={form.name} onChange={(e) => onNameChange(e.target.value)} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" placeholder="E.g. Royal Oak Chronograph" required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Price (₦)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" required min="0" step="0.01" />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Stock</label>
                  <input type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" min="0" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Short description</label>
                <input type="text" value={form.short_description} onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" placeholder="One-line summary (optional)" />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Full description</label>
                <textarea rows={6} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" placeholder="Detailed product information, care instructions, sizes, etc." />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Type</label>
                  <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700">
                    <option value="normal">Normal Watch</option>
                    <option value="smartwatch">Smartwatch</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">SKU (optional)</label>
                  <input type="text" value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" placeholder="Stock Keeping Unit" />
                </div>
              </div>

              {form.type === "normal" ? (
                <div className="grid md:grid-cols-3 gap-4">
                  <input placeholder="Movement (e.g. Automatic)" value={form.details.movement} onChange={(e) => setForm((f) => ({ ...f, details: { ...f.details, movement: e.target.value } }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                  <input placeholder="Strap material (e.g. Leather)" value={form.details.strap_material} onChange={(e) => setForm((f) => ({ ...f, details: { ...f.details, strap_material: e.target.value } }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                  <input placeholder="Water resistance (e.g. 50m)" value={form.details.water_resistance} onChange={(e) => setForm((f) => ({ ...f, details: { ...f.details, water_resistance: e.target.value } }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  <input placeholder='Display (e.g. AMOLED 1.4")' value={form.details.display} onChange={(e) => setForm((f) => ({ ...f, details: { ...f.details, display: e.target.value } }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                  <input placeholder="Battery life (e.g. 7 days)" value={form.details.battery_life} onChange={(e) => setForm((f) => ({ ...f, details: { ...f.details, battery_life: e.target.value } }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                  <input placeholder="Compatibility (e.g. iOS / Android)" value={form.details.compatibility} onChange={(e) => setForm((f) => ({ ...f, details: { ...f.details, compatibility: e.target.value } }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Slug (URL)</label>
                <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" placeholder="auto-generated from name, editable" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">If duplicate, a suffix will be appended automatically.</p>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Brand</label>
                <div className="flex gap-2">
                  <select value={form.brand_id || ""} onChange={(e) => {
                    const val = e.target.value;
                    if (val === "other") {
                      setShowAddBrandInput(true);
                      setForm((f) => ({ ...f, brand_id: "" }));
                    } else {
                      setShowAddBrandInput(false);
                      setForm((f) => ({ ...f, brand_id: val }));
                    }
                  }} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700">
                    <option value="">— Select Brand —</option>
                    {brands.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
                    <option value="other">+ Add new brand</option>
                  </select>
                </div>

                {showAddBrandInput && (
                  <div className="mt-2">
                    <input type="text" placeholder="Type new brand name" value={addingBrandName} onChange={(e) => setAddingBrandName(e.target.value)} className="w-full p-2 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This will create a brand record and use it for this product.</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700 dark:text-gray-200">Categories</label>
                <select multiple value={form.category_ids} onChange={(e) => setForm((f) => ({ ...f, category_ids: Array.from(e.target.selectedOptions, (o) => o.value) }))} className="w-full p-3 rounded-md bg-gray-50 dark:bg-slate-900 border dark:border-slate-700 h-32">
                  {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.visible} onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))} className="form-checkbox" />
                  <span className="text-sm text-gray-700 dark:text-gray-200">Visible</span>
                </label>

                <button type="button" onClick={() => {
                  setForm({
                    name: "",
                    slug: "",
                    sku: "",
                    price: "",
                    short_description: "",
                    description: "",
                    brand_id: "",
                    category_ids: [],
                    stock: 0,
                    visible: true,
                    images: [],
                    details: { movement: "", strap_material: "", water_resistance: "", display: "", battery_life: "", compatibility: "" },
                    type: "normal",
                  });
                  previewFiles.forEach((p) => { try { URL.revokeObjectURL(p.previewUrl) } catch {} });
                  setPreviewFiles([]);
                  setMessage(null);
                  setAddingBrandName("");
                  setShowAddBrandInput(false);
                }} className="ml-auto px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-md text-sm">Reset</button>
              </div>
            </aside>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Images</label>
            <div onDrop={onDrop} onDragOver={onDragOver} className="border-2 border-dashed rounded-lg p-4 flex items-center gap-4 bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Drag & drop images here, or</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">First uploaded image will be used as the main image.</p>
              </div>

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
                  <FiUpload />
                  <span className="text-sm">Choose files</span>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                </label>

                <span className="text-sm text-gray-500 dark:text-gray-400">{previewFiles.length} selected</span>
              </div>
            </div>

            {previewFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {previewFiles.map((p, i) => (
                  <div key={i} className="relative rounded overflow-hidden border bg-white dark:bg-slate-800">
                    <img src={p.previewUrl || undefined} alt={p.file?.name || `preview-${i}`} className="object-cover h-36 w-full" />
                    <div className="p-2 flex items-center justify-between">
                      <div className="text-xs text-gray-600 dark:text-gray-300 truncate">{p.file?.name}</div>
                      <div className="flex items-center gap-2">
                        {p.status === "done" && <FiCheckCircle className="text-green-600" />}
                        {p.status === "error" && <FiXCircle className="text-red-600" />}
                        <button type="button" onClick={() => removePreview(i)} className="p-1 rounded bg-white/80 dark:bg-slate-700" title="Remove">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    {p.status === "uploading" && <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm">Uploading...</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" disabled={loading || uploading} className="bg-[#A57C4D] hover:bg-[#8B6431] text-white px-6 py-3 rounded-md flex items-center gap-2">
              {loading || uploading ? "Saving..." : "Create Product"}
            </button>

            <button type="button" onClick={() => navigate("/admin/products")} className="bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddNewProduct;