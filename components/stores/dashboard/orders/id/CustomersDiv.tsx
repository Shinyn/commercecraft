export default function CustomersDiv({ customers }: any) {
  const { firstName, lastName, e_mail, phone, street, city, zipCode } =
    customers;
  return (
    <div className="">
      <h1 className="text-xl">Customer Information:</h1>
      <p className="font-bold">{firstName + " " + lastName}</p>
      <p className="">{e_mail}</p>
      <p className=""> {phone}</p>
      <p className="font-bold">Adress:</p>
      <p className="">{street}</p>
      <p className="">
        {city} {zipCode}
      </p>
    </div>
  );
}
