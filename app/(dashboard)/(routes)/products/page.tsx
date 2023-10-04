// Produkt fliken på dashboarden

import { DataTable } from "../../../../components/data-table";
import { columns } from "@/components/dashboard/products/columns";
import axios, { isAxiosError } from "axios";

// Get the products from the database
async function getData() {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (isAxiosError(error)) {
        return error.message;
      }
    });
}

export default async function Page() {
  const data = await getData();
  console.log(data)

  return (
    <div className={"m-9"}>
      <div className={"flex flex-row justify-between"}>
        <h1 className=" text-5xl ">Products</h1>
        <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </div>
      <div className="container mx-auto py-10">
        {data === undefined ? ( // If the data is undefined, show a loading screen
        <p>Loading....</p> ) : (
        
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
