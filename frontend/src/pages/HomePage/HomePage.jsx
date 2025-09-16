import React from 'react'
import Food_Slide from '../../assets/Food_slide.png'
import Model from '../../assets/Model.png'

function HomePage() {
  return (
    <>
      <div className='pb-[3vw] bg-primary relative'>
        <div className='flex justify-center items-center w-[100%] h-[30vw] overflow-hidden'><img className='h-[100%] w-[100%] object-cover' src={Food_Slide} alt="" /></div>
        <div className='absolute right-0 bottom-0'>
          <img className='h-[29vw]' src={Model} alt="" />
        </div>
      </div>
    </>
  )
}

export default HomePage