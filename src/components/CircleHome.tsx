import React from "react";
import { MdCircle } from "react-icons/md";

interface Props {
  hidden?: boolean;
}

const CircleHome = ({ hidden }: Props) => {
  return (
    <div className={`w-[60px] flex flex-row gap-1 ${hidden ? 'sm:hidden' : ''} sm:self-start`}>
      <MdCircle className="text-2xl text-primary" />
      <MdCircle className="text-2xl text-secondary" />
      <MdCircle className="text-2xl text-tertiary" />
    </div>
  );
};

export default CircleHome;
