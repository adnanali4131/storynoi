'use client'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { NextArrow, PrevArrow } from './CustomArrows';
import Image from 'next/image';
import downloadImage from "@/assets/stories/download.svg";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const [data, setData] = useState([])
  const settings = {
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    if (images.length) {
      setData(images)
    }
  }, [images])

  return (
    <div>
      <div>
        <div className="flex-1 p-4 flex flex-col justify-center">
          <h2 className="text-[24px] font-semibold text-center">Coloring activity</h2>
          <p>Select the image to convert it to sketch to fill colors later</p>
        </div>
      </div>
      <div className='h-[400px] relative w-[400px]'>
        <div>
          {data.length > 0 ?
            <Slider {...settings}>
              {images.filter(el => el !== null).map((el, index) => (
                <div key={index}>
                  <div>
                    <Image
                      alt={"slider"}
                      width={100}
                      height={100}
                      src={el}
                      className='w-[100%] h-[100%]'
                      priority={true}
                    />
                  </div>
                </div>
              ))}

            </Slider>
            : <Image
              src={downloadImage}
              alt="download"
            />}
        </div>

      </div>
      <div className='my-4'>
        <button className='bg-crayola-sky-blue px-7 py-4 rounded-md text-white'>Select this image</button>
      </div>
    </div>
  );
}

export default ImageSlider;


