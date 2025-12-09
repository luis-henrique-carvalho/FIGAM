import React from 'react'

const Lines = () => {
  return (
    <div className='flex flex-col gap-1 w-1/4 md:w-1/3' >
        <div className='w-full h-[3px] md:h-[4px] bg-primary'></div>
        <div className='w-full h-[3px] md:h-[4px] bg-secondary'></div>
        <div className='w-full h-[3px] md:h-[4px] bg-tertiary'></div>
    </div>
  )
}

export default Lines
