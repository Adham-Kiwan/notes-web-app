import React from 'react'

function Note() {
  return (
    <div className='text-white flex flex-col w-[600px] px-[50px] py-[20px] rounded-[15px] bg-[#2563EB]'>
        <div className='flex justify-between'>
            <h3 className='font-semibold text-2xl'>Note</h3>
            <div className='flex items-center gap-[20px]'>
                <img className='cursor-pointer' src="/share.png" alt="" />
                <img className='cursor-pointer' src="/edit.png" alt="" />
                <img className='cursor-pointer' src="/trash.png" alt="" />
            </div>
        </div>
        <hr className='border-[#000000] my-[20px]' />  
        <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod esse ea quidem est delectus perspiciatis, repudiandae expedita omnis voluptate recusandae, sint maxime reprehenderit praesentium deleniti eligendi quo harum, odio iure.
        </div>
    </div>
  )
}

export default Note