import CircleHome from '@/components/CircleHome'
import ComponentButton from '@/components/ComponentButton'
import CustomImage from '@/components/CustomImage'
import { PrismicRichText } from '@prismicio/react'
import React from 'react'

interface Props {
  data: any
}

const HeaderHome = ({ data }: Props) => {
  return (
    <div className="flex flex-col w-full sm:flex-row justify-center sm:mt-5 sm:mb-5 lg:mt-10 lg:mb-10">
      <header className="flex flex-row justify-between gap-6 ">
        <div className="flex flex-col gap-3 items-center sm:items-start sm:text-start text-center sm:w-6/12 md:w-7/12 lg:justify-around">
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-normal md:text-2xl lg:text-4xl">{data.home_subtitle[0].text}</h2>
            <PrismicRichText field={data.text_title} components={{
              paragraph: ({ children }) => <p className="text-xs md:text-xl font-light">{children}</p>
            }} />

          </div>
          <div className="flex gap-4 sm:flex-col sm:gap-2 items-center sm:justify-start">
            <CircleHome />
            <div className='flex gap-4 items-end'>
              <h2 className="font-normal text-2xl sm:text-4xl md:text-4xl">{data.home_text[0].text}</h2>
              <h3 className='font-normal  text-2xl'>CULTURA</h3>
            </div>
            <CircleHome hidden />
          </div>
          <div className="flex gap-4">
            <ComponentButton text="Saiba mais" color="primary" link="/about" />
            <ComponentButton text="Contato" color="secondary" link="/contact" />
          </div>
        </div>
        <div className="hidden sm:w-5/12 lg:w-[340px] lg:h-[460px] sm:flex sm:flex-col sm:items-center sm:justify-center">
          <CustomImage back src={data.header_image.url} alt="logo figam" />
        </div>
      </header>
    </div>
  )
}

export default HeaderHome
