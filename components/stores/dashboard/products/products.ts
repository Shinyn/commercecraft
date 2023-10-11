//Contains product description for data-table columns

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
  id: string;
  storeId: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
};
