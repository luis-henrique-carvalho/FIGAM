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
      <Image
        src={src}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt ?? ''}
        quality={75}
      />
    </figure>
  );
};

export default CustomImage;
