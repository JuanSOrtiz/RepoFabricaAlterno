import React from 'react'
import Image from 'next/image'
import avionImg from '../../app/assets/images/plane-2-svgrepo-com.svg'
import handImg from '../../app/assets/images/hand-shake-svgrepo-com.svg'

const Header = () => {
  return (
    <header className="flex justify-between h-full px-32 pt-14">
      <div className='flex'>
        <Image src={avionImg} alt="avion" className='w-10 h-10 mr-4' />
        <div className='font-bold text-3xl'>Nuevo vuelo</div>
      </div>
      
      <div className='flex'>
        <Image src={handImg} alt='mano' className='w-8 h-8 mr-2'/>
        <div className='font-semibold text-xl'>Hola, Paula</div>
      </div>
      
    </header>
  )
}

export default Header