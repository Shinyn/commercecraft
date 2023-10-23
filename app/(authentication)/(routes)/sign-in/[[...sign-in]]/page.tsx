//Page for sign-in, only containing content required for signin provided by clerk

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='grid h-screen w-screen place-items-center'>
      <SignIn />
    </div>
  );
}
