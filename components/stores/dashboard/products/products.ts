//Contains product description for data-table columns

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
  id:           string  
  storeId:      string
  title:        string
  description:  string
  ingredients:  string  
  price:        number
  image:        string
  manufacturer: string  
  category:     string  
  size:         string  
  color:        string  
  isarchived:   boolean 
  isfeatured:   boolean 
  stock:        number
};
