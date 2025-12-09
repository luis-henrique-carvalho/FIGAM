import Link from 'next/link'
import React from 'react'

export const PageUnderConstruction = () => {
  return (
    <div className='flex flex-col text-center items-center gap-10'>
        <h1 className='text-7xl text-red-400'>Página em construção</h1>
        <div className='flex flex-col items-center justify-center gap-5'>
            <h2 className='text-3xl'>Paginas disponiveis no momento:</h2>
            <Link href="/about" className='text-2xl underline'>Sobre</Link>
            <Link href="/news" className='text-2xl underline'>Noticias</Link>
            <Link href="/" className='text-2xl underline'>Inicio</Link>
        </div>
    </div>
  )
}
