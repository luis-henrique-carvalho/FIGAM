import { formactDate } from '@/helpers/formactDate'
import { createClient } from '@/prismicio'
import { Divider } from '@nextui-org/react'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import React from 'react'
import { IoDocumentTextSharp } from "react-icons/io5";


const page = async ({ params }: { params: { id: string } }) => {
    const prismic = createClient();
    const item = await prismic.getByUID("accountability_card", params.id)

    const itemDate = formactDate(item.first_publication_date)

    return (
        <div className="flex flex-col w-full gap-6">
            {item &&
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold md:text-3xl lg:text-4xl text-start'>{item.data.title}</h1>
                            <h4 className=' text-xs lg:text-base line-clamp-4'>#{item.data.type}</h4>
                            <span className="font-light">{itemDate}</span>
                        </div>
                        <PrismicRichText field={item.data.text} components={{
                            paragraph: ({ children }) => <p className='text-medium text-justify'>{children}</p>
                        }} />

                        <Divider />

                        <div className='flex flex-col'>
                            <h3 className='text-xl text-secondary lg:text-xl xl:text-3xl lg:font-bold font-semibold line-clamp-3 xl:line-clamp-2'>Anexos</h3>
                            {item.data.anex && item.data.anex.map((anex, index) => (
                                <PrismicNextLink
                                    field={anex.file}
                                    key={index}
                                    className='flex flex-row items-center gap-2 rounded-xl'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p className='text-lg'>
                                        {anex.title}
                                    </p>
                                    <IoDocumentTextSharp />
                                </PrismicNextLink>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default page;
