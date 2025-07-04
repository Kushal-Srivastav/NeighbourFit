import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-pink-400 to-yellow-300">
      <div className="bg-white bg-opacity-80 rounded-xl p-10 shadow-lg">
        <SignIn afterSignInUrl="/" afterSignUpUrl="/" />
      </div>
    </div>
  );
}
