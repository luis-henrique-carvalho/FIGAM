import React from "react";
import Circles from "./Circles";

type PhrasesData = {
  text1: [{ text: string }];
  text2: [{ text: string }];
  text3: [{ text: string }];
};

type FlexRow = "flex-row" | "flex-row-reverse";
type LineHeight = "h-20" | "h-40";
type MinHeight =
  | "min-h-[500px]"
  | "min-h-[400px]"
  | "min-h-fit"
  | "min-h-[300px]";

type Props = {
  phrases: PhrasesData;
  flexRow: FlexRow;
  lineHeight: LineHeight;
  minHeight: MinHeight[];
  cicleEnd?: boolean;
  bottom?: boolean;
};

const DecorationPhrase = ({
  phrases,
  flexRow,
  lineHeight,
  minHeight,
  cicleEnd = false,
  bottom,
}: Props) => {
  const { text1, text2, text3 } = phrases;

  return (
    <div
      className={`flex flex-col min-h-full justify-between items-center md:w-3/12 `}
    >
      <div
        className={`w-full md:${bottom ? "" : minHeight[1]} lg:${
          minHeight[0]
        } flex flex-row md:flex-row-reverse justify-center`}
      >
        <div
          className={`flex flex-row md:${flexRow} self-center items-center gap-5`}
        >
          <div className={`w-[2px] h-20 md:${lineHeight} bg-black`}></div>

          <div className="flex flex-col">
            <p className="text-paragraph-base text-xs font-normal">
              {text1[0]?.text}
            </p>
            <p className="text-paragraph-base text-xs font-normal">
              {text2[0]?.text}
            </p>
            <p className="text-paragraph-base text-xs font-normal">
              {text3[0]?.text}
            </p>
          </div>
        </div>
      </div>
      <Circles end={cicleEnd} />
    </div>
  );
};

export default DecorationPhrase;
