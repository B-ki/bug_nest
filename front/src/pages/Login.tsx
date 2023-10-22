import 'react-notifications-component/dist/theme.css';

import { ReactNotifications } from 'react-notifications-component';

// import { Store } from 'react-notifications-component';
// import { Navigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
// import background from '@/assets/wave-haikei.svg';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { user, login_42 } = useAuth();

  return (
    <div className="left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-40">
      <ReactNotifications />
      <h1 className="text-6xl font-bold text-primary">COOL PROJECT ! BUT NOT WORKING ...</h1>
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border-t-4 border-t-accent bg-white-1 p-8 shadow-md">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <Button onClick={login_42} type="secondary" iconLeft={logo}>
          Login here
        </Button>
        {/* {user && redirect()} */}
        <div className="flex w-full justify-center border-t-[1px] border-accent pt-2">
        </div>
      </div>
    </div>
  );
}
