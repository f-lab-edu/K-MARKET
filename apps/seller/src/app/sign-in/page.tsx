import React from 'react';
import SignInForm from '@/features/auth/components/form/SignInForm';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center py-3">K-MARKET</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
