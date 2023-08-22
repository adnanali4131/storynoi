import React from 'react';
import Image from "next/image";
import ImageSlider from '../slider/slider';
import downloadImage from "@/assets/stories/download.svg";


const DiscussionsComponent = ({ discussion, imageUrls }) => {
  const hasValidImages = imageUrls && imageUrls.some(url => url !== undefined);

  return (
    <div key={discussion?.heading} className="grid grid-cols-2 gap-5 text-black bg-white shadow-sm rounded-xl">
      <div className='border-r-[2px]'>
        <div className="flex-1 p-4 flex flex-col justify-center">
          <h2 className="text-[24px] font-semibold text-center">Discussions</h2>
          <ul>
            {Array.isArray(discussion?.description) &&
              discussion?.description?.map((discuss, index) => (
                <li key={index} className="text-lg leading-7 text-center my-6">
                  {discuss}
                  <span className='border-span my-8 '></span>
                  <span className="border-span"></span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className='bg-[#F8F8F8]'>
        <div className="w-full flex justify-center text-center overflow-hidden shadow-[10px 4px 12px 0px #0000001F] d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          {!hasValidImages ? (
            <Image
              src={downloadImage}
              alt="download"
              className='mt-60'
            />
          ) : (
            <ImageSlider images={imageUrls} />
          )}
        </div>
      </div>

    </div>
  );
}

export default DiscussionsComponent;
