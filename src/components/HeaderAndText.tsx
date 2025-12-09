import React from "react";

type Widht = "w-6/12" | "w-8/12" | "w-10/12" | "w-12/12" | "w-7/12";
interface Props {
  title: string;
  text: string;
  width: Widht;
}

const HeaderAndText = ({ text, title, width }: Props) => {
  return (
    <div className={`flex flex-col gap-2 lg:${width}`}>
      <h1 className="text-h1">{title}</h1>
      <p className="text-paragraph-base text-justify">{text}</p>
    </div>
  );
};

export default HeaderAndText;
