import React from 'react';

interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return <div className="max-w-screen-xl mx-auto">{children}</div>;
};

export default layout;
