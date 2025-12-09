import React from 'react';

const ImageBackground = () => {
    return (
        <div className='w-full h-full relative'>
            {/* Tertiary Background */}
            <div className='absolute left-2 md:left-3 lg:left-5 bottom-1 md:bottom-8 lg:bottom-10 w-full h-full bg-tertiary'></div>

            {/* Primary Background */}
            <div className='absolute left-3 md:left-5 lg:left-10 md:top-6 top-3 lg:top-10 w-full h-full bg-primary'></div>

            {/* Secondary Background */}
            <div className='absolute right-3 md:right-6 lg:right-10 bottom-3 md:bottom-4 lg:bottom-5 w-full h-full bg-secondary'></div>
        </div>
    );
}

export default ImageBackground;
