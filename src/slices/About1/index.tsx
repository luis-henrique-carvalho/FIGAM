import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `About1`.
 */
export type About1Props = SliceComponentProps<Content.About1Slice>;

/**
 * Component for "About1" Slices.
 */
const About1 = ({ slice }: About1Props): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for about1 (variation: {slice.variation}) Slices
    </section>
  );
};

export default About1;
