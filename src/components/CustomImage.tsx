// components/CustomImage.tsx
import Image from "next/image";
import ImageBackground from "./ImageBackground";

interface CustomImageProps {
  src: string;
  alt: string;
  back?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, back }) => {
  return (
    <figure className="relative w-full h-full ">
      {back && (
        <ImageBackground />
      )}
      <Image src={src} fill objectFit="cover" alt={alt ?? ''} quality={100}/>
    </figure>
  );
};

export default CustomImage;
