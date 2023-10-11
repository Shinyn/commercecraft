import Link from "next/link";
import { storeState } from "./storeState";
export function StoreLink(params:{storeid:string|undefined}){
    const updateStoreID = storeState((state) => state.updateStoreID);
    return(
        <Link href={`/${params.storeid}`} onClick={()=>{
            updateStoreID(params.storeid||"")}}>
        Go to store!
        </Link>
    )
}