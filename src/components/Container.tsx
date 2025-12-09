import React from "react";

interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => {
  return <main className="p-5 mx-auto container">{children}</main>;
};

export default Container;
