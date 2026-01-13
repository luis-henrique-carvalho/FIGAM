// components/CustomImage.tsx
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";

interface CustomImageScrollProps {
  src: string;
  alt: string;
  title: string;
  home?: boolean;
  uid?: string;
  href?: string;
}

const CustomImageScroll: React.FC<CustomImageScrollProps> = ({
  title,
  src,
  uid,
  alt,
  home,
  href,
}) => {
  return (
    <Link href={href as Url} className="relative p-2 hover:size transition-transform z-0 hover:shadow-md hover:z-10 duration-300 ease-in-out">
      <div className={`flex flex-col w-48 ${home ? "h-32 lg:h-44 lg:w-72" : "h-48"} lg:w-[300px] lg:h-[330px] gap-1`}>
        <figure className="relative w-full h-full lg:mb-2">
          <Image
            src={src}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 192px, 300px"
            alt={alt}
          />
        </figure>
      </div>
      {!home && <p className="text-xs mb-1 lg:text-base font-light">{title}</p>}

    </Link>
  );
};

export default CustomImageScroll;
