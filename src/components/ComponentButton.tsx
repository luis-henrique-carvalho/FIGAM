import { Button, ButtonGroup } from "@nextui-org/react";
import Link from "next/link";
import React from 'react'

type Color = 'primary' | 'secondary' | 'tertiary'

interface Props {
  text: string
  color: Color
  link: string
}

const ComponentButton = ({ text,color,link }: Props) => {
  return (
    <Link href={link} className={` bg-${color} text-xs md:text-lg font-light w-24 lg:w-[170px] h-8 lg:h-[50px] text-white flex items-center justify-center`}>
      {text}
    </Link>
  )
}

export default ComponentButton
