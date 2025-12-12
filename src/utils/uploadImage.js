// src/utils/uploadImages.js
import { supabase } from "../lib/supabaseClient";
import { generateImageKey } from "./generateImageKey";

export async function uploadImages(productId, files) {
  const uploadedRows = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExt = file.name.split(".").pop();
    const key = generateImageKey(productId, "original", fileExt, i + 1);

    // Upload
    const { error: uploadErr } = await supabase.storage
      .from("products")
      .upload(key, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadErr) {
      console.error("Upload failed:", uploadErr);
      continue;
    }

    // Public URL
    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(key);

    const imageUrl = urlData?.publicUrl;

    // Insert into product_images table
    const { data: imgRow, error: dbErr } = await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        key: key,
        url: imageUrl,
        is_main: i === 0,
      })
      .select()
      .single();

    if (dbErr) {
      console.error("DB insert failed:", dbErr);
      continue;
    }

    uploadedRows.push(imgRow);
  }

  return uploadedRows;
}
