import Lines from '@/components/Lines'
import React from 'react'

const LastNewsHeader = () => {
  return (
    <div className='flex flex-row w-full items-center justify-between'>
      <Lines />
      <h2 className=' text-md lg:text-2xl xl:text-4xl font-semibold'>ÚLTIMAS NOTÍCIAS</h2>
      <Lines />
    </div>
  )
}

export default LastNewsHeader
