import CircleHome from '@/components/CircleHome'
import CustomImage from '@/components/CustomImage'
import { formactDate } from '@/helpers/formactDate'
import { createClient } from '@/prismicio'
import { Divider } from '@nextui-org/react'
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const prismic = createClient();
    const post: any = await prismic.getByUID("post", params.id)
    const postDate = formactDate(post.last_publication_date)

    const description = post.data.description

    const components: JSXMapSerializer = {
        image: (data: any) => {
            return (
                <div className="flex w-full h-80 md:h-[600px] xl:h-[800px]">
                    <CustomImage
                        src={data.node.url}
                        alt={data.node.alt ?? 'Imagem da notícia'}
                    />
                </div>
            )
        },
        paragraph: (data: any) => {
            return (
                <p className=' text-base lg:text-xl text-justify font-normal'>
                    {data.node.text}
                </p>
            )
        },
        heading6: (data: any) => {
            return (
                <span className=' text-sm lg:text-lg font-light italic'>
                    {data.node.text}
                </span>
            )
        }
    }

    return (
        <div className="flex flex-col w-full gap-6 items-center">
            <div className="flex flex-col gap-2 md:w-10/12 lg:w-8/12">
                <header className="flex flex-col gap-2 md:gap-4 md:hidden">
                    <CircleHome hidden />
                    <h2 className="font-normal text-2xl">{post.data.title[0].text}</h2>
                    <div className="flex w-full h-fit md:h-[400px]">
                        <CustomImage
                            src={post.data.cover.url}
                            alt={post.data.cover.alt ?? 'Imagem da notícia'}

                        />
                    </div >
                    <div className="font-normal text-xs flex justify-between items-center">
                        <p>Data da Publicação: <span className="font-light">{postDate}</span></p>
                    </div>
                </header >

                <header className="hidden md:flex md:flex-row-reverse  w-full h-80 gap-5">
                    <div className="flex w-6/12 h-full">
                        <CustomImage
                            src={post.data.cover.url}
                            alt={post.data.cover.alt ?? 'Imagem da notícia'}
                        />
                    </div>
                    <div className='flex flex-col w-6/12 gap-3'>
                        <CircleHome />
                        <h2 className="font-normal text-2xl lg:text-4xl">{post.data.title[0].text}</h2>
                        <div className="font-normal text-xs lg:text-base flex justify-between items-center">
                            <p>Data da Publicação: <span className="font-light">{postDate}</span></p>
                        </div>
                    </div>
                </header>

            </div >

            <Divider />

            <main className='flex flex-col gap-2 md:w-10/12 lg:w-8/12'>
                <PrismicRichText field={description} components={components} />
            </main>
        </div >
    );

}

export default page;
