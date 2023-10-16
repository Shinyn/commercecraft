import Link from "next/link";
import { useParams } from "next/navigation";

export function LinktoPrint(props: string) {
  const params = useParams();
  return <Link href={`/${params.storeID}/orders/${props}`}>Print here:</Link>;
}
