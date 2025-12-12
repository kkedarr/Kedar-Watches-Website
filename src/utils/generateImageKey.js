export function generateImageKey(productId, type, fileExt, index = 1) {
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];

  if (type === "gallery") {
    return `products/${productId}/gallery/${productId}_gallery_${String(index).padStart(2, "0")}_${timestamp}.${fileExt}`;
  }

  return `products/${productId}/original/${productId}_orig_${timestamp}_${index}.${fileExt}`;
}
