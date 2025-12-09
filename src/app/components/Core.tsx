import React from 'react';
import Circles from '@/components/Circles';
import ComponentButton from '@/components/ComponentButton';
import { createClient } from '@/prismicio';
import { PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/react';
import Link from 'next/link';

interface Props {
    data: any;
}

const CoreHome = async ({ data }: Props) => {
    const prismic = createClient();

    const equipaments: any = await prismic.getAllByType("equipment", {
        fetch: ["equipment.image", "equipment.title", "equipment.text", "equipment.read_more"]
    });

    return (
        <div className="flex flex-col w-full gap-5 items-center">
            <div className="flex flex-col xl:px-0 gap-5">
                <h2 className=' text-xl text-center font-normal md:text-4xl'>Equipamentos</h2>

                <section className="flex flex-col xl:px-0 gap-5">
                    {equipaments && equipaments.map((equipament: any) => (

                        <div className="flex flex-col md:flex-row items-center gap-4 border border-primary p-4 rounded-md" key={equipament.id}>
                            <div className="flex flex-col md:w-2/5">
                                <figure className="relative">
                                    <PrismicImage
                                        field={equipament.data.image}
                                        alt={equipament.data.image.alt}
                                        className="w-full object-cover rounded-md"
                                    />
                                </figure>
                            </div>

                            <div className='flex flex-col md:w-3/5'>
                                <h3 className="text-lg font-normal md:text-2xl mb-2">{equipament.data.title}</h3>
                                <PrismicRichText field={equipament.data.text} components={{
                                    paragraph: ({ children }) => (
                                        <p className="text-xs lg:text-base text-justify font-light">
                                            {children}
                                        </p>
                                    ),
                                    heading4: ({ children }) => (
                                        <h4 className="text-xl font-normal mt-2">
                                            {children}
                                        </h4>
                                    )
                                }} />
                                <Link href={"/equipament/" + equipament.uid} >
                                    <span className="text-secondary text-lg font-semibold">Saiba mais</span>
                                </Link>
                            </div>
                        </div>

                    ))}
                </section>
            </div>

            <Circles center />

            <section className="flex flex-col items-center lg:w-5/6 gap-5">
                {data.main_core_tile && data.main_core_text && (
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-xl font-normal text-center md:text-4xl">{data.main_core_tile[0].text}</h2>
                        <p className="text-xs lg:text-base text-center font-light">{data.main_core_text[0].text}</p>
                    </div>
                )}
                <ComponentButton text="Ver mais" color="primary" link="/about" />
            </section>
        </div >
    );
}

export default CoreHome;
