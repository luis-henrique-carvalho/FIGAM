import CustomImage from '@/components/CustomImage'
import { formactDate } from '@/helpers/formactDate'
import { Card, Divider } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    post: any
}

const PostCard = ({ post }: Props) => {
    const postDate = formactDate(post.last_publication_date)

    return (
        <Link href={`/news/post/${post.uid}`} className='flex flex-col items-center justify-center w-10/12 md:w-[50%] lg:w-[30%]'>
            <div className='flex flex-col w-full shadow-xl justify-between  hover:size-5 transition-transform duration-300 ease-in-out'>
                <div className=" w-full h-56 lg:h-82">
                    <CustomImage
                        src={post.data.cover.url}
                        alt={post.data.cover.alt}
                    />
                </div>
                <div className='flex flex-col gap-4 p-5 justify-between text-center '>
                    <h3 className='text-normal lg:text-xl font-medium line-clamp-3 xl:line-clamp-2'>
                        {post.data.title[0].text}
                    </h3>
                    <Divider />
                    <div className="font-normal text-xs flex justify-between items-center">
                        <p>Data: <span className="font-light">{ }</span>{postDate}</p>
                        <p className=' text-sm font-semibold text-primary hover:text-secondary '>Saiba mais!</p>
                    </div>
                </div>

            </div>
        </Link>

    )
}

export default PostCard
