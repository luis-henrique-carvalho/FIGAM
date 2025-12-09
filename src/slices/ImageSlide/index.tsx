import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageSlide`.
 */
export type ImageSlideProps = SliceComponentProps<Content.ImageSlideSlice>;

/**
 * Component for "ImageSlide" Slices.
 */
const ImageSlide = ({ slice }: ImageSlideProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for image_slide (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ImageSlide;
