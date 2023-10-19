import Link from 'next/link';
import { useParams } from 'next/navigation';

export function LinktoPrint(props: string) {
  const params = useParams();
  return (
    <Link className="w-full p-2" href={`/${params.storeID}/orders/${props}`}>
      Print here
    </Link>
  );
}
