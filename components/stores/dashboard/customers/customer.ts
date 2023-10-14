//Type definiton for customers

export type Customer = {
  id: string | undefined;
  storeId: string;
  firstname: string;
  lastname: string;
  street: string;
  zipCode: string;
  city: string;
  email: string;
  phone: string;
};
