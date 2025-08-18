export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  category_id: string;
  brand: string;
  price: number;
  stock: number;
  availabilityStatus: "In Stock" | "Out of Stock" | "Preorder";
  thumbnail: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
