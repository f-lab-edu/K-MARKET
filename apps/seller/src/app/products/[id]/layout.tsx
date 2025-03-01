import Header from '@/components/Header';
import React from 'react';

interface ProductsLayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: ProductsLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default layout;
