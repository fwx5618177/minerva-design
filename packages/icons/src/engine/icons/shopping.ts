// Shopping icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Shopping basket with slats */
export const shoppingBasketIcon: IconDefinition = {
  name: "shopping-basket",
  category: "shopping",
  tags: ["basket", "buy", "store", "commerce"],
  paths: ["M3 9h18l-2 11H5z", "M8 9l4-5 4 5", "M9 13v4M12 13v4M15 13v4"],
};

/** Price tag with hole */
export const priceTagIcon: IconDefinition = {
  name: "price-tag",
  category: "shopping",
  tags: ["label", "cost", "sale", "discount"],
  paths: ["M3 3h8l10 10-8 8L3 11z", "M7 7h1"],
};

/** Two overlapping tags */
export const tagsIcon: IconDefinition = {
  name: "tags",
  category: "shopping",
  tags: ["labels", "categories", "price", "sale"],
  paths: ["M3 3h6l9 9-6 6-9-9z", "M13 3h8v8l-6 6", "M6 6h1"],
};

/** Barcode bars */
export const barcodeIcon: IconDefinition = {
  name: "barcode",
  category: "shopping",
  tags: ["scan", "upc", "product", "checkout"],
  paths: ["M4 5v14M7 5v14M9 5v14M13 5v14M16 5v14M20 5v14"],
};

/** QR code */
export const qrCodeIcon: IconDefinition = {
  name: "qr-code",
  category: "shopping",
  tags: ["scan", "code", "matrix", "checkout"],
  paths: [
    "M3 3h7v7H3z",
    "M14 3h7v7h-7z",
    "M3 14h7v7H3z",
    "M14 14h3v3h-3z",
    "M20 14h1v7h-4",
  ],
};

/** Open package */
export const packageOpenIcon: IconDefinition = {
  name: "package-open",
  category: "shopping",
  tags: ["parcel", "unbox", "order", "delivery"],
  paths: ["M4 10v11h16V10", "M12 10v11", "M3 10l2-6 7-1 7 1 2 6z"],
};

/** Delivery truck */
export const truckDeliveryIcon: IconDefinition = {
  name: "truck-delivery",
  category: "shopping",
  tags: ["shipping", "delivery", "logistics", "freight"],
  paths: [
    "M2 6h12v10H2z",
    "M14 10h4l3 3v3h-7",
    "M4 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
    "M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
    "M8 18h7",
  ],
};

/** Storefront with awning */
export const storeFrontIcon: IconDefinition = {
  name: "store-front",
  category: "shopping",
  tags: ["shop", "retail", "boutique", "market"],
  paths: [
    "M3 10l2-6h14l2 6",
    "M3 10a3 3 0 0 0 6 0a3 3 0 0 0 6 0a3 3 0 0 0 6 0",
    "M4 13v8h16v-8",
    "M10 21v-5h4v5",
  ],
};

/** Closed box */
export const boxIcon: IconDefinition = {
  name: "box",
  category: "shopping",
  tags: ["parcel", "carton", "package", "shipping"],
  paths: ["M3 7l9-4 9 4v10l-9 4-9-4z", "M3 7l9 4 9-4", "M12 11v10"],
};

/** Coupon with dashed perforation */
export const couponIcon: IconDefinition = {
  name: "coupon",
  category: "shopping",
  tags: ["voucher", "promo", "discount", "offer"],
  paths: [
    "M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z",
    "M14 6v2M14 11v2M14 16v2",
  ],
  colors: [palette.orange, undefined],
};

/** Cart with a check mark */
export const cartCheckIcon: IconDefinition = {
  name: "cart-check",
  category: "shopping",
  tags: ["checkout", "purchase", "order", "confirm"],
  paths: [
    "M2 3h3l2.5 12h11l2.5-8H6",
    "M7.5 19a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    "M15.5 19a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    "M10 10.5l2 2 3.5-3.5",
  ],
};

/** T-shirt with crew collar */
export const shirtIcon: IconDefinition = {
  name: "shirt",
  category: "shopping",
  tags: ["clothing", "apparel", "tee", "fashion"],
  paths: ["M8 3l-5 3 2 4 3-1v12h8V9l3 1 2-4-5-3c-1 2-2 3-4 3s-3-1-4-3z"],
};

/** Handbag with strap handle */
export const handbagIcon: IconDefinition = {
  name: "handbag",
  category: "shopping",
  tags: ["purse", "fashion", "accessory", "bag"],
  paths: [
    "M4 9h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z",
    "M8 9V7a4 4 0 0 1 8 0v2",
  ],
};

/** Clothes hanger */
export const hangerIcon: IconDefinition = {
  name: "hanger",
  category: "shopping",
  tags: ["wardrobe", "clothes", "closet", "retail"],
  paths: ["M12 8V6.5a2 2 0 1 1 2-2", "M12 8L3 14.5h18z"],
};

/** Sneaker shoe */
export const shoeIcon: IconDefinition = {
  name: "shoe",
  category: "shopping",
  tags: ["sneaker", "footwear", "sports", "fashion"],
  paths: ["M3 19V8l5 2 3-3 2 5 7 2.5a2 2 0 0 1 2 2V19z", "M3 15.5h19"],
};

/** Balance scale with two pans */
export const scaleIcon: IconDefinition = {
  name: "scale",
  category: "shopping",
  tags: ["weigh", "balance", "measure", "price"],
  paths: [
    "M5 7h14",
    "M12 4v16",
    "M8 20h8",
    "M5 7L2 13",
    "M5 7l3 6",
    "M2 13a3 3 0 0 0 6 0",
    "M19 7l-3 6",
    "M19 7l3 6",
    "M16 13a3 3 0 0 0 6 0",
  ],
};
