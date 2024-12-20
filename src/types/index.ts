type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: string[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

export type ProductCardProps = {
  userId: string | undefined;
  id: number;
  thumbnail: string;
  title: string;
  brand: string;
  stock: number;
  rating: number;
  price: number;
  discountPercentage: number;
  shippingInformation: string;
  returnPolicy: string;
};

export type DataList = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Review = {
  rating: number;
  comment: string;
  date: string; // Use `Date` if you plan to parse it to a Date object.
  reviewerName: string;
  reviewerEmail: string;
};
