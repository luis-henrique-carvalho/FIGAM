import React from "react";

type Props = {
  children: React.ReactNode;
};

const ScrollOfImage = ({ children }: Props) => {
  return (
    <div className="flex flex-row overflow-x-auto w-full">
      <div
        className="flex overflow-x-auto overflow-y-hidden w-full gap-x-2 scrollbar-none
        sm:scrollbar-thin sm:scrollbar-thumb-primary sm:scrollbar-track-terciary
        sm:scrollbar-rounded-full sm:scrollbar-w-2 "
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollOfImage;
