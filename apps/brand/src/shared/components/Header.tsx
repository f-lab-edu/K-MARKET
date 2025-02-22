import React from 'react';

interface TitleProps {
  title: React.ReactNode;
}

const Title = ({ title }: TitleProps) => {
  return <h2 className="text-2xl font-bold">{title}</h2>;
};

export default Title;
