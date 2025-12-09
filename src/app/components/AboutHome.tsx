import ComponentButton from '@/components/ComponentButton'
import CustomImage from '@/components/CustomImage'
import CustomImageScroll from '@/components/CustomImageScroll'
import ScrollOfImage from '@/components/ScrollOfImage'
import { createClient } from '@/prismicio'
import { PrismicRichText } from '@prismicio/react'
import React from 'react'

interface Props {
  data: any
}

const AboutHome = async ({ data }: Props) => {
  const prismic = createClient();
  const events: any = await prismic.getAllByType("events_card", {
    pageSize: 10,
    orderings: [
      { field: "my.events_card.event_date", direction: "desc" },
    ],
  });

  return (
    <div className="flex flex-col w-fullgap-4 justify-center gap-4">
      <h2 className=' text-xl text-center font-normal md:text-4xl'>Calendário de eventos</h2>
      <ScrollOfImage>
        {events &&
          events.map((item: any) => (
            <CustomImageScroll
              home
              uid={item.uid}
              src={item.data.event_image.url}
              alt={item.data.event_image.alt}
              key={item.uid}
              title={item.data.event_title[0]?.text}
              href={`calendar/${item.uid}`}
            />
          ))}
      </ScrollOfImage>
      <section className='flex flex-col items-start gap-4 md:flex-row'>

        <div className="w-full h-56 md:w-5/12 md:h-80">
          <CustomImage src={data.about_image.url} alt={data.about_image.alt} />
        </div>
        <div className='flex flex-col gap-4 items-center md:w-7/12 md:items-start '>
          <h2 className=' text-xl font-normal md:text-4xl'>{data.about_title[0].text}</h2>
          <PrismicRichText field={data.about_text} components={{
            paragraph: ({ children }) => <p className="text-xs lg:text-base text-justify font-light">{children}</p>
          }} />
        </div>
      </section>
      {/* <div className='flex flex-col items-center'>
        <ComponentButton text="Saiba mais" color="primary" link="/about" />
      </div> */}
    </div>
  )
}

export default AboutHome
