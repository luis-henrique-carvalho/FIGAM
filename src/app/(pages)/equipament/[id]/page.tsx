import CircleHome from '@/components/CircleHome'
import CustomImage from '@/components/CustomImage'
import { formactDate } from '@/helpers/formactDate'
import { Divider } from '@nextui-org/react'
import { JSXMapSerializer, PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/react'
import React from 'react'
import { createClient } from '@/prismicio'
import ScrollOfImage from '@/components/ScrollOfImage'
import CustomImageScroll from '@/components/CustomImageScroll'
import { PrismicNextImage } from '@prismicio/next'

const page = async ({ params }: { params: { id: string } }) => {
    const prismic = createClient();
    const equipament: any = await prismic.getByUID("equipment", params.id)

    const equipamentDate = formactDate(equipament.data.equipament_date)

    const components: JSXMapSerializer = {
        image: (data: any) => {
            return (
                <div className="flex w-full ">
                    <PrismicImage
                        field={data.node}
                        width={data.node.dimensions.width / 2}
                        height={data.node.dimensions.height / 2}

                    />
                </div>
            )
        },
        paragraph: ({ children }) => {
            return (
                <p className=' text-xs lg:text-base text-justify font-light'>
                    {children}
                </p>
            )
        }
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2 ">
                <header className="flex flex-col gap-4 items-center">
                    <CircleHome hidden />
                    <h2 className="font-normal text-3xl">{equipament.data.title}</h2>
                    <PrismicImage
                        field={equipament.data.image}
                        alt={equipament.data.image.alt}
                        width={equipament.data.image.dimensions.width}
                        height={equipament.data.image.dimensions.height}
                    />

                </header>
            </div >

            <Divider />

            <main className='flex flex-col gap-2'>
                <PrismicRichText field={equipament.data.text} components={components} />
                <div>
                    <PrismicLink field={equipament.data.read_more} className='text-secondary font-bold'>
                        Saiba mais
                    </PrismicLink>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    {equipament.data.slices && <h3 className='text-2xl'>Galeria de imagens</h3>}
                    <ScrollOfImage>
                        {equipament &&
                            equipament.data.slices.map((slice: any) => (
                                slice.items && slice.items.map((item: any) => (
                                    <PrismicNextImage
                                        field={item.image}
                                        alt={item.image.alt}
                                        key={item.image.id}
                                        width={item.image.dimensions.width / 4}
                                        height={item.image.dimensions.height / 4}
                                        className='rounded-lg'
                                    />
                                ))
                            ))}
                    </ScrollOfImage>
                </div>

            </main>
        </div >
    )
}

export default page
