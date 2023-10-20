export default function BottomDiv({ orders }: any) {
  const { order_total } = orders;
  return (
    <div
      className={
        "flex flex-col justify-between border-t p-2 border-black absolute bottom-0 w-full"
      }
    >
      <div className="flex flex-row justify-between border-b-2 border-black">
        <div className="flex flex-col">
          <span className="font-bold m-1">VAT:</span>{" "}
          <span className="m-1">
            {order_total !== undefined && order_total.toString().includes(".")
              ? ((order_total - 50) * 0.12).toFixed(2).toString().slice(0, -6) +
                " " +
                ((order_total - 50) * 0.12).toFixed(2).toString().slice(-6)
              : null}{" "}
            {order_total !== undefined && !order_total.toString().includes(".")
              ? ((order_total - 50) * 0.12).toFixed(2).toString().slice(0, -6) +
                " " +
                ((order_total - 50) * 0.12)
                  .toFixed(2)
                  .toString()
                  .slice(-6, -3) +
                " " +
                ((order_total - 50) * 0.12).toFixed(2).toString().slice(-3)
              : null}{" "}
            SEK
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold m-1">Price excl. VAT:</span>{" "}
          <span className="m-1">
            {order_total !== undefined && order_total.toString().includes(".")
              ? ((order_total - 50) * 0.88).toFixed(2).toString().slice(0, -6) +
                " " +
                ((order_total - 50) * 0.88).toFixed(2).toString().slice(-6)
              : null}{" "}
            {order_total !== undefined && !order_total.toString().includes(".")
              ? ((order_total - 50) * 0.88).toFixed(2).toString().slice(0, -6) +
                " " +
                ((order_total - 50) * 0.88)
                  .toFixed(2)
                  .toString()
                  .slice(-6, -3) +
                " " +
                ((order_total - 50) * 0.88).toFixed(2).toString().slice(-3)
              : null}{" "}
            SEK
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold m-1">Delivery fee:</span>{" "}
          <span className="m-1"> 50 SEK</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold m-1 text-xl underline">
            Total Price incl. VAT:
          </span>
          <span className="m-1 font-bold text-xl">
            {order_total !== undefined && order_total.toString().includes(".")
              ? order_total.toString().slice(0, -6) +
                " " +
                order_total.toString().slice(-6)
              : null}
            {order_total !== undefined && !order_total.toString().includes(".")
              ? order_total.toFixed(2).toString().slice(0, -6) +
                " " +
                order_total.toFixed(2).toString().slice(-6, -3) +
                " " +
                order_total.toFixed(2).toString().slice(-3)
              : null}
            SEK
          </span>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-center">Thank you for shopping with us!</p>
        <p className="text-center">
          If you have any questions, please contact us at:
        </p>
        <p className="text-center"></p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">Kontaktinformation:</h2>{" "}
            <p className="underline">Hakim Livs</p>
            <p>Tomtebodavägen 3A </p>
            <p>171 65 Solna</p>
          </div>
          <div>
            <div className="mt-8">
              <p className="m-2"> Mailadress: info@hakimlivs.se</p>
            </div>
            <div>
              <p className="m-2">Telefon: 073-777 777 7</p>
            </div>
          </div>{" "}
          <div className="mt-8">
            <p>Swish to: 073-777 777 7</p>
            <p>Or payment at delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
