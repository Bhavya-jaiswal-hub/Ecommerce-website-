import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {

  const { products } = useContext(ShopContext)
  const [current, setCurrent] = useState(0)

  // 🔹 extract first image of every product
  const heroImages = products
    ?.map(product =>
      Array.isArray(product.image) ? product.image[0] : product.image
    )
    .filter(Boolean) // remove undefined/null

  useEffect(() => {
    if (!heroImages || heroImages.length === 0) return

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [heroImages])

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

      {/* LEFT SIDE */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>

          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>
              OUR BESTSELLERS
            </p>
          </div>

          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            Latest Arrivals
          </h1>

          <div className='flex items-center gap-2 cursor-pointer'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE SLIDESHOW */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>

        {heroImages?.length > 0 && (
          <img
            src={heroImages[current]}
            alt="Hero Product"
            className='
              w-full h-full object-cover
              transition-all duration-700 ease-in-out
              scale-100 hover:scale-105
            '
          />
        )}

      </div>

    </div>
  )
}

export default Hero
