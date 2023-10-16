import Link from "next/link";

export function ContactLinkCustomer(params:{e_mail:string}){

    return(
        <Link href ={ `mailto: ${params.e_mail}`} target="_blank" >
        Send Email
        </Link>
    )
}