import React from 'react';
import Image from "next/image";
import ImageSlider from '../slider/slider';
import downloadImage from "@/assets/stories/download.svg";


const DiscussionsComponent = ({ discussion, imageUrls }) => {
  const hasValidImages = imageUrls && imageUrls.some(url => url !== undefined);

  return (
    <div key={discussion?.heading} className="grid grid-cols-2 gap-5 text-black bg-white shadow-sm rounded-xl">
      <div >
        <div className="flex-1 p-4 flex flex-col ">
          <h2 className="text-[24px] font-semibold text-center">Discussions</h2>
          <ul>
            {Array.isArray(discussion?.description) &&
              discussion?.description?.map((discuss, index) => (
                <li key={index} className="text-lg leading-7  my-6">
                  {discuss}
                  <span className='border-span my-8 '></span>
                  <span className="border-span"></span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div >
        <div className="w-full flex justify-center text-center overflow-hidden shadow-[10px 4px 12px 0px #0000001F] d-flex align-items-center justify-content-center" style={{ height: '600px' }}>
          {!hasValidImages ? (
            <div className=' h-[400px]'>
              <h2 className="text-[24px] pt-4 font-semibold text-center">Coloring activity</h2>
              <Image
                src={downloadImage}
                alt="download"
                className='mt-40'
              />
              <p>No image generated yet!</p>
            </div>
          ) : (
            <ImageSlider images={imageUrls} />
          )}
        </div>
      </div>

    </div>
  );
}

export default DiscussionsComponent;
