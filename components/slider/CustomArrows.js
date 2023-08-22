import Image from 'next/image';
import NextArrowImg from "@/assets/slider/VectorRight.png"
import PrevArrowImg from "@/assets/slider/VectorLeft.png"

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    >
      <Image src={NextArrowImg} alt="Next Arrow" width={100} height={100} className='w-[80px] h-[80px] ' priority={true} />
    </div>
  );
}

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    >
      <Image src={PrevArrowImg} alt="Previous Arrow" width={100} height={100} className='w-[80px] h-[80px] ' priority={true} />
    </div>
  );
}
