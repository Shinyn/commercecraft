//Page for sign-up, only containing content required for sign-up andprovided by clerk

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='grid h-screen w-screen place-items-center'>
      <SignUp />
    </div>
  );
}
