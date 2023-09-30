//Innehåller produkt beskrivning till columnerna för data-table


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
    id: string
    title: string
    description: string
    price: number
  }