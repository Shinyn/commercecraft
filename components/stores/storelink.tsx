import Link from 'next/link';
import { storeState } from './storeState';
export function StoreLink(params: { storeid: string | undefined }) {
  const updateStoreID = storeState((state) => state.updateStoreID);
  return (
    <Link
      className="w-full p-2"
      href={`/${params.storeid}`}
      onClick={() => {
        updateStoreID(params.storeid || '');
      }}
    >
      Go to store
    </Link>
  );
}
