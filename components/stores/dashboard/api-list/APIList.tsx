import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function APIList({ section }: { section: string }) {
  const params = useParams();

  // Function to copy text to clipboard
  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold py-4">API</h2>

      {/* GET all */}
      <div className="w-full rounded-lg border p-4 my-4">
        <h3 className="font-medium pb-3">GET</h3>
        <code className="w-full rounded bg-muted p-2 font-mono text-sm mr-5">{`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/${section}`}</code>
        <Button
          variant="outline"
          onClick={() =>
            copyToClipboard(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/${section}`
            )
          }
        >
          Copy
        </Button>
      </div>

      {/* GET specific */}
      <div className="w-full rounded-lg border p-4 my-4">
        <h3 className="font-medium pb-3">GET</h3>
        <code className="w-full rounded bg-muted p-2 font-mono text-sm mr-5">{`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/${section}/{ID}`}</code>
        <Button
          variant="outline"
          onClick={() =>
            copyToClipboard(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/${section}/{ID}`
            )
          }
        >
          Copy
        </Button>
      </div>

      {/* POST */}
      <div className="w-full rounded-lg border p-4 my-4">
        <h3 className="font-medium pb-3">POST</h3>
        <code className="w-full rounded bg-muted p-2 font-mono text-sm mr-5">{`${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/${params.storeID}/${
          section === "orders" ? "checkout" : section
        }`}</code>
        <Button
          variant="outline"
          onClick={() =>
            copyToClipboard(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/${
                section === "orders" ? "checkout" : section
              }`
            )
          }
        >
          Copy
        </Button>
      </div>

      {/* PATCH */}
      <div className="w-full rounded-lg border p-4 my-4">
        <h3 className="font-medium pb-3">PATCH</h3>
        <code className="w-full rounded bg-muted p-2 font-mono text-sm mr-5">{`${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/${params.storeID}/${section}${
          section === "categories" ||
          section === "sizes" ||
          section === "colors" ||
          section === "billboards"
            ? ""
            : "/{ID}"
        }`}</code>
        <Button
          variant="outline"
          onClick={() =>
            copyToClipboard(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${
                params.storeID
              }/${section}/${
                section === "categories" ||
                section === "sizes" ||
                section === "colors" ||
                section === "billboards"
                  ? null
                  : "{ID}"
              }`
            )
          }
        >
          Copy
        </Button>
      </div>

      {/* DELETE */}
      <div className="w-full rounded-lg border p-4 my-4">
        <h3 className="font-medium pb-3">DELETE</h3>
        <code className="w-full rounded bg-muted p-2 font-mono text-sm mr-5">{`${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/${params.storeID}/${section}/${
          section === "categories" ||
          section === "sizes" ||
          section === "colors"
            ? "{title}"
            : "{ID}"
        }`}</code>
        <Button
          variant="outline"
          onClick={() =>
            copyToClipboard(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${
                params.storeID
              }/${section}/${
                section === "categories" ||
                section === "sizes" ||
                section === "colors"
                  ? "{title}"
                  : "{ID}"
              }`
            )
          }
        >
          Copy
        </Button>
      </div>
    </div>
  );
}
